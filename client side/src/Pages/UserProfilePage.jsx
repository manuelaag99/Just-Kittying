import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import LoadingSpinner from "../Components/Portals/LoadingSpinner";
import NavBottomContent from "../Components/NavBottomContent";
import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import PostsGrid from "../Components/PostsGrid";
import RoundPhoto from "../Components/RoundPhoto";
import UsersList from "../Components/UsersList";

import AddButton from "../Components/Portals/AddButton";
import AddFriend from "../Components/Portals/AddFriend";
import CreateOrUpdatePost from "../Components/Portals/CreateOrUpdatePost";
import MessageWindow from "../Components/Portals/MessageWindow";

import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabase/client";

export default function UserProfilePage () {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    let { userid } = useParams();
    let user_id = userid;

    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
    const [doesUserHaveDisplayName, setDoesUserHaveDisplayName] = useState();
    const [isTextMessageAnError, setIsTextMessageAnError] = useState();
    async function checkIfUserHasDisplayName () {
        if (auth.isLoggedIn) {
            try {
                const { data, error } = await supabase.from("jk-users").select("display_name").eq("user_id", auth.userId);
                if (error) {
                    notifyError(error);
                }
                if (!error) {
                    if (data[0].display_name === "") {
                        setDoesUserHaveDisplayName(false);
                        setTextForMessageWindow("Your account doesn't have a display name; you will be redirected to the Settings page.");
                        setIsMessageWindowOpen(true);
                    } else {
                        setDoesUserHaveDisplayName(true);
                    }
                }
            } catch (err) {
                notifyError(err);
            }
        }
    }

    function closeMessageWindow () {
        if (!doesUserHaveDisplayName) {
            navigate("/settings");
        }
        setIsMessageWindowOpen(false);
    }

    const [selectedUser, setSelectedUser] = useState();
    async function fetchSelectedUserData () {
		try {
			const { data, error } = await supabase.from('jk-users').select("*").eq("user_id", user_id);
			if (error) {
                notifyError(error);
            }
			setSelectedUser(data[0]);
		} catch (err) {
            notifyError(err);
        }
    }

    const [selectedUserProfilePic, setSelectedUserProfilePic] = useState();
    async function fetchSelectedUserProfilePic () {
        if (selectedUser.profile_pic_path) {
            try {
                const { data, error } = await supabase.storage.from("jk-images").getPublicUrl("userProfilePics/" + selectedUser.profile_pic_path);
                if (error) {
                    notifyError(error);
                }
                setSelectedUserProfilePic(data.publicUrl);
            } catch (err) {
                notifyError(err);
            }
        } else {
            try {
                const { data, error } = await supabase.storage.from("jk-images").getPublicUrl("generalPics/Generic-Profile-v2.png");
                if (error) {
                    notifyError(error);
                }
                setSelectedUserProfilePic(data.publicUrl);
            } catch (err) {
                notifyError(err);
            }
        }        
    }

    const [users, setUsers] = useState();
    async function fetchUsers() {
        try {
            const { data, error } = await supabase.from("jk-users").select("*");
            if (error) {
                notifyError(error);
            }
            setUsers(data);
        } catch (err) {
            notifyError(err);
        }
    }

    const [posts, setPosts] = useState();
    const [userPosts, setUserPosts] = useState();
    async function fetchPosts() {
        try {
            const { data, error } = await supabase.from("jk-posts").select("*");
            if (error) {
                notifyError(error);
            }
            setPosts(data);
            setUserPosts(data.filter(post => post.post_creator_id === user_id))
        } catch (err) {
            notifyError(err);
        }
    }

    const [userFriends, setUserFriends] = useState();
    const [usersThatCurrentUserIsFriendsWith, setUsersThatCurrentUserIsFriendsWith] = useState();
    const [usersThatAreFriendsWithCurrentUser, setUsersThatAreFriendsWithCurrentUser] = useState();
    async function fetchFriendsOne () {
		try {
			const { data, error } = await supabase.from("jk-friends").select("user_2_id").eq("user_1_id", user_id);
			if (error) {
                notifyError(error);
            }
			setUsersThatCurrentUserIsFriendsWith(data);
		} catch (err) {
            notifyError(err);
        }
    }

    async function fetchFriendsTwo () {
		try {
			const { data, error } = await supabase.from("jk-friends").select("user_1_id").eq("user_2_id", user_id);
			if (error) {
                notifyError(error);
            }
            setUsersThatAreFriendsWithCurrentUser(data);
		} catch (err) {
            notifyError(err);
        }
    }

    function notifyError (error) {
        setIsTextMessageAnError(true);
        setTextForMessageWindow(error);
        setIsMessageWindowOpen(true);
    }

    let idsOfFriendsOne;
    let idsOfFriendsTwo;
    function organizeFriends () {
        idsOfFriendsOne = usersThatAreFriendsWithCurrentUser.map((user) => user_id = user.user_1_id)
        idsOfFriendsTwo = usersThatCurrentUserIsFriendsWith.map((user) => user_id = user.user_2_id)
        setUserFriends([...idsOfFriendsOne, ...idsOfFriendsTwo]);
    }

    function fetchData () {
        checkIfUserHasDisplayName();
		fetchUsers();
		fetchPosts();
		fetchSelectedUserData();
        fetchFriendsOne();
        fetchFriendsTwo();
    }

    useEffect(() => {
        fetchData();
    }, [user_id])

    useEffect(() => {
        if (selectedUser) {
            fetchSelectedUserProfilePic();
        }
    }, [selectedUser])

    useEffect(() => {
        if (usersThatAreFriendsWithCurrentUser && usersThatCurrentUserIsFriendsWith) {
            organizeFriends();
        }
    }, [usersThatCurrentUserIsFriendsWith, usersThatAreFriendsWithCurrentUser])

    const friendsTab = "friends";
    const photosTab = "photos";
    const [tabsSection, setTabsSection] = useState(photosTab);
    function photosTabHandle () {
        setTabsSection(photosTab)
    };
    function friendsTabHandle () {
        setTabsSection(friendsTab)
        organizeFriends();
    };

    const [createPostWindow, setCreatePostWindow] = useState();

    const [addFriendWindow, setAddFriendWindow] = useState(false);
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

    useEffect(() => {
        setTabsSection("photos");
    }, [selectedUser])

    if (!selectedUser || !users || !userPosts | !userFriends ) {
        return (
            <LoadingSpinner open={loading} />
        )
    } else {
        return (
            <div>
                {auth.isLoggedIn && <AddButton onAdd={() => setCreatePostWindow(true)} open={true} userId={auth.userId} />}
                {auth.isLoggedIn && <CreateOrUpdatePost fetchAgain={fetchPosts} onClose={() => setCreatePostWindow(false)} open={createPostWindow} userId={auth.userId} />}
                <MessageWindow isErrorMessage={isTextMessageAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
                <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent userId={auth.userId} />} />
                {!auth.isLoggedIn && <NavigationBar navPosition=" fixed bottom-0 " navBackgColor=" bg-var-3 " content={<NavBottomContent />} />}
                <AddFriend onClose={() => setAddFriendWindow(false)} open={addFriendWindow} userId={auth.userId} userToAddId={user_id} />
                <div className="flex justify-center mt-top-margin-mob sm:m-top-margin-dsk">
                    <div className="flex flex-col w-full sm:mt-3 sm:w-2/3 bg-var-1 h-fit">
                        <div className="flex-col">
                            <div className="flex flex-row h-[100px]">
                                <div className="flex justify-center w-3/10 h-full items-start ">
                                    {!selectedUserProfilePic && <RoundPhoto classesForRoundPhoto="aspect-square w-7/10" imageAlt="profile-picture" imageSource={null} />}
                                    {selectedUserProfilePic && <RoundPhoto classesForRoundPhoto="aspect-square w-7/10" imageAlt="profile-picture" imageSource={selectedUserProfilePic} />}
                                </div>
                                <div className="flex flex-col w-7/10 pr-8">
                                    <div className="flex flex-row justify-start font-bold text-profileDisplayName">
                                        <p>{selectedUser.display_name}</p>
                                        {(auth.isLoggedIn) && (selectedUser.user_id !== auth.userId) && !isUserInListUserFriends && <button className="ml-3" onClick={() => setAddFriendWindow(true)}>
                                            <PersonAddAlt1Icon className="text-black hover:text-var-2 duration-100" fontSize="medium" />
                                        </button>}
                                        {(auth.isLoggedIn) && (selectedUser.user_id !== auth.userId) && isUserInListUserFriends && <button className="ml-3">
                                            <PersonRemoveIcon className="text-black hover:text-var-2 duration-100" fontSize="medium" />
                                        </button>}
                                    </div>
                                    <div className="font-semibold opacity-30 text-profileOtherText">{selectedUser.username}</div>
                                    <div className="font-light text-profileOtherText">{selectedUser.short_bio}</div>
                                </div>
                            </div>
                            <div className="flex flex-row mt-16 sm:mt-24">
                                <button className="w-1/2 bg-var-1 h-[40px] " onClick={photosTabHandle} >Posts ({userPosts ? userPosts.length : "0"})</button>
                                <button className="w-1/2 bg-var-1 h-[40px] " onClick={friendsTabHandle} >Friends ({userFriends ? userFriends.length : "0"})</button>
                            </div>
                            <div className="flex w-full">
                                {(tabsSection === photosTab) && <div className="flex flex-row w-full">
                                    <div className="w-1/2 bg-var-1-dark h-[3px]"></div>
                                    <div className="w-1/2 bg-var-1 h-[3px]"></div>
                                </div>}
                                {(tabsSection === friendsTab) && <div className="flex flex-row w-full">
                                    <div className="w-1/2 bg-var-1 h-[3px]"></div>
                                    <div className="w-1/2 bg-var-1-dark h-[3px]"></div>
                                </div>}
                            </div>
                        </div>
                        {(tabsSection === photosTab) && <PostsGrid postsArray={userPosts} userId={auth.userId} />}
                        {(tabsSection === friendsTab) && <UsersList allUsers={users} fetchAgain={fetchData} selectedUsersArray={userFriends} userId={auth.userId} />}
                    </div>
                </div>
            </div>
        )
    }
    
};
