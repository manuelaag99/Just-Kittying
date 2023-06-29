import React from "react";

export default function RoundPhoto ({classesForRoundPhoto, imageAlt, imageSource}) {
    return (
        <div className={classesForRoundPhoto}>
            <img className="h-full w-full object-cover rounded-circular " src={imageSource} alt={imageAlt} />
        </div>
    )
};