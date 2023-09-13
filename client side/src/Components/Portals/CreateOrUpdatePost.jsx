import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { v4 as uuidv4 } from "uuid";
import ImageUpload from "../ImageUpload";
import { supabase } from "../../supabase/client";

export default function CreateOrUpdatePost ({ open, onClose, userId }) {
    const [postContentState, setPostContentState] = useState({ postContentPhoto: null, postContentCaption: null });
    useEffect(() => {
        setPostContentState({ ...postContentState, postContentPhoto: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg"});
    }, [])
    function postTextHandle (e) {
        console.log(e.target.value);
        setPostContentState({ ...postContentState, postContentCaption: e.target.value});
    }

    let post_id;
    async function createOrUpdatePost () {
        post_id = uuidv4();
        try {
            const { error } = await supabase.from("jk-posts").insert({ post_id: post_id, post_creator_id: userId, post_photo_url: postContentState.postContentPhoto, post_caption: postContentState.postContentCaption });
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
    }

    const createPost = (
        <div>
            <div className="bg-black opacity-10 fixed top-0 bottom-0 w-screen h-screen z-20 duration-500" onClick={onClose}></div>
            <div className="flex flex-col fixed justify-center items-center z-50 top-[10%] md:left-[30%] left-[10%] md:w-4/10 w-8/10 h-fit bg-var-1 rounded-button drop-shadow-navbar">
                <div className="flex justify-center items-center w-9/10 h-6/10 md:my-6 mt-6 mb-4">
                    <div className="flex flex-col justify-center items-center w-9/10 aspect-square bg-var-2 mx-auto">
                        <ImageUpload />
                        {/* <AddAPhotoSharpIcon fontSize="large" />
                        <p>Upload a photo</p> */}
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center w-9/10 h-1/10 mb-5">
                    <input className="w-8/10 py-1 px-2 mr-2 outline-none" placeholder="Write down a caption..." type="text" onChange={postTextHandle} />
                    <button className="aspect-square w-fit rounded-circular p-2 cursor-pointer bg-var-3 hover:bg-var-3-hovered duration-200" onClick={createOrUpdatePost}>
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