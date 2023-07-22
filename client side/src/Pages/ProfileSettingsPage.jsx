import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { supabase } from "../supabase/client";
import RoundPhoto from "../Components/RoundPhoto";
import LoadingSpinner from "../Components/Portals/LoadingSpinner";
import InputForForm from "../Components/InputForForm";

function formReducer (state, action) {
    switch (action.type) {
        case "formChange":
            let formIsValid = true
            for (const specificInput in state.inputs) {
                if (specificInput === action.inputName) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[specificInput].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputName]: { value: action.value, isValid: action.isValid }
                },
                isFormValid: formIsValid
            }
        default:
            return state
    }
}

export default function ProfileSettingsPage () {
    const navigate = useNavigate();

    let user_id = "74rh4889wh36d7g389shd"
    const [userInfo, setUserInfo] = useState()
    useEffect(() => {
        async function fetchData () {
          try {
            const { data, error } = await supabase.from('jk-users').select().eq('user_id', user_id)
            setUserInfo(data[0])
          } catch (err) {
            console.log(err)
          }
        }
        fetchData();
    }, []);


    const [loading, setLoading] = useState(true)
    const [profileFormData, setProfileFormData] = useState({
        inputs: {
            displayname: { value: "", isValid: false },
            username: { value: "", isValid: false },
            shortbio: { value: "", isValid: false },
            accountprivacy: { value: "", isValid: false },
            feedpreference: { value: "", isValid: false }
        },
        isFormValid: false
    });


    const [formState, setFormState] = useState({
        inputs: {
            displayname: { value: "", isValid: false },
            username: { value: "", isValid: false },
            shortbio: { value: "", isValid: false },
            accountprivacy: { value: "", isValid: false },
            feedpreference: { value: "", isValid: false }
        },
        isFormValid: false
    });

    const [stateOfForm, dispatch] = useReducer(formReducer, formState);

    const formHandler = useCallback((value, isValid, inputName) => {
        console.log(value, isValid, inputName)
        dispatch({ type: "formChange", inputName: inputName, value: value, isValid: isValid })
    }, [dispatch])


    useEffect(() => {
        if (userInfo) {
            setFormState({
                inputs: {
                    displayname: { value: userInfo.display_name, isValid: true },
                    username: { value: userInfo.username, isValid: true },
                    shortbio: { value: userInfo.short_bio, isValid: true },
                    accountprivacy: { value: userInfo.account_privacy, isValid: true },
                    feedpreference: { value: userInfo.feed_preference, isValid: true }
                }, isFormValid: true
            })
        }
    }, [userInfo]);

    const [formErrors, setFormError] = useState(false);
    useEffect(() => {
        if ((profileFormData.displayname === "") || (profileFormData.username === "")) {
            console.log("error")
            setFormError(true)
        } else {
            setFormError(false)
        }
    }, [profileFormData])


    function changeHandle (e) {
        const { name, value } = e.target;
        setProfileFormData((prevState) => ({
          ...prevState, [name]: value,
        }));
        if (value === "") {
            setFormError(true)
        } else {
            setFormError(false)
        }
    };

    function DoneButtonHandle () {
        if (!formErrors) {
            navigate("/")
        }
    }

    console.log(formState)
    console.log(stateOfForm)

    if (!userInfo) {
        return (<LoadingSpinner open={loading} />)
    } else {
        return (
            <div className="flex flex-col justify-center items-center w-full h-fit">
                <div className="flex flex-row justify-between w-full h-fit bg-var-1 drop-shadow-navbar z-10">
                    <Link className="flex flex-row items-center w-fit pl-1 pr-4 py-2 bg-var-1 hover:bg-var-2 duration-100" onClick={DoneButtonHandle} to="/">
                        <KeyboardArrowLeftIcon />
                        <p className=" pt-0.5">Cancel</p>
                    </Link>
                    <div className="flex flex-row items-center justify-center w-2/10 pt-0.5">
                        Settings
                    </div>
                    <button disabled={formErrors} className="flex flex-row items-centerw-fit pl-3 pr-4 py-2 bg-var-1 hover:bg-var-2 duration-100 active:text-black disabled:text-var-2 " onClick={DoneButtonHandle}>
                        <CheckIcon />
                        <p className="pl-1 pt-0.5">Done</p>
                    </button>
                </div>
                <form action="" className="w-full sm:w-2/3 flex flex-col justify-center items-center bg-var-1 drop-shadow-navbar z-5">
                    <div className="flex flex-col justify-center w-full h-fit py-2 bg-var-4 bg-opacity-50">
                        <RoundPhoto classesForRoundPhoto="flex justify-center items-center mx-auto my-3 sm:w-2/10 w-4/10 aspect-square drop-shadow-button" imageAlt={null} imageSource="https://img.freepik.com/free-photo/portrait-handsome-young-man-with-crossed-arms_176420-15569.jpg?w=2000" />
                        <button className="text-black hover:text-var-3 duration-200">Change my profile picture</button>
                    </div>
                    <div className="flex flex-col w-full h-fit border-var-2 border-solid border-2 mt-0 pt-3">
                        
                        <InputForForm individualInputAction={formHandler} inputClassnames="w-full pt-1 outline-none " inputName="displayname" inputPlaceholder="Enter your display name..." inputType="text" inputValue={formState.inputs.displayname.value} isInSettingsPage={true} isSelect={false} labelClassnames="w-4/10 pr-2" labelText="Display name: " />

                        <InputForForm individualInputAction={formHandler} inputClassnames="w-full pt-1 outline-none " inputName="username" inputPlaceholder="Enter a user name..." inputType="text" inputValue={formState.inputs.username.value} isInSettingsPage={true} isSelect={false} labelClassnames="w-4/10 pr-2" labelText="Username: " />
                        
                        <InputForForm individualInputAction={formHandler} inputClassnames="w-full pt-1 outline-none" inputName="shortbio" inputPlaceholder="Enter a short bio..." inputType="text" inputValue={formState.inputs.shortbio.value} isInSettingsPage={true} isSelect={false} labelClassnames="w-4/10 pr-2" labelText="Short bio: " />

                        {/* <InputForForm individualInputAction={formHandler} inputClassnames="w-6/10 px-2 pt-1 outline-none" inputName="accountprivacy" inputValue={formState.inputs.accountprivacy.value} isInSettingsPage={true} isSelect={true} labelClassnames="w-4/10 pr-2" labelText="Account privacy: " /> */}
                        
                        <div className="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3">
                            <label className="w-4/10 pr-2" htmlFor="accountprivacy"> Account privacy:  </label>
                            <select className="w-6/10 px-2 pt-1 outline-none" name="accountprivacy" id="accountprivacy" onChange={changeHandle} value={profileFormData.accountprivacy} >
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3">
                        <label className="w-4/10 pr-2" htmlFor="feedpreference"> Feed preference:  </label>
                            <select className="w-6/10 px-2 pt-1 outline-none" name="feedpreference" id="feedpreference" onChange={changeHandle} value={profileFormData.feedpreference} >
                                <option value="friends">Friends only</option>
                                <option value="all">All</option>
                            </select>
                        </div>


                        <div className="flex flex-row justify-between w-full h-fit pt-3 pb-2 px-3 bg-var-1 hover:bg-var-2 duration-200 cursor-pointer">
                            <p>Change password</p>
                            <KeyboardArrowRightIcon />
                        </div>
                        <div className="flex flex-row justify-between w-full h-fit pt-3 pb-2 px-3 bg-var-1 hover:bg-var-2 duration-200 cursor-pointer">
                            <p>Log Out</p>
                            <KeyboardArrowRightIcon />
                        </div>
                        <div className="flex flex-row justify-between w-full h-fit pt-3 pb-2 px-3 bg-var-1 hover:bg-var-2 duration-200 cursor-pointer">
                            <p className="text-red-700">Delete my account</p>
                            <KeyboardArrowRightIcon />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
};