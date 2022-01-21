import { Readable } from 'stream'
import pinataSDK from '@pinata/sdk';
import imageDataURI from "image-data-uri";
import validDataUrl from 'valid-data-url';



export default async function (request, response)
{
    try
    {
        let note = request.body.note;
        let name = request.body.note.name;
        let dataUri = request.body.note.dataUri;

        let decodedURI = null;
        let readStream = null;
        let result = ""


        if((typeof note == "undefined") || (typeof name == "undefined") || (typeof dataUri == "undefined"))
        {
            return response.status(400).json({errors: [{message: "Missing data"}] });
        }


        if(name === null || name === "")
        {
            return response.status(400).json({errors: [{message: "Name must be set"}] });
        }


        if(dataUri === null || dataUri === "")
        {
            return response.status(400).json({errors: [{message: "Data must be set"}] });
        }


        if(!validDataUrl(dataUri))
        {
            return response.status(400).json({errors: [{message: "Data URI is invalid"}] });
        }

        
        try
        {
            decodedURI = imageDataURI.decode(dataUri);
            readStream = Readable.from(decodedURI.dataBuffer);
            readStream.path = (name + "." + decodedURI.imageType.split("/").pop()); //set filename
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
            const pinataPinOptions = {pinataMetadata: {name: name}, pinataOptions: {cidVersion: 1}};

            result = await pinata.pinFileToIPFS(readStream, pinataPinOptions);
        }
        catch (error)
        {
            console.error("IPFS Error: " + error.message);
            return response.status(500).json({errors: [{message: "Server error"}]});
        }




        return response.status(200).json({result: result});
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