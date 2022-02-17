import React, {useRef, useState, useEffect} from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {useData} from "../../utilities/DataContextProvider";


export default function StepImageSelect(props)
{
    const [data, setData] = useData();
    const [files, setFiles] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const pond = useRef(null);



    //
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
        else
        {
            // setIsComplete(false)
        }
    }


















    registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode, FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

    async function onAddFileComplete(error, file)
    {
        if(!error)
        {
            setData({selectedFile: file});
            setData({selectedFileName: file.file.name});
            setData({imageDataUri: file.getFileEncodeDataURL()});
            setData({filesizeKb: (file.file.size / 1024).toFixed(3)});
            setIsComplete(true);
        }

    }

    async function onRemoveFile()
    {
        if(data.selectedFile)
        {
            setData({selectedFile: null});
            setIsComplete(false);
        }
    }



    function previousOnClick()
    {
        props.previousStep();
    }

    async function nextOnClick()
    {
        if(isComplete)
        {
            if(data.selectedFile)
            {
                let note = {name: data.selectedFile.filenameWithoutExtension, dataUri: data.selectedFile.getFileEncodeDataURL()}
                // await fetchOffChainNote(note);
                props.nextStep();
            }
        }
        else
        {
            setData({toastMessage: "Select an image to continue"})
        }

    }


    return (
        <div>
            <h5 className="display-10">Select Image File</h5>


            <FilePond
                ref={pond}
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={1}
                credits={false}
                allowFileEncode={true}
                name="files"
                allowFileSizeValidation={true}
                maxFileSize={data.config.maxFileSizeKb + "KB"}
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpeg']}
                onaddfile={async (error, file) => await onAddFileComplete(error, file)}
                onremovefile={async (error, file) => await onRemoveFile()}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span> (JPEG or PNG, max size 10MB)'
            />




            <div className="mt-3 text-center fixed-bottom">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <div className="btn-group" role="group">
                        {/*<button onClick={previousOnClick} disabled={disabled} type="button" className="btn btn-danger">Previous</button>*/}
                        <button onClick={nextOnClick} disabled={disabled} type="button" className={`btn btn-success ${isComplete ? "" : "opacity-25"}`}>Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}