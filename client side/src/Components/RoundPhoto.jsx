import React, { useEffect, useState } from "react";

import PhotoCloseUp from "./Portals/PhotoCloseUp";
import { supabase } from "../supabase/client";

export default function RoundPhoto ({ classesForRoundPhoto, imageAlt, imageSource, photoPath }) {
    const [openPhotoCloseUp, setOpenPhotoCloseUp] = useState(false);

    function openImageHandle () {
        setOpenPhotoCloseUp(true);
    }

    function closeImageHandle () {
        setOpenPhotoCloseUp(false);
    }

    const [photo, setPhoto] = useState();
    async function fetchPhoto () {
        try {
            const { data, error } = await supabase.storage.from("jk-images").getPublicUrl("userProfilePics/" + photoPath);
            if (error) console.log(error);
            setPhoto(data.publicUrl);
        } catch (err) {
            console.log(err);
        }
    }
    // useEffect(() => {
    //     fetchPhoto();
    // }, [])

    return (
        <div className={classesForRoundPhoto}>
            <PhotoCloseUp imageAlt={imageAlt} imageSource={imageSource} onClose={closeImageHandle} open={openPhotoCloseUp} />
            <img className="h-full w-full object-cover rounded-circular cursor-pointer hover:opacity-40 duration-200 " onClick={openImageHandle} src={imageSource} alt={imageAlt} />
        </div>
    )
};