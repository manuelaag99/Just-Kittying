import React from "react";

export default function PostPhoto ({ imageSource }) {
    return (
        <img className="h-full object-contain" src={imageSource} alt="" />
    )
};