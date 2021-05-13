import express from "express";

import testRoute from "./api/testRoute.js"
import uploadNote from "./api/uploadNote.js"





export let router = express.Router();
router.all("/api/testRoute", testRoute);
router.all("/api/uploadNote", uploadNote);



// router.all("/*", (request, response) => response.send("<h1>404</h1>"));