import React, { useState } from "react";
import { createPortal } from "react-dom";

import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function SignIn({ open, onClose, switchToSignUp }) {
    const [passwordVisibility, setPasswordVisibility] = useState(false)

    function changeVisibilityHandle () {
        setPasswordVisibility(prevValue => !prevValue);
    }
    const signIn = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20 duration-500"></div>
            <div className="flex flex-col fixed justify-center items-center z-50 top-[10%] sm:left-[25%] left-[5%] sm:w-5/10 w-9/10 h-7/10 bg-var-1 rounded-button  text-signInOrsignUpMob sm:text-signInOrsignUpDsk duration-500">
                <div className=" flex justify-center items-center w-7/10 h-1/10">
                    <img className="h-full object-cover " src="images/logo.png" alt="" />
                </div>
                <div className="w-8/10 h-fit mt-4">
                    <input className="h-fit w-full py-[9px] sm:py-2 px-2 pl-4 mb-4 rounded-input border-var-2 border-2 border-solid" placeholder="Write in your e-mail..." type="text" />
                    <div className="w-full py-2 mb-4 pr-2 sm:pr-0 rounded-input border-var-2 border-2 border-solid" >
                        <input className="w-85 sm:w-9/10 h-full px-2 pl-4 rounded-input outline-none" placeholder="Write in your password..." type={passwordVisibility ? "text" : "password"} />
                        <button onClick={changeVisibilityHandle} className="w-15 sm:w-1/10 ">
                            {!passwordVisibility && <VisibilityIcon className="hover:bg-var-2 duration-200 rounded-circular" />}
                            {passwordVisibility && <VisibilityOffIcon className="hover:bg-var-2 duration-200 rounded-circular" />}
                        </button>
                    </div>
                    
                    <button className="w-full py-2 px-2 mb-4 rounded-input bg-black text-var-1 hover:bg-var-3 duration-500 border-black border-solid border-2">Sign in</button>
                    <button className="flex flex-row justify-center items-center w-full py-2 px-2 mb-4 rounded-input bg-facebook text-var-1 hover:bg-facebook-hover duration-200 border-facebook border-solid border-2">
                        <FacebookSharpIcon className="mr-2"/>
                        <p className="">Sign in with Facebook</p>
                    </button>
                    <button className="flex flex-row justify-center items-center w-full py-2 px-2 mb-4 rounded-input  bg-white  text-black hover:bg-var-2 duration-200 border-black border-solid border-2">
                        <GoogleIcon className="mr-2"/>
                        <p className="">Sign in with Google</p>
                    </button>

                </div>
                <div className="h-1/10 flex flex-col text-center">
                    <button className="my-1 hover:text-var-3 duration-200" onClick={switchToSignUp}>
                        Don't have an account?
                    </button>
                    <button className="my-1 hover:text-var-3 duration-200">
                        Forgot your password?
                    </button>
                </div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(signIn, document.body)
    } else {
        null
    }
};