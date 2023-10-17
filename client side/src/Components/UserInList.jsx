import { useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/client";
import RoundPhoto from "./RoundPhoto";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import AddFriend from "./Portals/AddFriend";

export default function UserInList ({ index, userId, userInListId }) {
    const auth = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState();
    
    console.log(userInListId)
    async function fetchUserInfo () {
        if (userInListId) {
            try {
                const { data, error } = await supabase.from("jk-users").select("*").eq("user_id", userInListId);
                if (error) console.log(error);
                setUserInfo(data[0]);
            } catch (err) {
                console.log(err);
            }
        }
    }
    useEffect(() => {
        fetchUserInfo();
    }, [userInListId])

    const [addFriendWindow, setAddFriendWindow] = useState(false);

    if (!userId && !userInfo) {
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
    } else if (userId && userInfo) {
        return (
            <div key={index} className="flex flex-row w-full py-2 hover:bg-var-2 duration-200 cursor-pointer justify-between px-2 ">
                <AddFriend onClose={() => setAddFriendWindow(false)} open={addFriendWindow} userId={userId} userToAddId={userInListId} />
                <Link className="flex flex-row justify-start w-8/10" to={"/profile/" + userInListId}>
                    <RoundPhoto classesForRoundPhoto="flex justify-center items-center h-userProfileFriendsTabPhotoHeight aspect-square ml-2" imageAlt="friend-profile-pic" imageSource={userId.profile_pic_url || null} />
                    <div className="flex flex-col w-fit pl-4 pr-2">
                        <div className="font-bold" >{userInfo.display_name}</div>
                        <div className="opacity-30" >{userInfo.username}</div>
                    </div>
                </Link>
                <div className="flex flex-row w-fit justify-center items-center">
                    {auth.isLoggedIn && (userInListId !== userId) && <button className="flex justify-center px-3 w-fit items-center " onClick={() => setAddFriendWindow(true)} >
                        <p className="text-center">
                            <PersonAddAlt1Icon className="text-black hover:text-var-4 duration-100" fontSize="small" />
                        </p>
                    </button>}
                    {auth.isLoggedIn && (userInListId !== userId) && <button className="flex justify-center px-3 w-fit items-center ">
                        <p className="text-center">
                            <PersonRemoveIcon className="text-black hover:text-var-4 duration-100" fontSize="small" />
                        </p>
                    </button>}
                </div>
                
            </div>
        )
    }
}