import React from "react";

export default function NavigationBar () {
    return (
        <div className={"z-40 w-full h-nav-height-dsk drop-shadow-navbar " + props.navPosition + props.navBackgColor}>
            {props.content}
        </div>
    )
};