import validator from 'validator';
import mongoose from "mongoose";

import {Note} from "../../models/Note.js";
import {Database} from "../../modules/database.js";



export default async function (request, response)
{
    try
    {
        let note = request.body.note;
        let name = request.body.note.name;
        let imageIpfsHash = request.body.note.imageIpfsHash;
        let imageUri = request.body.note.imageUri;


        // Check database is connected
        if (Database.isConnected === false)
        {
            return response.status(500).json({errors: [{message: "Database unavailable"}] });
        }


        if((typeof note == "undefined") || (typeof name == "undefined") || (typeof imageIpfsHash == "undefined") || (typeof imageUri == "undefined"))
        {
            return response.status(400).json({errors: [{message: "Missing data"}] });
        }

        // Validate input
        if (name === "")
        {
            return response.status(400).json({errors: [{message: "name is required"}] });
        }

        if (imageIpfsHash === "")
        {
            return response.status(400).json({errors: [{message: "imageIpfsHash is required"}] });
        }

        if (imageUri === "")
        {
            return response.status(400).json({errors: [{message: "imageIpfsHash is required"}] });
        }

        // if (!validDataUri(imageUri))
        // {
        //     return response.status(400).json({errors: [{message: "dataUri not valid"}] });
        // }

        let foundNote = await Note.findOne({imageIpfsHash: request.body.note.imageIpfsHash});
        if (foundNote)
        {
            return response.status(200).json({message: "Already uploaded", note: foundNote});
        }

        let newNote = new Note({name: note.name, imageIpfsHash: note.imageIpfsHash, imageUri: note.imageUri});
        await newNote.save();

        return response.status(200).json({message: "Note uploaded", note: newNote});
    }
    catch (error)
    {
        if (error instanceof SyntaxError)
        {
            return response.status(500).json({errors: [{message: "SyntaxError error"}]});
        }
        else
        {
            console.error(error.message);
            return response.status(500).json({errors: [{message: "Server error"}]});
        }


    }
}