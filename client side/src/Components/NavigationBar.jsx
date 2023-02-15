import React from "react";

const NavigationBar = props => {
    return (
        <div className={"z-40 w-full h-nav-height-dsk drop-shadow-navbar " + props.navPosition + props.navBackgColor}>
            {props.content}
        </div>
    )
}

export default NavigationBar;