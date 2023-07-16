import React from "react";
import Button from "./Button";

export default function NavBottomContent () {
    return (
        <div className="flex flex-row h-full w-full justify-center items-center">
            <div className="flex flex-row w-8/10 h-fit sm:justify-center justify-between items-center sm:text-navBottomDsk text-navBottomMob">
                <div className="text-var-1 sm:block hidden w-fit">Try out this wonderful social network to share photos of kittens!</div>
                <Button classnames="mx-2 bg-var-1 whitespace-no-wrap hover:bg-var-2 text-black hover:text-var-1 duration-200 drop-shadow-button" textForButton="Sign In" />
                <div className="text-var-1 w-fit">or</div>
                <Button classnames="mx-2 bg-var-1 whitespace-no-wrap hover:bg-var-2 text-black hover:text-var-1 duration-200 drop-shadow-button" textForButton="Register" />
            </div>
        </div>
    )
};