import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { v4 as uuidv4 } from "uuid";
import ImageUpload from "../ImageUpload";
import { supabase } from "../../supabase/client";
import LoadingSpinner from "./LoadingSpinner";
import MessageWindow from "./MessageWindow";

export default function CreateOrUpdatePost ({ fetchAgain, onClose, open, post, userId }) {
    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
    const [isMessageWindowForAnError, setIsMessageWindowForAnError] = useState();
    
    const [postContentState, setPostContentState] = useState({ postContentPhoto: null, postContentCaption: "" });
    
    // useEffect(() => {
    //     if (file) {
    //         setPostContentState({ ...postContentState, postContentPhoto: file });
    //     }
    // }, [file])

    function postTextHandle (e) {
        setPostContentState({ ...postContentState, postContentCaption: e.target.value });
    }

    useEffect(() => {
        if (post) {
            setPostContentState({ postContentPhoto: post.post_photo_url, postContentCaption: post.post_caption });
        }
    }, [])

    let new_post_id;
    let post_photo_path;
    async function createOrUpdatePost () {
        if (post) {
            try {
                const { error } = await supabase.from("jk-posts").update({ post_caption: postContentState.postContentCaption }).eq("post_id", post.post_id);
                if (error) console.log(error);
            } catch (err) {
                console.log(err);
            }
        } else if (!post) {
            new_post_id = uuidv4();
            post_photo_path = uuidv4();
            try {
                const { error } = await supabase.from("jk-posts").insert({ post_id: new_post_id, post_creator_id: userId, post_photo_path: post_photo_path, post_caption: postContentState.postContentCaption });
                if (error) console.log(error);
            } catch (err) {
                console.log(err);
            }
            try {
                const { data, error } = await supabase.storage.from("jk-images").upload("postPics/" + post_photo_path, postContentState.postContentPhoto);
                console.log(data)
                if (error) console.log(error);
                setTextForMessageWindow("Successfully shared your post.");
                setIsMessageWindowOpen(true);
            } catch (err) {
                console.log(err);
            }
        }
    }

    function closeMessageWindow () {
        if (textForMessageWindow === "Successfully shared your post.") {
            setIsMessageWindowOpen(false)
            onClose();
            fetchAgain();
        }
    }

    const createPost = (
        <div>
            <MessageWindow isErrorMessage={isMessageWindowForAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
            <div className="bg-black opacity-10 fixed top-0 bottom-0 w-screen h-screen z-20 duration-500" onClick={onClose}></div>
            <div className="flex flex-col fixed justify-center items-center z-50 top-[7%] md:left-[30%] left-[10%] md:w-4/10 w-8/10 h-fit bg-var-1 rounded-button drop-shadow-navbar">
                <div className="flex justify-center items-center w-9/10 h-6/10 md:my-6 mt-6 mb-4">
                    <div className="flex flex-col justify-center items-center w-9/10 aspect-square bg-var-2 mx-auto">
                        <ImageUpload sendFile={(file) => setPostContentState({...postContentState, postContentPhoto: file})} />
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center w-9/10 h-1/10 mb-5">
                    <input className="w-8/10 py-1 px-2 mr-2 outline-none" placeholder="Write down a caption..." type="text" onChange={postTextHandle} value={postContentState.postContentCaption} />
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