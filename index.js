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

///// ROUTES

app.get("/welcome", function(req, res) {
  console.log("*************************** GET WELCOME");
  if (req.session.userId) {
    res.redirect("/");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.post("/click", (req, res) => {
  console.log("req.body: ", req.body);
  console.log("clicked");
  request
    .get(
      "https://api.imagga.com/v2/tags?image_url=" +
        encodeURIComponent(imageUrl),
      function(error, response, body) {
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", JSON.stringify(body));
        console.log("body: ", body);
        res.json(body);
      }
    )
    .auth(apiKey, apiSecret, true);
});

app.post("/upload", uploader.single("file"), async (req, res) => {
  console.log("**************************  click POST");
  // console.log("req.file: ", req.file);
  // console.log("path: ", req.file.path);
  var filePathLocal = req.file.path;
  console.log("filePathLocal: ", filePathLocal);
  (filePath = filePathLocal),
    (formData = {
      image: fs.createReadStream(filePath)
    });

  try {
    await request
      .post(
        { url: "https://api.imagga.com/v2/tags", formData: formData },
        function(error, response, body) {
          // console.log("response: ", response);
          // console.log("Status:", response.statusCode);
          // console.log("Headers:", JSON.stringify(response.headers));
          console.log(
            "Response from imagga:",
            JSON.parse(body).result.tags[0].tag.en
          );
          const firstResultImagga = JSON.parse(body).result.tags[0].tag.en;
          res.json(body);
        }
      )
      .auth(apiKey, apiSecret, true);
    //
    // await https.get(
    //   `https://trefle.io/api/plants?q=mint&token=UlE1S2s3SWtCZ01qelVrK0xOU0dpdz09`,
    //   res => {
    //     var body = "";
    //     res.on("data", function(chunk) {
    //       body += chunk;
    //     });
    //     res.on("end", function() {
    //       console.log("body from end: ", body);
    //     });
    //     console.log("body: ", body);
    //   }
    // );
    // console.log("dataFromTrefle: ", dataFromTrefle);
  } catch (e) {
    console.log("error from post: ", e);
  }
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
