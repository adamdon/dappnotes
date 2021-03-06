import dotenv from "dotenv/config";
import express from "express";
import morgan from "morgan";
import history from "connect-history-api-fallback";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import cors from "cors";
import config from "./modules/config.js"
import errorHandler from "./middleware/errorHandler.js";
import {router} from "./routes/router.js";
import {Database} from "./modules/database.js";


//Set request handles
let expressApp = express();

if(process.env.NODE_ENV === "DEVELOPMENT") //if running on dev mode
{
    //Sets up livereload so changes to html will auto refresh browser without plugins
    let livereloadServer = livereload.createServer({extraExts : ["vue"]});

    livereloadServer.watch("./frontend/build");
    livereloadServer.server.once("connection", () => {setTimeout(() => {livereloadServer.refresh("/");}, 100);});
    expressApp.use(connectLivereload()); //monkey patches HTML with livereload.js for auto F5
    expressApp.use(cors()); //allow Cross-origin resource sharing in development only
    console.log("[livereloadServer] auto refresh for changes: on");
}


// //Connecting to database using process.env.MONGO_URI environment variables
await Database.connect();


//morgan logging config
morgan.token('body', (req, res) => JSON.stringify(req.body).slice(0, 120));
let morganFormat = "[express] :method :url - :body";
let morganConfig = {skip: function (req, res) { return req.method  !== "POST" }};

expressApp.use(morgan(morganFormat, morganConfig));
expressApp.use(express.json({ limit: (config.maxFileSizeKb * 4).toString() + "KB" }));
expressApp.use(errorHandler);
expressApp.use("/", router);
expressApp.use(history());
expressApp.use(express.static("./frontend/build"));



//start server
expressApp.listen((process.env.PORT || 80), () => console.log("[express] listening for requests"));