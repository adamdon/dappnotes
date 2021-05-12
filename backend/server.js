import dotenv from "dotenv/config";
import express from "express";
import history from "connect-history-api-fallback";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
// import {router} from "./controllers/router.js";
// import {database} from "./controllers/database.js";



//Sets up livereload so changes to html will auto refresh browser without plugins
let livereloadServer = livereload.createServer({extraExts : ["vue"]});

livereloadServer.watch("frontend");
livereloadServer.server.once("connection", () => {setTimeout(() => {livereloadServer.refresh("/");}, 100);});


// //Connecting to database using process.env.MONGO_URI environment variables
// await database.connect();


//Set request handles
let expressApp = express();

expressApp.use(connectLivereload()); //monkey patches HTML with livereload.js for auto F5
expressApp.use(history());
expressApp.use(express.json());
expressApp.use(express.static("frontend"));
// expressApp.use("/", router);


//start server
expressApp.listen((process.env.PORT || 80), () => console.log("[express] listening for requests"));