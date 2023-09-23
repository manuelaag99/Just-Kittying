import { useEffect, useState } from "react"
import { supabase } from "../supabase/client";
import RoundPhoto from "./RoundPhoto";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import LoadingSpinner from "./Portals/LoadingSpinner";

export default function UserInList ({ index, userId }) {
    console.log(userId)
    const [userInfo, setUserInfo] = useState();

    async function fetchUserInfo () {
        try {
            const { data, error } = await supabase.from("jk-users").select("*").eq("user_id", userId.user_1_id);
            if (error) console.log(error);
            setUserInfo(data[0]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    if (!userInfo) {
        return (
            <div key={index} className="flex flex-row w-full py-2 hover:bg-var-2 duration-200 cursor-pointer ">
            <div className="flex flex-row justify-start w-8/10">
                <div className="rounded-circular bg-gray-200 aspect-square ml-2 h-userProfileFriendsTabPhotoHeight"></div>
                <div className="flex flex-col w-6/10 pl-4 pr-2">
                    <div className="w-6/10 bg-gray-400 h-4 rounded-input my-1"></div>
                    <div className="w-6/10 bg-gray-300 h-4 rounded-input my-1"></div>
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <div key={index} className="flex flex-row w-full py-2 hover:bg-var-2 duration-200 cursor-pointer ">
                <div className="flex flex-row justify-start w-8/10">
                    <RoundPhoto classesForRoundPhoto="flex justify-center items-center h-userProfileFriendsTabPhotoHeight aspect-square ml-2" imageAlt="friend-profile-pic" imageSource={userId.profile_pic_url || null} />
                    <div className="flex flex-col w-fit pl-4 pr-2">
                        <div className="font-bold" >{userInfo.display_name}</div>
                        <div className="opacity-30" >{userInfo.username}</div>
                    </div>
                </div>
                <div className="flex justify-center sm:justify-end sm:pr-4 w-1/10 items-center">
                    <PersonAddAlt1Icon className="text-black hover:text-var-4 duration-100" fontSize="small" />
                </div>
                <div className="flex justify-center sm:justify-end sm:pr-4 w-1/10 items-center">
                    <PersonRemoveIcon className="text-black hover:text-var-4 duration-100" fontSize="small" />
                </div>
            </div>
        )
    }
}