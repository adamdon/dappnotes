import validator from 'validator';
import mongoose from "mongoose";

import {Note} from "../../models/Note.js";
// import {verifyObjectId} from "../../helpers/verifyObjectId.js";


export default async function (request, response)
{
    try
    {
        let imageIpfsHash = request.body.imageIpfsHash;


        //Check field is there
        if((typeof imageIpfsHash == "undefined"))
        {
            return response.status(400).json({errors: [{message: "Missing data"}] });
        }

        // Check that data is not null
        if (imageIpfsHash === "")
        {
            return response.status(400).json({errors: [{message: "imageIpfsHash is required"}] });
        }


        //Check for note in database
        let foundNote = await Note.findOne({imageIpfsHash: request.body.imageIpfsHash});
        if (!foundNote)
        {
            return response.status(400).json({errors: [{message: "Note not found"}]});
        }

        return response.status(200).json(foundNote);
    }
    catch (error)
    {
        if (error instanceof SyntaxError)
        {
            return response.status(500).json({errors: [{message: "SyntaxError error"}]});
        }
        else
        {
            console.error(error);
            return response.status(500).json({errors: [{message: "Server error"}]});
        }


    }
}