import React from "react";
import { createPortal } from "react-dom"

export default function LoadingSpinner ({ open }) {
    const loadingSpinner = (
        <div>
            <div className="bg-var-1 fixed top-0 bottom-0 w-screen h-screen flex justify-center items-center">
                <div className="circle"></div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(loadingSpinner, document.body)
    } else {
        null
    }
}