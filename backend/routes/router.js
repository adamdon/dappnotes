import express from "express";

import pinNote from "./api/pinNote.js"
import getConfig from "./api/getConfig.js"
import uploadNote from "./api/uploadNote.js"
import downloadNote from "./api/downloadNote.js"





export let router = express.Router();
router.all("/api/pinNote", pinNote);
router.all("/api/getConfig", getConfig);
router.all("/api/uploadNote", uploadNote);
router.all("/api/downloadNote", downloadNote);



// router.all("/*", (request, response) => response.send("<h1>404</h1>"));