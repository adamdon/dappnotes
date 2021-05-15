import validator from 'validator';
import mongoose from "mongoose";

import {Note} from "../../models/Note.js";
import validDataUri from "../../helpers/validDataUri.js";



export default async function (request, response)
{
    try
    {
        let note = request.body.note;
        let name = request.body.note.name;
        let dataUri = request.body.note.dataUri;


        if((typeof note == "undefined") || (typeof name == "undefined") || (typeof dataUri == "undefined"))
        {
            return response.status(400).json({errors: [{message: "Missing data"}] });
        }

        // Validate input
        if (name === "")
        {
            return response.status(400).json({errors: [{message: "name is required"}] });
        }

        if (dataUri === "")
        {
            return response.status(400).json({errors: [{message: "dataUri is required"}] });
        }

        if (!validDataUri(dataUri))
        {
            return response.status(400).json({errors: [{message: "dataUri not valid"}] });
        }

        let newNote = new Note({dataUri: note.dataUri, name: note.name});
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