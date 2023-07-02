import React from "react";

import NavigationBar from "../Components/NavigationBar";
import NavBottomContent from "../Components/NavBottomContent";
import NavTopContent from "../Components/NavTopContent";
import TimeLine from "../Components/TimeLine";
import UserProfile from "./UserProfile";

export default function Homepage () {
    const userIsLoggedIn = false; //remove

    return (
        <div className="bg-var-1 w-full h-full">
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent />}/>
            {userIsLoggedIn && <NavigationBar navPosition=" fixed bottom-0 " navBackgColor=" bg-var-3 " content={<NavBottomContent />}/>}
            <UserProfile />
            <TimeLine />
        </div>
    )
};