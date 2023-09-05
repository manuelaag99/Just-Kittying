import React, { useState } from "react";

export default function ImageUpload () {

    const [file, setFile] = useState();
    const [previewPhotoUrl, setPreviewPhotoUrl] = useState();

    return (
        <div className="flex justify-center w-full">
            <input className="w-9/10 text-center" type="file" />
        </div>
    )
};