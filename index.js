const db = require("./db");
const csurf = require("csurf");
const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const path = require("path");
const https = require("https");
const bcrypt = require("./bcrypt");

const multer = require("multer");
const s3 = require("./s3");
const uidSafe = require("uid-safe");
const { s3Url } = require("./config");
const server = require("http").Server(app);
const io = require("socket.io").listen(server);
const secret = require("./secrets");

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
    fileSize: 10097152
  }
});

/// GOOGLE API ////

const googleAPI = async function quickstart(file) {
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./APIKey.json"
  });

  // Performs web detection on the image file
  const [resultsPics] = await client.webDetection(file);
  const webEntities = resultsPics.webDetection.webEntities;

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

app.post("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect("/");
});

//// APIS ////

app.post("/garden", uploader.single("file"), s3.upload, (req, res) => {
  if (!req.session.userId) {
    res.redirect("/welome");
  }
  let userId = req.session.userId;
  let plantName = req.body.plantName;
  if (plantName == "undefined") {
    plantName = "My plant";
  }
  const imageUrl = s3Url + req.file.filename;
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

app.post("/updategardenname", (req, res) => {
  let id = req.body.plantId;
  let name = req.body.plantName;
  if (name == undefined || name == "" || !name) {
    name = "My plant";
  }
  console.log("name :", name);
  db.updateGardenName(id, name)
    .then(results => {
      console.log("results from updategardenname");
      res.json(results);
    })
    .catch(err => console.log("error from update name: ", err));
});

app.post("/updategarden", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/welome");
  }
  let userId = req.session.userId;
  let common_name = req.body.common_name;
  let columnId = req.body.columnId;
  let shade = req.body.shade;
  let moisture = req.body.moisture;
  let drought = req.body.drought;
  let bloom = req.body.bloom;
  let growth = req.body.growth;
  db.updateGarden(
    columnId,
    shade,
    drought,
    moisture,
    bloom,
    growth,
    common_name
  )
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log("error from update garden: ", err);
    });
});

app.post("/deleteGarden", (req, res) => {
  let id = req.body.plantId;
  db.deleteGarden(id)
    .then(results => {
      res.json({ deleted: true });
    })
    .catch(err => console.log("err from delete garden: ", err));
});

app.get("/garden.json", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/welome");
  }
  let userId = req.session.userId;
  db.getGarden(userId)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log("error from GET garden: ", err);
    });
});

app.post("/upload", uploader.single("file"), async (req, res) => {
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
            let parsedBody = JSON.parse(body);
            allResults.push(parsedBody);
            resolve(allResults);
          });
        }
      );
    });
  }

  function getImage(url) {
    return new Promise((resolve, reject) => {
      let host = url.slice(8, 17);
      let path = url.replace("https://trefle.io", "");
      const options = {
        hostname: host,
        path: path,
        headers: {
          Authorization: `Bearer ${trfleToken}`
        }
      };
      let body = "";

      https
        .get(options, res => {
          res.on("data", function(chunk) {
            body += chunk;
          });
          res.on("end", function() {
            let parsedBody = JSON.parse(body);
            allResults.push(parsedBody);
            resolve(JSON.parse(body));
          });

          if (res.statusCode !== 200) {
            console.log(`status code: ${res.statusCode}`);
            reject(res.statusMessage);
          }
        })
        .on("error", function(err) {
          console.log("err: ", err);
        });
    });
  }

  async function fetch() {
    try {
      let google = await p1;
      const trefle = await getTrefle(google);
      const trefleLinks = trefle[1].map(trefle => trefle.link);
      if (trefleLinks.length > 0) {
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

app.get("*", function(req, res) {
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
