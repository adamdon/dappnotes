import { Readable } from 'stream'
import pinataSDK from '@pinata/sdk';
import imageDataURI from "image-data-uri";
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

        let decodedURI = null;
        let readStream = null;


        if((typeof note == "undefined") || (typeof name == "undefined") || (typeof dataUri == "undefined"))
        {
            return response.status(400).json({errors: [{message: "Missing data"}] });
        }

        
        try
        {
            decodedURI = imageDataURI.decode(dataUri);
            readStream = Readable.from(decodedURI.dataBuffer);
            readStream.path = "test_file_name.jpg";

            // console.log("decodedURI");
            // console.log(typeof decodedURI.dataBuffer);
            // console.log(decodedURI.dataBuffer);

        }
        catch (error)
        {
            console.error("URI Decode Error: " + error.message);
            return response.status(500).json({errors: [{message: "Server error"}]});
        }


        try
        {
            const pinataApiKey = process.env.PINATA_API_KEY;
            const pinataSecretApiKey = process.env.PINATA_API_SECRET;
            const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);

            await pinata.testAuthentication();


            const pinataPinOptions =
            {
                pinataMetadata:
                {
                    name: "MyCustomNameTest",
                    keyvalues:
                    {
                        customKey: 'customValue',
                        customKey2: 'customValue2'
                    }
                },
                pinataOptions:
                {
                    cidVersion: 0
                }
            };

            const opp2 = {test: "text"};

            pinata.pinFileToIPFS(readStream, pinataPinOptions).then((result) => {
                //handle results here
                console.log("result");
                console.log(result);
            }).catch((err) => {
                //handle error here
                console.log("err");
                console.log(err);
            });



        }
        catch (error)
        {
            console.error("Pinata Error: " + error.message);
            return response.status(500).json({errors: [{message: "Server error"}]});
        }



        return response.status(200).json({message: "Data uploaded", note: "newNote"});
    }
    catch (error)
    {
        if (error instanceof SyntaxError)
        {
            console.error("Syntax Error: " + error.message);
            return response.status(500).json({errors: [{message: "Server error"}]});
        }
        else
        {
            console.error("Unknown Error: " + error.message);
            return response.status(500).json({errors: [{message: "Server error"}]});
        }


    }
}