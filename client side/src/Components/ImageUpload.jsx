import React, { useState } from "react";

export default function ImageUpload () {

    const [file, setFile] = useState();
    const [previewPhotoUrl, setPreviewPhotoUrl] = useState();

    return (
        <div>
            <input type="file" />
        </div>
    )
};