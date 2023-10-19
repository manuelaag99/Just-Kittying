import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { v4 as uuidv4 } from "uuid";

import InputForForm from "../Components/InputForForm";
import RoundPhoto from "../Components/RoundPhoto";

import ConfirmWindow from "../Components/Portals/ConfirmWindow";
import LoadingSpinner from "../Components/Portals/LoadingSpinner";
import MessageWindow from "../Components/Portals/MessageWindow";

import { AuthContext } from "../context/AuthContext";
import { useForm } from "../Components/custom-hooks";
import { supabase } from "../supabase/client";
import ImageUpload from "../Components/ImageUpload";

export default function ProfileSettingsPage () {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState();
    useEffect(() => {
        async function fetchData () {
          try {
            const { data, error } = await supabase.from("jk-users").select().eq("user_id", auth.userId);
            if (error) console.log(error);
            setUserInfo(data[0])
          } catch (err) {
            console.log(err)
          }
        }
        fetchData();
    }, []);

    const initialFormState = {
        inputs: {
            displayname: { value: "", isValid: false },
            username: { value: "", isValid: false },
            shortbio: { value: "", isValid: true },
            accountprivacy: { value: "", isValid: false },
            feedpreference: { value: "", isValid: false }
        },
        isFormValid: false
    }

    const [stateOfForm, formHandler] = useForm(initialFormState);
    const [profilePicture, setProfilePicture] = useState();

    let profilePicPath;
    async function updateUserInfo () {
        profilePicPath = uuidv4();
        try {
            const { error } = await supabase.from("jk-users").update({ display_name: stateOfForm.inputs.displayname.value, username: stateOfForm.inputs.username.value, short_bio: stateOfForm.inputs.shortbio.value, account_privacy: stateOfForm.inputs.accountprivacy.value, feed_preference: stateOfForm.inputs.feedpreference.value, profile_pic_path: profilePicPath }).eq("user_id", auth.userId);
            if (error) console.log(error);
        } catch (err) {
            console.log(err)
        }
        try {
            const { error } = await supabase.storage.from("jk-images").upload("userProfilePics/" + profilePicPath, profilePicture);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
    }

    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isTextMessageAnError, setIsTextMessageAnError] = useState();
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);

    function doneButtonHandle () {
        if (stateOfForm.isFormValid) {
            updateUserInfo();
            navigate("/")
        } else {
            setTextForMessageWindow("Check the inputs.");
            setIsTextMessageAnError(true);
            setIsMessageWindowOpen(true);
        }
    }

    function logOutHandle () {
        auth.logout();
        navigate("/")    
    }

    const [textForConfirmWindow, setTextForConfirmWindow] = useState();
    const [confirmWindowVisibility, setConfirmWindowVisibility] = useState();
    function deleteAccountHandle () {
        setTextForConfirmWindow("Are you sure you want to delete your account? This is permanent.");
        setConfirmWindowVisibility(true);
    }
    function changePasswordHandle () {
        setTextForConfirmWindow("Are you sure you want to change your password? If you confirm, you will get an email with a link to change it.");
        setConfirmWindowVisibility(true);
    }
    function closeConfirmWindowAndThenOpenMessageWindow () {
        if (textForConfirmWindow === "Are you sure you want to change your password? If you confirm, you will get an email with a link to change it.") {
            setTextForMessageWindow("Check your email to change your password.")
            setIsMessageWindowOpen(true);
        }
        setConfirmWindowVisibility(false);
    }

    if (!userInfo) {
        return (<LoadingSpinner open={true} />)
    } else {
        return (
            <div className="flex flex-col justify-center items-center w-full h-fit">
                <MessageWindow isErrorMessage={isTextMessageAnError} onClose={() => setIsMessageWindowOpen(false)} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
                <ConfirmWindow onCloseConfirmWindowAndThenOpenMessageWindow={closeConfirmWindowAndThenOpenMessageWindow} onClose={() => setConfirmWindowVisibility(false)} open={confirmWindowVisibility} textForMessage={textForConfirmWindow} user={userInfo} />
                <div className="flex flex-row justify-between w-full h-fit bg-var-1 drop-shadow-navbar z-10">
                    <Link className="flex flex-row items-center w-fit pl-1 pr-4 py-2 bg-var-1 hover:bg-var-2 duration-100" to="/">
                        <KeyboardArrowLeftIcon />
                        <p className=" pt-0.5">Back</p>
                    </Link>
                    <div className="flex flex-row items-center justify-center w-2/10 pt-0.5">
                        Settings
                    </div>
                    <button disabled={!stateOfForm.isFormValid} className="flex flex-row items-centerw-fit pl-3 pr-4 py-2 bg-var-1 hover:bg-var-2 duration-100 active:text-black disabled:text-var-2 " onClick={doneButtonHandle}>
                        <CheckIcon />
                        <p className="pl-1 pt-0.5">Done</p>
                    </button>
                </div>
                <div className="w-full sm:w-2/3 flex flex-col justify-center items-center bg-var-1 drop-shadow-navbar z-5">
                    <div className="flex flex-col justify-center w-full h-fit py-2 bg-var-4 bg-opacity-50">
                        <div className="w-4/10 mx-auto">
                            <ImageUpload imageClassnames="rounded-circular border-black border-solid border" isPostPhoto={false} sendFile={(file) => setProfilePicture(file)} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-fit border-var-2 border-solid border-2 mt-0 pt-3">
                        
                        <InputForForm individualInputAction={formHandler} inputClassnames="w-full pt-1 outline-none " inputName="displayname" inputPlaceholder="Enter your display name..." inputType="text" inputValidity={(userInfo.display_name && true) || false} inputValue={userInfo.display_name || ""} isInSettingsPage={true} isSelect={false} labelClassnames="w-4/10 pr-2" labelText="Display name: " largeDivClassnames="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3 " smallDivClassnames="flex flex-col w-6/10 px-2 "  />

                        <InputForForm individualInputAction={formHandler} inputClassnames="w-full pt-1 outline-none " inputName="username" inputPlaceholder="Enter a user name..." inputType="text" inputValidity={(userInfo.username && true) || false} inputValue={userInfo.username || ""} isInSettingsPage={true} isSelect={false} labelClassnames="w-4/10 pr-2" labelText="Username: " largeDivClassnames="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3 " smallDivClassnames="flex flex-col w-6/10 px-2 "  />
                        
                        <InputForForm individualInputAction={formHandler} inputClassnames="w-full pt-1 outline-none" inputName="shortbio" inputPlaceholder="Enter a short bio..." inputType="text" inputValidity={(userInfo.short_bio && true) || false} inputValue={userInfo.short_bio || ""} isInSettingsPage={true} isSelect={false} labelClassnames="w-4/10 pr-2" labelText="Short bio: " largeDivClassnames="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3 " smallDivClassnames="flex flex-col w-6/10 px-2 "  />

                        <InputForForm optionsForSelect={[{ value: "private", text: "Private"}, { value: "public", text: "Public"}]} individualInputAction={formHandler} inputClassnames="w-full pt-1 outline-none" inputName="accountprivacy" inputValidity={(userInfo.account_privacy && true) || false} inputValue={userInfo.account_privacy} isInSettingsPage={true} isSelect={true} labelClassnames="w-4/10 pr-2" labelText="Account privacy: " largeDivClassnames="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3 " smallDivClassnames="flex flex-col w-6/10 px-2 "  />
                        
                        <InputForForm optionsForSelect={[{ value: "friends", text: "Friends only"}, { value: "all", text: "All"}]} individualInputAction={formHandler} inputClassnames="w-full pt-1 outline-none" inputName="feedpreference" inputValidity={(userInfo.feed_preference && true) || false} inputValue={userInfo.feed_preference} isInSettingsPage={true} isSelect={true} labelClassnames="w-4/10 pr-2" labelText="Feed preference: " largeDivClassnames="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3 " smallDivClassnames="flex flex-col w-6/10 px-2 "  />

                        <button className="flex flex-row justify-between w-full h-fit py-3 px-3 bg-var-1 hover:bg-var-2 duration-200 cursor-pointer" onClick={changePasswordHandle}>
                            <p>Change password</p>
                        </button>
                        <button className="flex flex-row justify-between w-full h-fit py-3 px-3 bg-var-1 hover:bg-var-2 duration-200 cursor-pointer" onClick={logOutHandle}>
                            <p>Log Out</p>
                        </button>
                        <button className="flex flex-row justify-between w-full h-fit py-3 px-3 bg-var-1 hover:bg-red-300 duration-200 cursor-pointer" onClick={deleteAccountHandle}>
                            <p className="text-red-700">Delete my account</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
};