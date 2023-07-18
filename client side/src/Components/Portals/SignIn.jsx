import React, { useState } from "react";
import { createPortal } from "react-dom";

import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function SignIn({ open, onClose }) {
    const [passwordVisibility, setPasswordVisibility] = useState(false)

    function changeVisibilityHandle () {
        setPasswordVisibility(prevValue => !prevValue);
    }
    const signIn = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <div className="flex flex-col fixed justify-center items-center z-50 top-[10%] sm:left-[25%] left-[10%] sm:w-5/10 w-8/10 h-7/10 bg-var-1 rounded-button">
                <div className="w-7/10 h-1/10">
                    <img src="../../../" alt="" />
                </div>
                <div className="w-8/10 h-fit text-signInOrRegisterDsk">
                    <input className="w-full py-2 px-2 pl-4 mb-4 rounded-input border-var-2 border-2 border-solid" type="text" />
                    <div className="w-full py-2 mb-4 rounded-input border-var-2 border-2 border-solid" >
                        <input className="w-8/10 sm:w-9/10 h-full px-2 pl-4 rounded-input outline-none" type={passwordVisibility ? "text" : "password"} />
                        <button onClick={changeVisibilityHandle} className="w-2/10 sm:w-1/10 ">
                            {!passwordVisibility && <VisibilityIcon className="hover:bg-var-2 duration-200 rounded-circular" />}
                            {passwordVisibility && <VisibilityOffIcon className="hover:bg-var-2 duration-200 rounded-circular" />}
                        </button>
                    </div>
                    
                    <button className="w-full py-2 px-2 mb-4 rounded-input bg-black text-var-1 hover:bg-var-3 duration-500">Sign in</button>
                    <button className="flex flex-row justify-center items-center w-full py-2 px-2 mb-4 rounded-input bg-facebook text-var-1 hover:bg-facebook-hover duration-200">
                        <FacebookSharpIcon className="mr-2"/>
                        <p className="">Sign in with Facebook</p>
                    </button>
                    <button className="flex flex-row justify-center items-center w-full py-2 px-2 mb-4 rounded-input  bg-white  text-black hover:bg-var-2 duration-200 border-black border-solid border-2">
                        <GoogleIcon className="mr-2"/>
                        <p className="">Sign in with Google</p>
                    </button>

                </div>
                <div className="h-1/10 flex flex-col text-center">
                    <button className="my-1 hover:text-var-3 duration-200">
                        Forgot your password?
                    </button>
                    <button className="my-1 hover:text-var-3 duration-200">
                        Don't have an account?
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