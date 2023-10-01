import React, { useState } from "react";

import PhotoCloseUp from "./Portals/PhotoCloseUp";

export default function RoundPhoto ({classesForRoundPhoto, imageAlt, imageSource}) {
    const [openPhotoCloseUp, setOpenPhotoCloseUp] = useState(false);

    function openImageHandle () {
        setOpenPhotoCloseUp(true);
    }

    function closeImageHandle () {
        setOpenPhotoCloseUp(false);
    }

    return (
        <div className={classesForRoundPhoto}>
            <PhotoCloseUp imageAlt={imageAlt} imageSource={imageSource} onClose={closeImageHandle} open={openPhotoCloseUp} />
            <img className="h-full w-full object-cover rounded-circular cursor-pointer hover:opacity-40 duration-200 " onClick={openImageHandle} src={imageSource} alt={imageAlt} />
        </div>
    )
};