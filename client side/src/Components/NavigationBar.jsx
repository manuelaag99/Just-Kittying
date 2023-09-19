import React from "react";

export default function NavigationBar ({ content, navBackgColor, navPosition }) {
    return (
        <div className={"z-20 w-full sm:h-nav-height-dsk h-nav-height-mob drop-shadow-navbar " + navBackgColor + navPosition}>
            {content}
        </div>
    )
};