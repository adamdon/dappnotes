import validator from 'validator';
import mongoose from "mongoose";

import {Note} from "../../models/Note.js";


export default async function (request, response)
{
    try
    {
        let dataUri = request.body.dataUri;


        if((typeof dataUri == "undefined"))
        {
            return response.status(400).json({errors: [{message: "Missing data"}] });
        }

        // Validate input
        if (validator.isEmpty(dataUri))
        {
            return response.status(400).json({errors: [{message: "dataUri is required"}] });
        }

        let newNote = new Note({dataUri: dataUri,});
        await newNote.save();

        return response.status(200).json({message: "Data uploaded", note: newNote});
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