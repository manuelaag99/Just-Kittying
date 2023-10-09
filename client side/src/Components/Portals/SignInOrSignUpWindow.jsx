import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import GoogleIcon from '@mui/icons-material/Google';

import InputForForm from "../InputForForm";
import { useForm } from "../custom-hooks";
import { supabase } from "../../supabase/client";
import MessageWindow from "./MessageWindow";
import { AuthContext } from "../../context/AuthContext";

export default function SignInOrSignUpWindow({ open, onClose, switchToSignIn, switchToSignUp, textForSignInOrSignUpButton }) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    
    const initialFormState = {
        inputs: {
            email: { value: "", isValid: false },
            password: { value: "", isValid: false }
        },
        isFormValid: false
    }
    const [stateOfForm, formHandler] = useForm(initialFormState);
    
    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
    const [isMessageWindowForAnError, setIsMessageWindowForAnError] = useState();
    const [doPasswordsMatch, setDoPasswordsMatch] = useState();

    useEffect(() => {
        if (textForSignInOrSignUpButton === "Sign up") {
            if (stateOfForm) {
                if (stateOfForm.inputs.confirmPassword) {
                    if (stateOfForm.inputs.password.value !== stateOfForm.inputs.confirmPassword.value) {
                        setDoPasswordsMatch(false);
                    } else {
                        setDoPasswordsMatch(true);
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
                    const { userdata, error } = await supabase.from("jk-users").insert({ user_id: data.user.id, username: stateOfForm.inputs.username.value, email: stateOfForm.inputs.email.value, feed_preference: "public", account_privacy: "all", password: stateOfForm.inputs.password.value, creation_date: new Date().toISOString(), display_name: "" })
                    if (error) {
                        setIsMessageWindowForAnError(true);
                        setTextForMessageWindow(error);
                        setIsMessageWindowOpen(true);
                        console.log(error);
                    } else if (!error) {
                        setSignInOrSignUpWindowShouldCloseAfterMessageWindowCloses(true);
                        setTextForMessageWindow("Successfully created your account! Check your e-mail and confirm your signup, then come back and sign in!");
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

    let user_id;
    async function signInUser () {
        try {                     
            const { data, error } = await supabase.auth.signInWithPassword(
                {
                    email: stateOfForm.inputs.email.value,
                    password: stateOfForm.inputs.password.value
                }
            )
            console.log(data)
            console.log(data.user.id)
            user_id = data.user.id;
            if (error) {
                setIsMessageWindowForAnError(true);
                setTextForMessageWindow(error);
                setIsMessageWindowOpen(true);
                console.log(error);
            } else if (!error) {
                auth.login(data.user.id, data.session.access_token);
                try {
                    const { data, error } = await supabase.from("jk-users").select("display_name").eq("email", stateOfForm.inputs.email.value);
                    if (error) console.log(error);
                    console.log(data)
                    if (!error) {
                        if (!data || data === "") {
                            console.log("no display name");
                            console.log(user_id);
                            navigate("/settings");
                        } else {
                            console.log(user_id);
                            navigate("/");
                        }
                    }
                } catch (err) {
                    console.log(err)
                }
            }
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

            navigate("/");
        }
    }

    const [signInOrSignUpWindowShouldCloseAfterMessageWindowCloses, setSignInOrSignUpWindowShouldCloseAfterMessageWindowCloses] = useState(false);
    function closeMessageWindow () {
        if (signInOrSignUpWindowShouldCloseAfterMessageWindowCloses) {
            setIsMessageWindowOpen(false);
            onClose();
        } else {
            setIsMessageWindowOpen(false);
        }
    }

    const [allUserNames, setAllUserNames] = useState();
    const [allEmails, setAllEmails] = useState();
    async function retrieveAllUserNamesAndEmails () {
        try {
            const { data, error } = await supabase.from("jk-users").select("username");
            if (error) console.log(error);
            setAllUserNames(data);
        } catch (err) {
            console.log(err);
        }
        try {
            const { data, error } = await supabase.from("jk-users").select("email");
            if (error) console.log(error);
            setAllEmails(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        retrieveAllUserNamesAndEmails();
    }, [])

    const [doesTheUsernameExist, setDoesTheUsernameExist] = useState();
    const [doesTheEmailExist, setDoesTheEmailExist] = useState();
    useEffect(() => {
        if (stateOfForm.inputs.username) {
            if (stateOfForm.inputs.username.value) {
                allUserNames.map((user) => {
                    console.log(user)
                    if (user.username === stateOfForm.inputs.username.value) {
                        setDoesTheUsernameExist(true);
                    }
                })
            }
        }
        if (stateOfForm.inputs.email.value) {
            allEmails.map((user) => {
                console.log(user)
                if (user.email === stateOfForm.inputs.email.value) {
                    setDoesTheEmailExist(true);
                }
            })
        }
    }, [stateOfForm])

    const signInOrSignUpWindow = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <MessageWindow isErrorMessage={isMessageWindowForAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
            <div className={"flex flex-col fixed justify-center items-center z-30 sm:left-[25%] left-[5%] sm:w-5/10 w-9/10 h-fit bg-var-1 rounded-button  text-signInOrsignUpMob sm:text-signInOrsignUpDsk duration-500 " + (textForSignInOrSignUpButton === "Sign up" ? "top-[7%] " : "top-[15%] ")}>
                
                <div className=" flex justify-center items-center w-7/10 h-10 mt-5">
                    <img className="h-full object-cover " src="images/logo.png" alt="just-kittying-logo" />
                </div>

                <div className="w-8/10 h-fit mt-4">
                    
                    {(textForSignInOrSignUpButton === "Sign up") && <InputForForm inputValueAlreadyExists={doesTheUsernameExist} areBothPasswordsTheSame={null} errorMessage="" instructionMessage="Write at least 6 characters" largeDivClassnames="relative" smallDivClassnames="w-full h-full py-3 mb-4 pl-4 pr-1 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-85 sm:w-9/10 outline-none py-0.5 " inputName="username" inputPlaceholder="Create a username..." inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={false} isSelect={false} />}
                    <InputForForm inputValueAlreadyExists={doesTheEmailExist} areBothPasswordsTheSame={null} errorMessage="" instructionMessage={null} largeDivClassnames="relative" smallDivClassnames="w-full h-full py-3 mb-4 pl-4 pr-1 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-9/10 outline-none py-0.5 " inputName="email" inputPlaceholder="Write in your e-mail..." inputType="text" inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={false} isSelect={false} />
                    <InputForForm inputValueAlreadyExists={null} areBothPasswordsTheSame={null} errorMessage="Write a valid password" instructionMessage="Write at least 10 characters, include uppercase and lowercase letters, numbers, and symbols." largeDivClassnames="relative" smallDivClassnames="w-full h-full py-3 mb-4 pl-4 pr-1 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-85 sm:w-9/10 outline-none py-0.5 " inputName="password" inputPlaceholder="Write in your password..." inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={true} isSelect={false} />
                    {(textForSignInOrSignUpButton === "Sign up") && <InputForForm inputValueAlreadyExists={null} areBothPasswordsTheSame={doPasswordsMatch} errorMessage="The passwords do not match." instructionMessage={null} largeDivClassnames="relative" smallDivClassnames="w-full h-full py-3 mb-4 pl-4 pr-1 rounded-input border-var-2 border-2 border-solid" individualInputAction={formHandler} inputClassnames="w-85 sm:w-9/10 outline-none py-0.5 " inputName="confirmPassword" inputPlaceholder="Confirm your password..." inputValidity={false} inputValue={""} isInSettingsPage={false} isPasswordField={true} isSelect={false} />}
                    <button disabled={!stateOfForm.isFormValid} className="flex flex-col justify-center items-center disabled:bg-black-inactive disabled:border-black-inactive disabled:cursor-pointer w-full py-3 px-2 mb-4 rounded-input bg-black text-var-1 border-black border-solid border-2 hover:bg-var-3 hover:border-var-3 duration-500 " onClick={signInOrSignUpHandle}>
                        <p className="my-0.5">{textForSignInOrSignUpButton}</p>
                    </button>
                    <button className="flex flex-row justify-center items-center w-full py-3 px-2 mb-4 rounded-input bg-facebook text-var-1 hover:bg-facebook-hover duration-200 border-facebook border-solid border-2 hover:border-facebook-hover ">
                        <FacebookSharpIcon className="mr-2"/>
                        <p className="">{textForSignInOrSignUpButton} with Facebook</p>
                    </button>
                    <button className="flex flex-row justify-center items-center w-full py-3 px-2 mb-4 rounded-input  bg-white  text-black hover:bg-var-2 duration-200 border-black border-solid border-2">
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