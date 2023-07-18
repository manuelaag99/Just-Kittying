import React, { useState } from "react";
import Button from "./Button";
import SignIn from "./Portals/SignIn";
import SignUp from "./Portals/signUp";

export default function NavBottomContent () {
    const [ signInWindow, setsignInWindow ] = useState(false);
    function closeSignInHandle () {
        setsignInWindow(false)
    }

    function openSignInHandle () {
        setsignInWindow(true)
    }

    const [ signUpWindow, setsignUpWindow ] = useState(false);
    function closesignUpHandle () {
        setsignUpWindow(false)
    }

    function opensignUpHandle () {
        setsignUpWindow(true)
    }

    return (
        <div className="flex flex-row h-full w-full justify-center items-center">
            <SignIn onClose={closeSignInHandle} open={signInWindow} />
            <SignUp onClose={closesignUpHandle} open={signUpWindow}  />
            <div className="flex flex-row sm:w-8/10 w-fit h-fit sm:justify-center justify-between items-center sm:text-navBottomDsk text-navBottomMob">
                <div className="text-var-1 sm:block hidden w-fit">Try out this wonderful social network to share photos of kittens!</div>
                <Button classnames="mx-2 py-2 sm:px-4 px-7 bg-var-1 whitespace-no-wrap hover:bg-var-2 text-black hover:text-var-1 duration-200 drop-shadow-button" clickButtonFunction={openSignInHandle} textForButton="Sign In" />
                <div className="text-var-1 w-fit">or</div>
                <Button classnames="mx-2 py-2 sm:px-4 px-7 bg-var-1 whitespace-no-wrap hover:bg-var-2 text-black hover:text-var-1 duration-200 drop-shadow-button" clickButtonFunction={opensignUpHandle} textForButton="Sign Up" />
            </div>
        </div>
    )
};