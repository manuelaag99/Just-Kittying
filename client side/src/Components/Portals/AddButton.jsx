import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import AddSharpIcon from '@mui/icons-material/AddSharp';
import CreateOrUpdatePost from "./CreateOrUpdatePost";

export default function AddButton({ open, userId }) {
    const [createPostWindow, setCreatePostWindow] = useState(false)

    function addButtonHandle () {setCreatePostWindow(true)};

    function closeCreatePostWindowHandle () {setCreatePostWindow(false)};

    const addButton = (
        <div>
            <CreateOrUpdatePost onClose={closeCreatePostWindowHandle} open={createPostWindow} userId={userId} />
            <div className="flex fixed justify-center items-center z-50 bottom-[2%] right-[2%] w-fit p-1 bg-var-3 hover:bg-var-3-hovered duration-200 cursor-pointer aspect-square rounded-circular drop-shadow-button " onClick={addButtonHandle} >
                <AddSharpIcon className="text-var-1 pr-[1px]" fontSize="large" />
            </div>
        </div>
    )

    if (open) {
        return createPortal(addButton, document.body)
    } else {
        null
    }
};