const express = require("express");
const app = express();
const configRoutes = require("./routes");
const bodyParser = require("body-parser"); //json
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
// let urlMap = new Map();

// const logger = function (req,res,next) {
//   console.log("---------Logging Middleware-------");
//   console.log("Request Bodies: " + req.body);
//   console.log("URL PATH: " + req.protocol + '://' + req.get('host') + req.originalUrl);
//   console.log("HTTP Verb: " + req.method);
//   console.log("----------------------------------");
//   console.log("----------------------------------");
//   next();
// }
// const tracker = function (req,res,next) {
//   console.log("-------Tracking Middleware--------");
  
//   let urlNow = req.protocol + '://' + req.get('host') + req.originalUrl;
//   if (urlMap.get(urlNow) === undefined) {
//     urlMap.set(urlNow, 1);
//   } else {
//     urlMap.set(urlNow, parseInt(urlMap.get(urlNow)) + 1);
//   }
//   let it = urlMap.keys(); //an iterator for keys
//   let key = it.next();
//   while (!key.done) {
//     console.log("URL: " + key.value + "   Times: " + urlMap.get(key.value));
//     key = it.next();
//   }
//   console.log("----------------------------------");
//   console.log("----------------------------------");
//   next();
// }
// app.use(logger);
// app.use(tracker);
configRoutes(app);

app.listen(3001, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3001");
});