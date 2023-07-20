import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import RoundPhoto from "../Components/RoundPhoto";

export default function ProfileSettingsPage () {
    const navigate = useNavigate();

    const [profileFormData, setProfileFormData] = useState({ displayname: "", username: "", shortbio: "", accountprivacy: "", feedpreference: ""});

    function DoneButtonHandle () {
        navigate("/")
    }

    // function changeHandle (e) {
    //     console.log(e.target.name)
    //     console.log(profileFormData)
    // }

    function changeHandle (e) {
        const { name, value } = e.target;
        setProfileFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    console.log(profileFormData)

    return (
        <div className="flex flex-col justify-center items-center w-full h-fit">
            <div className="flex flex-row justify-between w-full h-fit bg-var-1 drop-shadow-navbar z-10">
                <Link className="flex flex-row items-center w-3/10 sm:w-fit pl-1 pr-3 py-2 bg-var-1 hover:bg-var-2 duration-100" onClick={DoneButtonHandle} to="/">
                    <KeyboardArrowLeftIcon />
                    <p className=" pt-0.5">Cancel</p>
                </Link>
                <div className="flex flex-row items-center justify-center w-2/10 font-bold">
                    Settings
                </div>
                <button className="flex flex-row items-center w-3/10 sm:w-fit pl-3 pr-4 py-2 bg-var-1 hover:bg-var-2 duration-100" onClick={DoneButtonHandle}>
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
                    <div className="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3">
                        <label className="w-3/10 pr-2" htmlFor=""> Display name:  </label>
                        <input name="displayname" className="w-7/10 px-2 py-1 outline-none" onChange={changeHandle} placeholder="Enter your display name..." type="text" />
                    </div>
                    <div className="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3">
                        <label className="w-3/10 pr-2" htmlFor=""> Username:  </label>
                        <input name="username" className="w-7/10 px-2 py-1 outline-none" onChange={changeHandle} placeholder="Enter a user name..." type="text" />
                    </div>
                    <div className="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3">
                        <label className="w-3/10 pr-2" htmlFor=""> Short bio:  </label>
                        <input name="shortbio" className="w-7/10 px-2 py-1 outline-none" onChange={changeHandle} placeholder="Enter a short bio..." type="text" />
                    </div>
                    <div className="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3">
                        <label className="w-3/10 pr-2" htmlFor="accountprivacy"> Account privacy:  </label>
                        <select className="w-7/10 px-2 py-1 outline-none" name="accountprivacy" id="accountprivacy" onChange={changeHandle}  >
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                    <div className="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3">
                    <label className="w-3/10 pr-2" htmlFor="feedpreference"> Feed preference:  </label>
                        <select className="w-7/10 px-2 py-1 outline-none" name="feedpreference" id="feedpreference" onChange={changeHandle}  >
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
};