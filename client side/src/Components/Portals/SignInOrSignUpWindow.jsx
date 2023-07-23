import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import GoogleIcon from '@mui/icons-material/Google';

import InputForForm from "../InputForForm";
import { useForm } from "../custom-hooks";

export default function SignInOrSignUpWindow({ open, onClose, switchToSignIn, switchToSignUp, textForSignInOrSignUpButton }) {
    const navigate = useNavigate();
    
    const initialFormState = {
        inputs: {
            email: { value: "", isValid: false },
            password: { value: "", isValid: false }
        },
        isFormValid: false
    }
    const [stateOfForm, formHandler] = useForm(initialFormState);
    
    console.log(stateOfForm)
    
    function signInOrSignUpHandle () {
        if (textForSignInOrSignUpButton === "Sign up") {
            console.log(uuidv4())
            navigate("/settings")
        } else if (textForSignInOrSignUpButton === "Sign in") {
            navigate("/")
        }
    }

    const signInOrSignUpWindow = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <div className="flex flex-col fixed justify-center items-center z-50 top-[10%] sm:left-[25%] left-[5%] sm:w-5/10 w-9/10 h-fit bg-var-1 rounded-button  text-signInOrsignUpMob sm:text-signInOrsignUpDsk duration-500">
                <div className=" flex justify-center items-center w-7/10 h-10 mt-5">
                    <img className="h-full object-cover " src="images/logo.png" alt="" />
                </div>
                <div className="w-8/10 h-fit mt-4">
                    
                    <InputForForm smallDivClassnames="w-full h-full py-2 mb-4 px-2.5 sm:pr-0 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-9/10 outline-none " inputName="email" inputPlaceholder="Write in your e-mail..." inputType="text" inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={false} isSelect={false} />
                    <InputForForm smallDivClassnames="w-full h-full py-2 mb-4 px-2.5 sm:pr-0 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-85 sm:w-9/10 outline-none " inputName="password" inputPlaceholder="Write in your password..." inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={true} isSelect={false} />
                    <button disabled={!stateOfForm.isFormValid} className="disabled:bg-black-inactive disabled:cursor-pointer w-full py-2 px-2 mb-4 rounded-input bg-black text-var-1 border-black border-solid border-2 hover:bg-var-3 hover:border-var-3 duration-500 " onClick={signInOrSignUpHandle}>{textForSignInOrSignUpButton}</button>
                    <button className="flex flex-row justify-center items-center w-full py-2 px-2 mb-4 rounded-input bg-facebook text-var-1 hover:bg-facebook-hover duration-200 border-facebook border-solid border-2">
                        <FacebookSharpIcon className="mr-2"/>
                        <p className="">{textForSignInOrSignUpButton} with Facebook</p>
                    </button>
                    <button className="flex flex-row justify-center items-center w-full py-2 px-2 mb-4 rounded-input  bg-white  text-black hover:bg-var-2 duration-200 border-black border-solid border-2">
                        <GoogleIcon className="mr-2"/>
                        <p className="">{textForSignInOrSignUpButton} with Google</p>
                    </button>

                </div>
                <div className="h-1/10 mb-5 flex flex-col text-center">
                    {(textForSignInOrSignUpButton === "Sign up") && <button className="mt-5 hover:text-var-3 duration-200" onClick={switchToSignIn}>
                        Already have an account?
                    </button>}
                    {(textForSignInOrSignUpButton === "Sign in") && <button className="my-1 hover:text-var-3 duration-200" onClick={switchToSignUp}>
                        Don't have an account?
                    </button>}
                    {(textForSignInOrSignUpButton === "Sign in") && <button className="my-1 hover:text-var-3 duration-200">
                        Forgot your password?
                    </button>}
                </div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(signInOrSignUpWindow, document.body)
    } else {
        null
    }
};