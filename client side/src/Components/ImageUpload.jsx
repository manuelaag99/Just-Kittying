import React, { useEffect, useRef, useState } from "react";

import CloseIcon from '@mui/icons-material/Close';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { v4 as uuidv4 } from "uuid";

export default function ImageUpload () {
    const imageSelectorRef = useRef();
    const [file, setFile] = useState();
    const [previewPhotoUrl, setPreviewPhotoUrl] = useState();

    useEffect(() => {
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.onload = () => setPreviewPhotoUrl(fileReader.result);
        fileReader.readAsDataURL(file);
    }, [file]);

    function selectFileHandler (e) {
        imageSelectorRef.current.click(e);
    }

    function uploadImage (e) {
        console.log(e.target.files)
        setFile(e.target.files[0]);
        setPreviewPhotoUrl(e.target.files[0]);
    }

    function cancelImageUpload () {
        if (file) {
            setFile();
            setPreviewPhotoUrl();
        } else {
            setPreviewPhotoUrl();
        }
    }

    return (
        <div className="flex justify-center w-full h-full relative aspect-square">
            {file && previewPhotoUrl && <div className="absolute top-0 right-0 m-2 z-20">
                <button className="bg-black hover:bg-gray-600 duration-200 rounded-post px-2 text-white mr-3" onClick={(e) => selectFileHandler(e)}>
                    change
                </button>
                <button className="bg-black hover:bg-gray-600 duration-200 rounded-post px-2 text-white" onClick={cancelImageUpload}>
                    <CloseIcon />
                </button>
            </div>}
            {!file && !previewPhotoUrl && <button className="flex justify-center items-center w-full h-full z-10 cursor-pointer " onClick={(e) => selectFileHandler(e)}>
                <p className="text-center cursor-pointer z-20 " onClick={(e) => selectFileHandler(e)}>
                    <InsertPhotoIcon />  Select an image
                </p>
            </button>}
            {file && previewPhotoUrl && <img alt="image" className="object-contain w-full z-10 cursor-pointer" src={previewPhotoUrl}  />}
            <input className="w-9/10 text-center hidden" onChange={(e) => uploadImage(e)} ref={imageSelectorRef} type="file" />
        </div>
    )
};