import React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import AddSharpIcon from '@mui/icons-material/AddSharp';

export default function AddButton({ open }) {
    const addButton = (
        <div>
            <div className="fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <Link className="flex fixed justify-center items-center z-50 bottom-[2%] right-[2%] w-fit p-1 bg-var-3 hover:bg-var-3-hovered duration-200 cursor-pointer aspect-square rounded-circular drop-shadow-button " to="/createpost" >
                <AddSharpIcon className="text-var-1 pr-[1px]" fontSize="large" />
            </Link>
        </div>
    )

    if (open) {
        return createPortal(addButton, document.body)
    } else {
        null
    }
};