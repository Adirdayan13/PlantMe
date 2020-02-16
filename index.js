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

app.post("/upload", uploader.single("file"), async (req, res) => {
  console.log("**************************  upload POST");
  // console.log("req.file: ", req.file);
  // console.log("path: ", req.file.path);
  // console.log("filePathLocal: ", filePathLocal);
  var filePathLocal = req.file.path;
  (filePath = filePathLocal),
    (formData = {
      image: fs.createReadStream(filePath)
    });

  const p1 = new Promise((resolve, reject) => {
    request
      .post(
        { url: "https://api.imagga.com/v2/tags", formData: formData },
        function(error, response, body) {
          // console.log("response: ", response);
          // console.log("Status:", response.statusCode);
          // console.log("Headers:", JSON.stringify(response.headers));
          console.log(
            "First response from imagga:",
            JSON.parse(body).result.tags
          );
          // firstResultImagga = JSON.parse(body).result.tags[0].tag.en;
          // res.json(body);
          resolve(JSON.parse(body).result.tags[0].tag.en);
        }
      )
      .auth(apiKey, apiSecret, true);
  });

  function getTrefle(imagga) {
    return new Promise((resolve, reject) => {
      let body = "";
      https.get(
        `https://trefle.io/api/plants?q=${imagga}&token=${trfleToken}`,
        res => {
          res.on("data", function(chunk) {
            body += chunk;
          });
          res.on("end", function() {
            // console.log("body from getTrefle: ", body);
            // console.log("parsed body from getTrefle: ", JSON.parse(body));
            resolve(JSON.parse(body));
          });
        }
      );
    });
  }

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
      let parsedResults = "";
      https
        .get(options, res => {
          res.on("data", function(chunk) {
            body += chunk;
            // console.log("body: ", body);
          });
          res.on("end", function() {
            // console.log(
            //   "JSON.parse(body).images[0]: ",
            //   JSON.parse(body).images[0]
            // );
            if (JSON.parse(body).images[0] != undefined) {
              // console.log(
              //   "JSON.parse(body).images[0].url: ",
              //   JSON.parse(body).images[0].url
              // );
              // console.log("^^^^^^^ YES ^^^^^^^");
              parsedResults += JSON.parse(body).images[0].url;
              // console.log("parsedResults inside if: ", parsedResults);
            }
            // console.log("parsedResults outside if: ", parsedResults);
            resolve(parsedResults);
          });

          if (res.statusCode == 200) {
            // console.log("body from 200: ", body);
            // console.log("parsedResults statusCode 200:", parsedResults);
            // resolve(parsedResults);
          } else {
            console.log("error: ");
            reject(res.statusMessage);
          }
        })
        .on("error", function(err) {
          console.log("err: ", err);
        });
    });
  }

  async function fetch() {
    const imagga = await p1;
    const plants = await getTrefle(imagga);
    // console.log("JSON.parse(plants)", JSON.parse(plants));
    // console.log("plants: ", plants);

    const imageUrls = plants.map(plant => plant.link);
    // console.log("imageUrls: ", imageUrls);
    const urls = imageUrls.reduce(function(array, url) {
      url = url.replace("http", "https");
      // console.log("url: ", url);
      // console.log("array: ", array);
      array.push(getImage(url));
      // console.log("array: ", array);
      return array;
    }, []);
    // console.log("urls: ", urls);
    // console.log("plants: ", plants);
    const promises = await Promise.all(urls);
    // console.log("promises: ", promises);

    let imagesLinks = promises.forEach((item, i) => {
      // console.log("plants[i]: ", plants[i]);
      if (item != "") {
        plants[i].imageUrl = item;
        // console.log("item: ", item);
      }
      // console.log("item: ", item);
      // console.log("plants[i]: ", plants[i]);
    });
    console.log("plants: ", plants);
    res.json(plants);
  }

  return fetch();
});

app.get("*", function(req, res) {
  console.log("*************************** GET *");
  // if (!req.session.userId) {
  //   console.log("*************************** REDIRECT TO WELCOME");
  //   res.redirect("/welcome");
  // } else {
  res.sendFile(__dirname + "/index.html");
  // }
});

app.listen(8080, function() {
  console.log("I'm listening 808(0).");
});
