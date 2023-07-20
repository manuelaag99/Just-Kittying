import React from "react";
import RoundPhoto from "../Components/RoundPhoto";
import Button from "../Components/Button";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ProfileSettingsPage () {

    function DoneButtonHandle () {
        console.log("done")
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-fit">
            <div className="flex flex-row justify-between w-full h-fit bg-var-1 drop-shadow-navbar z-10">
                <div className="w-3/10 mx-2 my-2">
                    <Button classnames="w-full bg-var-3 hover:bg-var-3-hovered duration-100 text-var-1 drop-shadow-button py-1" clickButtonFunction={DoneButtonHandle} textForButton="Cancel" />
                </div>
                <div className="w-3/10 mx-2 my-2">
                    <Button classnames="w-full bg-var-3 hover:bg-var-3-hovered duration-100 text-var-1 drop-shadow-button py-1" clickButtonFunction={DoneButtonHandle} textForButton="Done" />
                </div>
            </div>
            <form action="" className="w-full sm:w-2/3 flex flex-col justify-center items-center bg-var-1 drop-shadow-navbar z-5">
                <div className="flex flex-col justify-center w-full h-fit py-2 bg-var-4 bg-opacity-50">
                    <RoundPhoto classesForRoundPhoto="flex justify-center items-center mx-auto my-3 w-4/10 aspect-square" imageAlt={null} imageSource="https://img.freepik.com/free-photo/portrait-handsome-young-man-with-crossed-arms_176420-15569.jpg?w=2000" />
                    <button className="font-bold text-black hover:text-var-3 duration-200">Change my profile picture</button>
                </div>
                <div className="flex flex-col w-full h-fit my-1 border-var-2 border-solid border-2 mt-0 pt-3">
                    <div className="flex flex-row w-full h-fit items-center mb-3 px-2">
                        <label className="w-3/10 pr-2" htmlFor=""> Display name:  </label>
                        <input className="w-7/10 px-2 py-1 " placeholder="Enter your display name..." type="text" />
                    </div>
                    <div className="flex flex-row w-full h-fit items-center mb-3 px-2">
                        <label className="w-3/10 pr-2" htmlFor=""> Username:  </label>
                        <input className="w-7/10 px-2 py-1 " placeholder="Enter a user name..." type="text" />
                    </div>
                    <div className="flex flex-row w-full h-fit items-center mb-3 px-2">
                        <label className="w-3/10 pr-2" htmlFor=""> Short bio:  </label>
                        <input className="w-7/10 px-2 py-1 " placeholder="Enter a short bio..." type="text" />
                    </div>
                    <div className="flex flex-row w-full h-fit items-center mb-3 px-2">
                        <label className="w-3/10 pr-2" htmlFor=""> Account privacy:  </label>
                        <input className="w-7/10 px-2 py-1 " placeholder="Enter a short bio..." type="" />
                    </div>
                    <div className="flex flex-row w-full h-fit items-center mb-3 px-2">
                        <label className="w-3/10 pr-2" htmlFor=""> Feed preference:  </label>
                        <input className="w-7/10 px-2 py-1 " placeholder="Enter a short bio..." type="" />
                    </div>

                    <div className="flex flex-row justify-between w-full h-fit py-2 px-2 bg-var-1 hover:bg-var-2 duration-200 cursor-pointer">
                        <p>Change password</p>
                        <KeyboardArrowRightIcon />
                    </div>
                </div>
                
            </form>
            
        </div>
    )
};