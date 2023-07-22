import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { isTextAPassword, isTextAnEmail } from "../../CheckValidity";


export default function SignUp({ open, onClose, switchToSignIn }) {
    const navigate = useNavigate()
    const [signUpFormState, setSignUpFormState] = useState({ email: "", password: "" });
    
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    function changeVisibilityHandle () {
        setPasswordVisibility(prevValue => !prevValue);
    }

    const [formErrors, setFormErrors] = useState({ email: "", password: "" });

    function changeHandle (e) {
        const { name, value } = e.target;
        setSignUpFormState((prevState) => ({
          ...prevState, [name]: value,
        }));
        if (name === "email") {
            if ((isTextAnEmail(value)) !== true) {
                setFormErrors((prevState) => ({
                    ...prevState, [name]: "This is not a valid e-mail."
                }))
            } else {
                setFormErrors((prevState) => ({
                    ...prevState, [name]: null
                }))
            }
        } else {
            if ((isTextAPassword(value)) !== true) {
                setFormErrors((prevState) => ({
                    ...prevState, [name]: "This is not a valid password."
                }))
            } else {
                setFormErrors((prevState) => ({
                    ...prevState, [name]: null
                }))
            }
        }
    }

    console.log(formErrors)
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
                    
                    <div className="h-fit w-full mb-4 py-[9px] sm:py-2 rounded-input border-var-2 border-2 border-solid" >
                        <input className="h-full w-full px-2 pl-4 rounded-input outline-none " name="email" onChange={changeHandle} placeholder="Write your e-mail..." type="text" value={signUpFormState.email} />
                        {formErrors.email && <div className="absolute bg-var-1 p-2 border-black border-2 border-solid top-0">{formErrors.email}</div>}
                    </div>

                    
                    <div className="h-fit w-full py-2 mb-4 rounded-input border-var-2 border-2 border-solid" >
                        <input className="w-85 sm:w-9/10 h-full px-2 pl-4 rounded-input outline-none" name="password" onChange={changeHandle} placeholder="Create a password..." type={passwordVisibility ? "text" : "password"} value={signUpFormState.password} />
                        <button className="w-15 sm:w-1/10 " onClick={changeVisibilityHandle} >
                            {!passwordVisibility && <VisibilityIcon className="hover:bg-var-2 duration-200 rounded-circular" />}
                            {passwordVisibility && <VisibilityOffIcon className="hover:bg-var-2 duration-200 rounded-circular" />}
                        </button>
                        {formErrors.email && <div className="absolute bg-var-1 p-2 border-black border-2 border-solid mt-2">{formErrors.password}</div>}
                    </div>
                    
                    <button className="w-full py-2 px-2 mb-4 rounded-input bg-black text-var-1 hover:bg-var-3 duration-500 border-black border-solid border-2" onClick={signUpHandle}>Sign up</button>
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