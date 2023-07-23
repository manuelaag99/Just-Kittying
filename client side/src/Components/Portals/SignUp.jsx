import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { isTextAPassword, isTextAnEmail } from "../../CheckValidity";
import InputForForm from "../InputForForm";
import { useForm } from "../custom-hooks";

export default function SignUp({ open, onClose, switchToSignIn }) {
    const navigate = useNavigate();
    
    const initialSignInFormState = {
        inputs: {
            email: { value: "", isValid: false },
            password: { value: "", isValid: false }
        },
        isFormValid: false
    }
    const [stateOfForm, formHandler] = useForm(initialSignInFormState);
    
    console.log(stateOfForm)
    
    function signUpHandle () {
        console.log(uuidv4())
        navigate("/settings")
    }

    const signUp = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <div className="flex flex-col fixed justify-center items-center z-50 top-[10%] sm:left-[25%] left-[5%] sm:w-5/10 w-9/10 h-7/10 bg-var-1 rounded-button  text-signInOrsignUpMob sm:text-signInOrsignUpDsk">
                <div className=" flex justify-center items-center w-7/10 h-1/10">
                    <img className="h-full object-cover " src="images/logo.png" alt="" />
                </div>
                <div className="w-8/10 h-fit mt-4">
                    
                    <InputForForm smallDivClassnames="w-full h-full py-2 mb-4 px-2.5 sm:pr-0 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-9/10 outline-none " inputName="email" inputPlaceholder="Write in your e-mail..." inputType="text" inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={false} isSelect={false} />
                    <InputForForm smallDivClassnames="w-full h-full py-2 mb-4 px-2.5 sm:pr-0 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-85 sm:w-9/10 outline-none " inputName="password" inputPlaceholder="Write in your password..." inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={true} isSelect={false} />
                    <button disabled={!stateOfForm.isFormValid} className="disabled:bg-var-2 disabled:cursor-pointer w-full py-2 px-2 mb-4 rounded-input bg-black text-var-1 border-black border-solid border-2 hover:bg-var-3 hover:border-var-3 duration-500 " onClick={signUpHandle}>Sign up</button>
                    <button className="flex flex-row justify-center items-center w-full py-2 px-2 mb-4 rounded-input bg-facebook text-var-1 hover:bg-facebook-hover duration-200 border-facebook border-solid border-2">
                        <FacebookSharpIcon className="mr-2"/>
                        <p className="">Sign up with Facebook</p>
                    </button>
                    <button className="flex flex-row justify-center items-center w-full py-2 px-2 mb-4 rounded-input  bg-white  text-black hover:bg-var-2 duration-200 border-black border-solid border-2">
                        <GoogleIcon className="mr-2"/>
                        <p className="">Sign up with Google</p>
                    </button>

                </div>
                <div className="h-1/10 flex flex-col text-center">
                    <button className="mt-5 hover:text-var-3 duration-200" onClick={switchToSignIn}>
                        Already have an account?
                    </button>
                </div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(signUp, document.body)
    } else {
        null
    }
};