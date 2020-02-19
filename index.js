const db = require("./db");
const csurf = require("csurf");
const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const path = require("path");
const https = require("https");
const bcrypt = require("./bcrypt");
///upload
const multer = require("multer");
const s3 = require("./s3");
const uidSafe = require("uid-safe");
const { s3Url } = require("./config");
const server = require("http").Server(app);
const io = require("socket.io").listen(server);
const secret = require("./secrets");
/// /upload
const fs = require("fs");
const request = require("request");
const apiKey = secret.apiKey;
const apiSecret = secret.apiSecret;
const trfleToken = secret.trefleToken;
const googlePhotosCliendId = secret.googlePhotosCliendId;
const googlePhotosSecret = secret.googlePhotosSecret;
let allResults;
const vision = require("@google-cloud/vision");
let imageUrl;
// let imageUrl =
//   "https://upload.wikimedia.org/wikipedia/commons/9/99/Field_of_Mentha_x_piperita_02.jpg";

if (process.env.NODE_ENV != "production") {
  app.use(
    "/bundle.js",
    require("http-proxy-middleware")({
      target: "http://localhost:8081/"
    })
  );
} else {
  app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

if (process.env.NODE_ENV === "production") {
  secrets = process.env;
} else {
  secrets = require("./secrets.json");
}

app.use(compression());
app.use(express.json());
app.use(express.static("./public"));

const cookieSessionMiddleware = cookieSession({
  secret: secrets.SESSION_SECRET,
  maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
  cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
  res.cookie("mytoken", req.csrfToken());
  next();
});

const diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

const uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

/// GOOGLE API ////

const googleAPI = async function quickstart(file) {
  // let resultsArr = [];

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./APIKey.json"
  });

  // Performs web and label detection on the image file
  const [resultsPics] = await client.webDetection(file);

  const webEntities = resultsPics.webDetection.webEntities;
  // console.log("images :", webEntities);

  // const [resultsName] = await client.labelDetection(file);
  // const labels = resultsName.labelAnnotations;

  // images.forEach(webEntitie => {
  //   resultsArr.push({ webEntitie: webEntitie.description });
  // });
  // labels.forEach(label => {
  //   resultsArr.push({ label: label.description });
  // });
  return webEntities;
};

///// ROUTES /////

app.get("/welcome", function(req, res) {
  console.log("*************************** GET WELCOME");
  if (req.session.userId) {
    res.redirect("/");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.post("/register", (req, res) => {
  console.log("*************************** regsiter POST !");
  let first = req.body.first;
  let last = req.body.last;
  let email = req.body.email;
  let password = req.body.password;

  if (req.body == {}) {
    res.json({ success: false });
  } else if (
    first == "" ||
    last == "" ||
    email == "" ||
    password == "" ||
    first.startsWith(" ") ||
    last.startsWith(" ") ||
    email.startsWith(" ") ||
    password.startsWith(" ")
  ) {
    res.json({ success: false });
  } else {
    bcrypt
      .hash(password)
      .then(hashedPass => {
        db.addUser(first, last, email, hashedPass, null)
          .then(results => {
            req.session.email = email;
            req.session.userId = results.rows[0].id;
            res.json({ success: true });
          })
          .catch(err => {
            console.log("error from addUser POST register: ", err);
            res.json({ success: false });
          });
      })
      .catch(err => {
        console.log("error from hashedPass: ", err);
        res.json({ success: false });
      });
  }
});

app.post("/login", function(req, res) {
  console.log("*************************** POST login");
  const email = req.body.email;
  const password = req.body.password;
  db.getUser(email)
    .then(results => {
      bcrypt
        .compare(password, results.rows[0].password)
        .then(result => {
          if (result) {
            req.session.userId = results.rows[0].id;
            req.session.email = email;
            res.json({ success: true });
          } else {
            res.json({ success: false });
          }
        })
        .catch(err => {
          console.log("error from bcrypt compare POST login: ", err);
          res.json({ success: false });
        });
    })
    .catch(err => {
      console.log("error from getUser POST login: ", err);
      res.json({ success: false });
    });
});

//// APIS ////

app.post("/garden", uploader.single("file"), s3.upload, (req, res) => {
  console.log("*************************** POST garden");
  let userId = req.session.userId;
  let plantName = req.body.plantName;
  const imageUrl = s3Url + req.file.filename;
  console.log("req.body: ", req.body);
  console.log("req.file: ", req.file);
  if (req.file) {
    db.addGarden(userId, imageUrl, plantName)
      .then(results => {
        res.json(results.rows);
      })
      .catch(function(err) {
        console.log("error from POST upload :", err);
        res.sendStatus(500);
      });
  }
});

app.post("/updategarden", (req, res) => {
  console.log("req.body from updategarden: ", req.body);
  let userId = req.session.userId;
  let shade = req.body.shade;
  let drought = req.body.drought;
  let moisture = req.body.moisture;
  let columnId = req.body.columnId;
  db.updateGarden(columnId, shade, drought, moisture)
    .then(results => {
      console.log("results from update garden: ", results);
      res.json(results);
    })
    .catch(err => {
      console.log("error from update garden: ", err);
    });
});

app.get("/garden.json", (req, res) => {
  let userId = req.session.userId;
  db.getGarden(userId)
    .then(results => {
      console.log("results from GET garden: ", results);
      res.json(results);
    })
    .catch(err => {
      console.log("error from GET garden: ", err);
    });
});

app.post("/upload", uploader.single("file"), async (req, res) => {
  console.log("**************************  upload POST");
  if (!req.session.userId) {
    res.redirect("/welome");
  }

  var filePathLocal = req.file.path;
  (filePath = filePathLocal),
    (formData = {
      image: fs.createReadStream(filePath)
    });

  let file = formData.image.path;
  allResults = [];

  const p1 = await new Promise((resolve, reject) => {
    googleAPI(file).then(results => {
      allResults.push(results);
      let firstResultsFromGoogle = results[0].description;
      let secondResultsFromGoogle = results[1].description;
      if (!firstResultsFromGoogle == "") {
        resolve(firstResultsFromGoogle);
      } else {
        resolve(secondResultsFromGoogle);
      }
    });
  });

  function getTrefle(firstResultsFromGoogle) {
    return new Promise((resolve, reject) => {
      let body = "";
      https.get(
        `https://trefle.io/api/plants?q=${firstResultsFromGoogle}&complete_data=true&token=${trfleToken}`,
        res => {
          res.on("data", function(chunk) {
            body += chunk;
          });
          res.on("end", function() {
            // if there is no full data making another request

            // console.log("body: ", body);
            // console.log("body.length: ", body.length);
            //
            // if (body.length < 3) {
            //   console.log(
            //     "no complete results from trefle, making normal request"
            //   );
            //   https.get(
            //     `https://trefle.io/api/plants?q=${firstResultsFromGoogle}&token=${trfleToken}`,
            //     res => {
            //       res.on("data", function(chunk) {
            //         body += chunk;
            //       });
            //       res.on("end", function() {
            //         console.log("body from end of second request :", body);
            //         // let parseBodyTwo = JSON.parse(body);
            //         allResults.push(body);
            //         console.log("all results: ", allResults);
            //         resolve(allResults);
            //         return;
            //       });
            //     }
            //   );
            // }
            let parsedBody = JSON.parse(body);
            // console.log("parsedBody from get trefle: ", parsedBody);
            allResults.push(parsedBody);
            resolve(allResults);
          });
        }
      );
    });
  }

  console.log("p1: ", p1);

  function getImage(url) {
    return new Promise((resolve, reject) => {
      let host = url.slice(8, 17);
      let path = url.replace("https://trefle.io", "");
      // console.log("host: ", host);
      // console.log("path: ", path);
      const options = {
        hostname: host,
        path: path,
        headers: {
          Authorization: `Bearer ${trfleToken}`
        }
      };
      let body = "";
      // let parsedResults = "";
      https
        .get(options, res => {
          res.on("data", function(chunk) {
            body += chunk;
            // console.log("body: ", body);
          });
          res.on("end", function() {
            let parsedBody = JSON.parse(body);
            // console.log("parsedBody from getImage from trefle: ", parsedBody);
            allResults.push(parsedBody);
            resolve(JSON.parse(body));
          });

          if (res.statusCode == 200) {
          } else {
            console.log("status code not 200");
            reject(res.statusMessage);
          }
        })
        .on("error", function(err) {
          console.log("err: ", err);
        });
    });
  }
  //
  async function fetch() {
    try {
      let google = await p1;
      if (google == "Vermont" || "Krystal Ann Photography") {
        google = "Common sunflower";
      }
      if (google.includes("lavender")) {
        google = "lavender thrift";
      }

      const trefle = await getTrefle(google);
      // console.log("trefle: ", trefle);
      const trefleLinks = trefle[1].map(trefle => trefle.link);
      console.log("trefleLinks: ", trefleLinks);
      if (trefleLinks.length > 0) {
        console.log("there is results from trufle");
        const promises = await Promise.all([
          getImage(trefleLinks[0].replace("http", "https"))
        ]);

        let trefleItems = promises.forEach((item, i) => {
          if (item != "") {
            allResults.push(item);
          }
        });
      }
      res.json(allResults);
    } catch (err) {
      console.log("err from try: ", err);
    }
  }

  return fetch();
});

// app.post("/userchoise/:userchoise", (req, res) => {
//   return new Promise((resolve, reject) => {
//     let allResults = [];
//     let body = "";
//     let userChoise = req.params.userchoise;
//     https.get(
//       `https://trefle.io/api/plants?q=${userChoise}&token=${trfleToken}`,
//       res => {
//         res.on("data", function(chunk) {
//           body += chunk;
//         });
//         res.on("end", function() {
//           let parseBodyTwo = JSON.parse(body);
//           console.log(
//             "parseBodyTwo from end of userChoise request :",
//             parseBodyTwo
//           );
//           // allResults.push(body);
//           // console.log("all results: ", allResults);
//           resolve(parseBodyTwo);
//         });
//       }
//     );
//   });
// });

app.get("*", function(req, res) {
  console.log("*************************** GET *");
  if (!req.session.userId) {
    console.log("*************************** REDIRECT TO WELCOME");
    res.redirect("/welcome");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.listen(8080, function() {
  console.log("I'm listening 808(0).");
});
