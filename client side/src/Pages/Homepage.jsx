import React from "react";
import { Link } from "react-router-dom";

import NavigationBar from "../Components/NavigationBar";
import NavBottomContent from "../Components/NavBottomContent";
import NavTopContent from "../Components/NavTopContent";
import TimeLine from "../Components/TimeLine";

const Homepage = () => {
    return (
        <div className="bg-var-1 w-full h-full">
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent />}/>
            <NavigationBar navPosition=" fixed bottom-0 " navBackgColor=" bg-var-3 " content={<NavBottomContent />}/>
            <TimeLine />
        </div>
    )
}

export default Homepage
