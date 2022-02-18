import React, {useEffect, useState} from "react";
import imageCompression from 'browser-image-compression';
import ProgressBar from "@ramonak/react-progress-bar";
import {useData} from "../../utilities/DataContextProvider";
import HomePage from "./HomePage";
import AnimatedMount from "../../utilities/AnimatedMount";




export default function StepImageCompress(props)
{
    const [data, setData] = useData();
    const [isComplete, setIsComplete] = useState(false);
    const [imageUri, setImageUri] = useState("");
    const [show, setShow] = useState(false);
    const [progressPercentage, setProgressPercentage] = useState(0);



    useEffect( () =>
    {
        async function effectOnChange()
        {
            await isActiveOnChange(props.isActive);
        }
        effectOnChange().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isActive]);

    async function isActiveOnChange(isActive)
    {
        if(isActive)
        {
            // console.log('isActiveOnChange: ' + isActive.toString());
        }
    }

    //
    // function onProgress(progressPercentage)
    // {
    //     console.log(progressPercentage)
    //     setProgressPercentage(progressPercentage);
    //
    // }




    async function compressImage(imageFile)
    {
        try
        {
            const options = {maxSizeMB: (data.config.maxCompressedFileSizeKb / 1024), maxWidthOrHeight: 1000, useWebWorker: true, onProgress: ((progress) => setProgressPercentage(progress))}
            const compressedFile = await imageCompression(imageFile, options);

            return compressedFile;
        }
        catch (error)
        {
            setData({toastError: error.toString()});
        }
    }


    async function startOnClick()
    {
        setShow(true); //shows loading bar

        const compressedImage = await compressImage(data.selectedFile.file);
        const imageUri = await imageCompression.getDataUrlFromFile(compressedImage);

        const originalSize = (data.selectedFile.file.size / 1024).toFixed(3);
        const compressedSize = (compressedImage.size / 1024).toFixed(3);


        if(compressedSize < originalSize)
        {
            setData({compressedImage: compressedImage});
            setData({compressedImageDataUri: imageUri});
            setData({filesizeKb: compressedSize});
            setImageUri(imageUri);

            setData({toastSuccess: "Image compressed from " + originalSize+ "KB to " + compressedSize + "KB" });
        }
        else
        {
            setData({compressedImage: compressedImage});
            setData({compressedImageDataUri: data.imageDataUri});
            setData({filesizeKb: originalSize});
            setImageUri(data.imageDataUri);

            // setData({toastSuccess: "Image compressed from " + originalSize+ "KB to " + compressedSize + "KB" });
            setData({toastSuccess: "Image cannot be compressed further, original will be used for blockchain"});
        }
        setIsComplete(true);

    }






    function previousOnClick()
    {
        props.previousStep();
    }

    async function nextOnClick()
    {
        if(isComplete)
        {
            props.nextStep();
        }
        else
        {
            setData({toastMessage: "Compress image file to continue"})
        }
    }



    return (
        <div>
            <h5 className="display-10">Compress Image</h5>


            <div className="my-3 text-center">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <button onClick={startOnClick} disabled={false} type="button" className="btn btn-dark">
                        <span><i className="fa fa-compress"></i> Start Compression</span>
                    </button>
                    {/*{show ? <ProgressBar completed={progressPercentage} bgColor={"green"} baseBgColor={'#3a4b6d'}/> : <div> </div>}*/}
                    <ProgressBar className={show ? "visible" : "invisible"} completed={progressPercentage} bgColor={"green"} baseBgColor={'#3a4b6d'} borderRadius={'5px'}/>

                    {/*<div className={'h-75'}>*/}
                    {/*    {imageUri === "" ? <div> </div> : <a href={imageUri} download={"compressed_" + data.selectedFile.file.name}> <img className={' h-100 rounded'} src={imageUri} alt={"image"}/> </a> }*/}
                    {/*</div>*/}

                    <AnimatedMount show={imageUri !== ""}>
                        <div className={''}>
                            {imageUri === "" ? <div> </div> : <a href={imageUri} download={"compressed_" + data.selectedFile.file.name}> <img className={'img-fluid rounded'} style={{maxHeight: 200}} src={data.compressedImageDataUri} alt={"image"}/> </a> }
                        </div>
                    </AnimatedMount>


                </div>
            </div>




            <div className="mt-3 text-center fixed-bottom">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <div className="btn-group" role="group">
                        {/*<button onClick={previousOnClick} disabled={false} type="button" className="btn btn-danger">Previous</button>*/}
                        <button onClick={nextOnClick} disabled={false} type="button" className={`btn btn-success ${isComplete ? "" : "opacity-25"}`}>Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}