import React, { useState } from "react";
import Button from "./Button";
import SignInOrSignUpWindow from "./Portals/SignInOrSignUpWindow";

export default function NavBottomContent () {
    const [signInWindow, setSignInWindow] = useState(false);
    function closeSignInHandle () {
        setSignInWindow(false);
    }
    function openSignInHandle () {
        setSignInWindow(true);
    }

    const [signUpWindow, setSignUpWindow] = useState(false);
    function closeSignUpHandle () {
        setSignUpWindow(false);
    }
    function openSignUpHandle () {
        setSignUpWindow(true);
    }

    function switchHandle () {
        setSignUpWindow(prevValue => !prevValue);
        setSignInWindow(prevValue => !prevValue);
    }

    return (
        <div className="flex flex-row h-full w-full justify-center items-center">
            <SignInOrSignUpWindow textForSignInOrSignUpButton={"Sign in"} onClose={closeSignInHandle} open={signInWindow} switchToSignUp={switchHandle} />
            <SignInOrSignUpWindow textForSignInOrSignUpButton={"Sign up"} onClose={closeSignUpHandle} open={signUpWindow} switchToSignIn={switchHandle} />
            <div className="flex flex-row sm:w-8/10 w-fit h-fit sm:justify-center justify-between items-center sm:text-navBottomDsk text-navBottomMob">
                <div className="text-var-1 sm:block hidden w-fit">Try out this wonderful social network to share photos of kittens!</div>
                <Button classnames="mx-2 py-2 sm:px-4 px-7 bg-var-1 whitespace-no-wrap hover:bg-var-2 text-black hover:text-var-1 duration-200 drop-shadow-button" clickButtonFunction={openSignInHandle} textForButton="Sign In" />
                <div className="text-var-1 w-fit">or</div>
                <Button classnames="mx-2 py-2 sm:px-4 px-7 bg-var-1 whitespace-no-wrap hover:bg-var-2 text-black hover:text-var-1 duration-200 drop-shadow-button" clickButtonFunction={openSignUpHandle} textForButton="Sign Up" />
            </div>
        </div>
    )
};