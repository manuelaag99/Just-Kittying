import React from "react";

export default function Button ({ classnames, textForButton }) {
    return (
        <button className={"rounded-button h-fit w-fit font-bold " + classnames}>
            <p className="whitespace-nowrap">{textForButton}</p>
        </button>
    )
};