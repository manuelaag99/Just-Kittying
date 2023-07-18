import React, { useState } from "react";
import { createPortal } from "react-dom";


export default function PhotoCloseUp({ imageAlt, imageSource, open, onClose }) {

    const photoCloseUp = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <div className="flex flex-col fixed justify-center items-center z-50 top-[20%] sm:top-[5%] sm:left-[35%] left-[10%] sm:w-3/10 w-8/10 aspect-square bg-var-1 rounded-circular text-signInOrsignUpMob sm:text-signInOrsignUpDsk">
                <img className="h-full w-full object-cover rounded-circular cursor-pointer" src={imageSource} alt={imageAlt} />                
            </div>
        </div>
    )

    if (open) {
        return createPortal(photoCloseUp, document.body)
    } else {
        null
    }
};