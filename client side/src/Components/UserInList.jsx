import { useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/client";
import RoundPhoto from "./RoundPhoto";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import AddFriend from "./Portals/AddFriend";
import ConfirmWindow from "./Portals/ConfirmWindow";
import MessageWindow from "./Portals/MessageWindow";

export default function UserInList ({ fetchAgain, index, userId, userInListId }) {
    const auth = useContext(AuthContext);
    
    const [userFriends, setUserFriends] = useState();
    const [usersThatCurrentUserIsFriendsWith, setUsersThatCurrentUserIsFriendsWith] = useState();
    const [usersThatAreFriendsWithCurrentUser, setUsersThatAreFriendsWithCurrentUser] = useState();
    async function fetchFriendsOne () {
		try {
			const { data, error } = await supabase.from("jk-friends").select("user_2_id").eq("user_1_id", userInListId);
			if (error) console.log(error);
			setUsersThatCurrentUserIsFriendsWith(data);
		} catch (err) {
			console.log(err);
		}
    }

    async function fetchFriendsTwo () {
		try {
			const { data, error } = await supabase.from("jk-friends").select("user_1_id").eq("user_2_id", userInListId);
			if (error) console.log(error);
            setUsersThatAreFriendsWithCurrentUser(data);
		} catch (err) {
			console.log(err);
		}
    }
    
    const [userInfo, setUserInfo] = useState();    
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
        fetchFriendsOne();
        fetchFriendsTwo();
    }, [])

    const [userProfilePic, setUserProfilePic] = useState();
    async function fetchUserProfilePic () {
        if (userInfo.profile_pic_path) {
            try {
                const { data, error } = await supabase.storage.from("jk-images").getPublicUrl("userProfilePics/" + userInfo.profile_pic_path);
                if (error) console.log(error);
                setUserProfilePic(data.publicUrl);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const { data, error } = await supabase.storage.from("jk-images").getPublicUrl("generalPics/Generic-Profile-v2.png");
                if (error) console.log(error);
                setUserProfilePic(data.publicUrl);
            } catch (err) {
                console.log(err);
            }
        }   
    }
    useEffect(() => {
        if (userInfo) {
            fetchUserProfilePic();
        }
    }, [userInfo])

    let idsOfFriendsOne;
    let idsOfFriendsTwo;
    function organizeFriends () {
        idsOfFriendsOne = usersThatAreFriendsWithCurrentUser.map((user) => userInListId = user.user_1_id)
        idsOfFriendsTwo = usersThatCurrentUserIsFriendsWith.map((user) => userInListId = user.user_2_id)
        setUserFriends([...idsOfFriendsOne, ...idsOfFriendsTwo]);
    }

    useEffect(() => {
        if (usersThatAreFriendsWithCurrentUser && usersThatCurrentUserIsFriendsWith) {
            organizeFriends();
        }
    }, [usersThatCurrentUserIsFriendsWith, usersThatAreFriendsWithCurrentUser])

    const [isAddFriendWindowVisible, setIsAddFriendWindowVisible] = useState(false);
    const [isRemoveFriendWindowVisible, setIsRemoveFriendWindowVisible] = useState(false);

    const [isUserInListUserFriends, setIsUserInListUserFriends] = useState();
    useEffect(() => {
        if (userFriends) {
            if (userFriends.length > 0) {
                if (userFriends.includes(auth.userId)) {
                    setIsUserInListUserFriends(true);
                } else {
                    setIsUserInListUserFriends(false);
                }
            }
        }
    }, [userFriends])

    const [isMessageWindowVisible, setIsMessageWindowVisible] = useState(false);
    const [messageWindowText, setMessageWindowText] = useState("");
    const [isMessageWindowForAnError, setIsMessageWindowForAnError] = useState(false);

    function openMessageWindowAfterRemovingFriend () {
        fetchAgain();
        setMessageWindowText("Successfully removed this user from your list of friends.");
        setIsRemoveFriendWindowVisible(false);
        setIsMessageWindowVisible(true);
    }

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
    } else if (userInfo) {
        return (
            <div key={index} className="flex flex-row w-full py-2 hover:bg-var-2 duration-200 cursor-pointer justify-between px-2 ">
                <AddFriend onClose={() => setIsAddFriendWindowVisible(false)} open={isAddFriendWindowVisible} userId={userId} userToAddId={userInListId} />
                <Link className="flex flex-row justify-start w-8/10" to={"/profile/" + userInListId}>
                    {!userProfilePic && <RoundPhoto classesForRoundPhoto="flex justify-center items-center h-userProfileFriendsTabPhotoHeight aspect-square ml-2" imageAlt="friend-profile-pic" imageSource={null} />}
                    {userProfilePic && <RoundPhoto classesForRoundPhoto="flex justify-center items-center h-userProfileFriendsTabPhotoHeight aspect-square ml-2" imageAlt="friend-profile-pic" imageSource={userProfilePic} />}
                    <div className="flex flex-col w-fit pl-4 pr-2">
                        <div className="font-bold" >{userInfo.display_name}</div>
                        <div className="opacity-30" >{userInfo.username}</div>
                    </div>
                </Link>
                <div className="flex flex-row w-fit justify-center items-center">
                    {auth.isLoggedIn && (userInListId !== auth.userId) && !isUserInListUserFriends && <button className="flex justify-center px-3 w-fit items-center " onClick={() => setIsAddFriendWindowVisible(true)} >
                        <p className="text-center">
                            <PersonAddAlt1Icon className="text-black hover:text-var-4 duration-100" fontSize="small" />
                        </p>
                    </button>}
                    {auth.isLoggedIn && (userInListId !== auth.userId) && isUserInListUserFriends && <button className="flex justify-center px-3 w-fit items-center " onClick={() => setIsRemoveFriendWindowVisible(true)}>
                        <p className="text-center">
                            <PersonRemoveIcon className="text-black hover:text-var-4 duration-100" fontSize="small" />
                        </p>
                    </button>}
                </div>
                <ConfirmWindow idOfOtherUser={userInListId} item={null} onClose={() => setIsRemoveFriendWindowVisible(false)} onCloseConfirmWindowAndThenOpenMessageWindow={openMessageWindowAfterRemovingFriend} open={isRemoveFriendWindowVisible} textForMessage="Are you sure you want to remove this user from your friends?" user={userInfo} />
                <MessageWindow isErrorMessage={isMessageWindowForAnError} onClose={() => setIsMessageWindowVisible(false)} open={isMessageWindowVisible} textForMessage={messageWindowText} />
            </div>
        )
    }
}