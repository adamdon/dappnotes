import dotenv from "dotenv/config";
import express from "express";
import morgan from "morgan";
import history from "connect-history-api-fallback";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import errorHandler from "./middleware/errorHandler.js";
import {router} from "./routes/router.js";
import {database} from "./controllers/database.js";



//Sets up livereload so changes to html will auto refresh browser without plugins
let livereloadServer = livereload.createServer({extraExts : ["vue"]});

livereloadServer.watch("react/build/");
livereloadServer.server.once("connection", () => {setTimeout(() => {livereloadServer.refresh("/");}, 100);});


// //Connecting to database using process.env.MONGO_URI environment variables
await database.connect();


//morgan logging config
morgan.token('body', (req, res) => JSON.stringify(req.body));
let morganFormat = "[express] :method :url - :body";
let morganConfig = {skip: function (req, res) { return req.method  !== "POST" }};


//Set request handles
let expressApp = express();

expressApp.use(connectLivereload()); //monkey patches HTML with livereload.js for auto F5
expressApp.use(morgan(morganFormat, morganConfig));
expressApp.use(express.json({ limit: '21KB' }));
expressApp.use(errorHandler);
expressApp.use("/", router);
expressApp.use(history());
// expressApp.use(express.static("react/build/"));
expressApp.use(express.static("./dist"));


//start server
expressApp.listen((process.env.PORT || 80), () => console.log("[express] listening for requests"));