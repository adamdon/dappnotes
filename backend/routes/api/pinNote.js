import { Readable } from 'stream'
import config from "../../modules/config.js"
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
        let meta = null;
        let metaReadStream = null;

        let imageResult = null;
        let metaResult = null;


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

        if((decodedURI.dataBuffer.byteLength / 1024) > config.maxFileSizeKb)
        {
            console.error("File Size Error: " + (decodedURI.dataBuffer.byteLength / 1024) + "KB is larger than max size of " + config.maxFileSizeKb + "KB");
            return response.status(500).json({errors: [{message: "Server error"}]});
        }


        try
        {
            const pinataApiKey = process.env.PINATA_API_KEY;
            const pinataSecretApiKey = process.env.PINATA_API_SECRET;
            const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);

            await pinata.testAuthentication();

            //image data pinning
            const pinataImagePinOptions = {pinataMetadata: {name: ("IMAGE: " + name)}, pinataOptions: {cidVersion: 1}};
            imageResult = await pinata.pinFileToIPFS(readStream, pinataImagePinOptions);


            //meta data pinning
            meta = {name: name, imageIpfsHash: imageResult.IpfsHash, imageUri: "NOT_SET"};
            metaReadStream = Readable.from(JSON.stringify(meta));
            metaReadStream.path = (name + ".json"); //set filename
            metaResult = await pinata.pinFileToIPFS(metaReadStream, {pinataMetadata: {name: ("META: " + name)}, pinataOptions: {cidVersion: 1}});
            if(metaResult.IpfsHash)
            {
                meta.metaIpfsHash = metaResult.IpfsHash;
            }
            else
            {
                console.error("IPFS Meta Error: " + metaResult);
                return response.status(500).json({errors: [{message: "Server error"}]});
            }
        }
        catch (error)
        {
            console.error("IPFS Error: " + error.message);
            return response.status(500).json({errors: [{message: "Server error"}]});
        }



        return response.status(200).json({note: meta});
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