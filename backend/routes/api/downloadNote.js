import validator from 'validator';
import mongoose from "mongoose";

import {Note} from "../../models/Note.js";
import {verifyObjectId} from "../../helpers/verifyObjectId.js";


export default async function (request, response)
{
    try
    {
        let _id = request.body._id;


        //Check field is there
        if((typeof _id == "undefined"))
        {
            return response.status(400).json({errors: [{message: "Missing data"}] });
        }

        // Check that data is not null
        if (validator.isEmpty(_id))
        {
            return response.status(400).json({errors: [{message: "_id is required"}] });
        }

        //check that ID is valid
        if (!mongoose.Types.ObjectId.isValid(_id))
        {
            return response.status(400).json({errors: [{message: "_id not valid"}] });
        }

        //Check for note in database
        let foundNote = await Note.findOne({_id: _id});
        if (!foundNote)
        {
            return response.status(400).json({errors: [{msg: "Note not found"}]});
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