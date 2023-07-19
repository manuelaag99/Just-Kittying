import React, { useState } from "react";
import { createPortal } from "react-dom";

import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function CreateOrUpdatePost ({ open, onClose }) {
    const [postContentState, setPostContentState] = useState({ postContentPhoto: null, postContentCaption: null, isFormValid: false });

    
    const [postCaption, setPostCaption] = useState(null);

    function postTextHandle (e) {
        setPostCaption(e.target.value);
    }

    const createPost = (
        <div>
            <div className="bg-black opacity-10 fixed top-0 bottom-0 w-screen h-screen z-20 duration-500" onClick={onClose}></div>
            <div className="flex flex-col fixed justify-center items-center z-50 top-[10%] sm:left-[25%] left-[5%] sm:w-5/10 w-9/10 h-fit bg-var-1 rounded-button drop-shadow-navbar">
                <div className="flex justify-center items-center w-9/10 h-6/10 my-6">
                    <div className="flex flex-col justify-center items-center w-8/10 aspect-square bg-var-2 mx-auto">
                        <AddAPhotoSharpIcon fontSize="large" />
                        <p>Upload a photo</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center w-full h-1/10 mb-6">
                    <input className="w-7/10 py-1 px-2 mr-2 outline-none" placeholder="Write down a caption..." type="text" onChange={postTextHandle} />
                    <button className="aspect-square w-fit rounded-circular p-2 cursor-pointer bg-var-3 hover:bg-var-3-hovered duration-200">
                        <SendRoundedIcon className="text-var-1" />
                    </button>
                </div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(createPost, document.body)
    } else {
        null
    }
}