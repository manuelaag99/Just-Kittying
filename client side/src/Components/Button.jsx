import React from "react";

export default function Button ({ classnames, clickButtonFunction, textForButton }) {
    return (
        <button className={"rounded-button h-fit w-fit font-bold " + classnames} onClick={clickButtonFunction}>
            <p className="whitespace-nowrap">{textForButton}</p>
        </button>
    )
};