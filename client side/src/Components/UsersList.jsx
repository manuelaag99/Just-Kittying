import React from "react";

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import RoundPhoto from "./RoundPhoto";

export default function ({ usersArray }) {
    // add "add friend" and "delete friend" functionality
    return (
        <div className="flex flex-col justify-center w-full ">
            {usersArray && usersArray.map((user, index) => {
                return <div key={index} className="flex flex-row w-full py-2 hover:bg-var-2 duration-200 cursor-pointer ">
                    <div className="flex flex-row justify-start w-8/10">
                        <RoundPhoto classesForRoundPhoto="flex justify-center items-center h-userProfileFriendsTabPhotoHeight aspect-square ml-2" imageAlt="friend-profile-pic" imageSource={user.profile_pic_url} />
                        <div className="flex flex-col w-fit pl-4 pr-2">
                            <div className="font-bold" >{user.displayName}</div>
                            <div className="opacity-30" >{user.username}</div>
                        </div>
                    </div>
                    <div className="flex justify-center sm:justify-end sm:pr-4 w-2/10 items-center">
                        <PersonAddIcon className="text-black hover:text-var-4 duration-100" />
                    </div>
                </div>
            })}
        </div>
    )
};