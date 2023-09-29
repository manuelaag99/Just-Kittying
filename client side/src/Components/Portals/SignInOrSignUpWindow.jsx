import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import GoogleIcon from '@mui/icons-material/Google';

import InputForForm from "../InputForForm";
import { useForm } from "../custom-hooks";
import { supabase } from "../../supabase/client";
import MessageWindow from "./MessageWindow";

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

    useEffect(() => {
        if (textForSignInOrSignUpButton === "Sign up") {
            if (stateOfForm) {
                if (stateOfForm.inputs.confirmPassword) {
                    if (stateOfForm.inputs.password.value !== stateOfForm.inputs.confirmPassword.value) {
                        console.log("different")
                    } else {
                        console.log("same")
                    }
                }
            }
        }
    }, [stateOfForm])

    async function signUpUser () {
        try {                     
            const { data, error } = await supabase.auth.signUp(
                {
                    email: stateOfForm.inputs.email.value,
                    password: stateOfForm.inputs.password.value,
                    options: {
                        emailRedirectTo: 'https://localhost:5173/'
                    }
                }
            )
            if (error) {
                console.log(error)
            } else {
                try {
                    const { userdata, error } = await supabase.from("jk-users").insert({ user_id: data.user.id, username: stateOfForm.inputs.username.value, email: stateOfForm.inputs.username.value, feed_preference: "public", account_privacy: "all", password: stateOfForm.inputs.password.value, creation_date: new Date().toISOString(), display_name: "" })
                    if (error) console.log(error);
                    // navigate("/settings");
                    if (!error) {
                        setTextForMessageWindow("Successfully created your account! Checked your e-mail and confirm your signup, then come back and sign in!");
                        setIsMessageWindowOpen(true);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            console.log(data)
        } catch (err) {
            console.log(err);
        }
    }

    async function signInUser () {
        try {                     
            const { data, error } = await supabase.auth.signInWithPassword(
                {
                    email: stateOfForm.inputs.email.value,
                    password: stateOfForm.inputs.password.value
                }
            )
            if (error) console.log(error);
            console.log(data)
            navigate("/settings")
        } catch (err) {
            console.log(err);
        }
    }
    
    function signInOrSignUpHandle () {
        if (textForSignInOrSignUpButton === "Sign up") {
            if (stateOfForm.inputs.password.value === stateOfForm.inputs.confirmPassword.value) {
                console.log(uuidv4())
                signUpUser();
                // navigate("/settings")
            }
        } else if (textForSignInOrSignUpButton === "Sign in") {
            signInUser();
            navigate("/")
        }
    }

    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);

    const signInOrSignUpWindow = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <MessageWindow onClose={() => setIsMessageWindowOpen(false)} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
            <div className={"flex flex-col fixed justify-center items-center z-30 sm:left-[25%] left-[5%] sm:w-5/10 w-9/10 h-fit bg-var-1 rounded-button  text-signInOrsignUpMob sm:text-signInOrsignUpDsk duration-500 " + (textForSignInOrSignUpButton === "Sign up" ? "top-[10%] " : "top-[15%] ")}>
                
                <div className=" flex justify-center items-center w-7/10 h-10 mt-5">
                    <img className="h-full object-cover " src="images/logo.png" alt="just-kittying-logo" />
                </div>
                <div className="w-8/10 h-fit mt-4">
                    
                    {(textForSignInOrSignUpButton === "Sign up") && <InputForForm smallDivClassnames="w-full h-full py-2 mb-4 px-4 sm:pr-0 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-85 sm:w-9/10 outline-none " inputName="username" inputPlaceholder="Create a username..." inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={false} isSelect={false} />}
                    <InputForForm smallDivClassnames="w-full h-full py-2 mb-4 px-4 sm:pr-0 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-9/10 outline-none " inputName="email" inputPlaceholder="Write in your e-mail..." inputType="text" inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={false} isSelect={false} />
                    <InputForForm smallDivClassnames="w-full h-full py-2 mb-4 px-4 sm:pr-0 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-85 sm:w-9/10 outline-none " inputName="password" inputPlaceholder="Write in your password..." inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={true} isSelect={false} />
                    {(textForSignInOrSignUpButton === "Sign up") && <InputForForm smallDivClassnames="w-full h-full py-2 mb-4 px-4 sm:pr-0 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-85 sm:w-9/10 outline-none " inputName="confirmPassword" inputPlaceholder="Confirm your password..." inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={true} isSelect={false} />}
                    <button disabled={!stateOfForm.isFormValid} className="disabled:bg-black-inactive disabled:border-black-inactive disabled:cursor-pointer w-full py-2 px-2 mb-4 rounded-input bg-black text-var-1 border-black border-solid border-2 hover:bg-var-3 hover:border-var-3 duration-500 " onClick={signInOrSignUpHandle}>{textForSignInOrSignUpButton}</button>
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
                    {(textForSignInOrSignUpButton === "Sign up") && <button className="my-1 hover:text-var-3 duration-200" onClick={switchToSignIn}>
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