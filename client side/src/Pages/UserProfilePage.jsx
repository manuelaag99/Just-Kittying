import React, { useEffect, useState } from "react";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import LoadingSpinner from "../Components/Portals/LoadingSpinner";
import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import RoundPhoto from "../Components/RoundPhoto";
import UsersList from "../Components/UsersList";
import PostsGrid from "../Components/PostsGrid";

import { supabase } from "../supabase/client";

import AddButton from "../Components/Portals/AddButton";
import CreateOrUpdatePost from "../Components/Portals/CreateOrUpdatePost";
import { useNavigate, useParams } from "react-router-dom";
import MessageWindow from "../Components/Portals/MessageWindow";


export default function UserProfilePage () {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    let user_id = "19ae918c-8adb-44e2-8456-f24ff1e85d59"

    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
    const [doesUserHaveDisplayName, setDoesUserHaveDisplayName] = useState();
    const [isTextMessageAnError, setIsTextMessageAnError] = useState();
    async function checkIfUserHasDisplayName () {
        try {
            const { data, error } = await supabase.from("jk-users").select("display_name").eq("user_id", user_id);
            if (error) console.log(error);
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
            console.log(err)
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
			if (error) console.log(error);
			setSelectedUser(data[0]);
		} catch (err) {
			console.log(err);
		}
    }

    const [users, setUsers] = useState();
    async function fetchUsers() {
        try {
            const { data, error } = await supabase.from("jk-users").select("*");
            if (error) console.log(error);
            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }

    const [posts, setPosts] = useState();
    const [userPosts, setUserPosts] = useState();
    async function fetchPosts() {
        try {
            const { data, error } = await supabase.from("jk-posts").select("*");
            if (error) console.log(error);
            setPosts(data);
            setUserPosts(data.filter(post => post.post_creator_id === user_id))
        } catch (err) {
            console.log(err);
        }
    }

    const [userFriends, setUserFriends] = useState();
    const [usersThatCurrentUserIsFriendsWith, setUsersThatCurrentUserIsFriendsWith] = useState();
    const [usersThatAreFriendsWithCurrentUser, setUsersThatAreFriendsWithCurrentUser] = useState();
    async function fetchFriendsOne () {
		try {
			const { data, error } = await supabase.from("jk-friends").select("user_2_id").eq("user_1_id", user_id);
			if (error) console.log(error);
			setUsersThatCurrentUserIsFriendsWith(data);
		} catch (err) {
			console.log(err);
		}
    }

    async function fetchFriendsTwo () {
		try {
			const { data, error } = await supabase.from("jk-friends").select("user_1_id").eq("user_2_id", user_id);
			if (error) console.log(error);
            setUsersThatAreFriendsWithCurrentUser(data);
		} catch (err) {
			console.log(err);
		}
    }

    let idsOfFriendsOne;
    let idsOfFriendsTwo;
    function organizeFriends () {
        idsOfFriendsOne = usersThatAreFriendsWithCurrentUser.map((user) => user_id = user.user_1_id)
        idsOfFriendsTwo = usersThatCurrentUserIsFriendsWith.map((user) => user_id = user.user_2_id)
        setUserFriends([...idsOfFriendsOne, ...idsOfFriendsTwo]);
    }

    useEffect(() => {
        checkIfUserHasDisplayName();
		fetchUsers();
		fetchPosts();
		fetchSelectedUserData();
        fetchFriendsOne();
        fetchFriendsTwo();
    }, []);

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

    function addPersonHandle () {
        console.log("added friend!");
    }

    function removePersonHandle () {
        console.log("removed friend!");
    }

    const [createPostWindow, setCreatePostWindow] = useState();

    if (!selectedUser || !users || !userPosts) {
        return (
            <LoadingSpinner open={loading} />
        )
    } else {
        return (
            <div>
                <AddButton onAdd={() => setCreatePostWindow(true)} open={true} userId={user_id} />
                <CreateOrUpdatePost fetchAgain={fetchPosts} onClose={() => setCreatePostWindow(false)} open={createPostWindow} userId={user_id} />
                <MessageWindow isErrorMessage={isTextMessageAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
                <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent isHomePage={false} />} />
                <div className="flex justify-center mt-top-margin-mob sm:m-top-margin-dsk">
                    <div className="flex flex-col w-full sm:mt-3 sm:w-2/3 bg-var-1 h-[1000px]">
                        
                        <div className="flex-col">
                            <div className="flex flex-row h-[100px]">
                                <div className="flex justify-center w-3/10 h-full items-start ">
                                    <RoundPhoto classesForRoundPhoto="aspect-square w-7/10" imageAlt="profile-picture" imageSource={selectedUser.profile_pic_url || "images/Generic-Profile-v2.png"} />
                                </div>
                                <div className="flex flex-col w-7/10 pr-8">
                                    <div className="flex flex-row justify-start font-bold text-profileDisplayName">
                                        <p>{selectedUser.display_name}</p>
                                        {(selectedUser.user_id !== user_id) && <button className="ml-3" onClick={addPersonHandle}>
                                            <PersonAddAlt1Icon className="text-black hover:text-var-2 duration-100" fontSize="medium" />
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
                        
                        {(tabsSection === photosTab) && <PostsGrid postsArray={userPosts} userId={user_id} />}
                        {(tabsSection === friendsTab) && <UsersList allUsers={users} selectedUsersArray={userFriends} userId={user_id} />}

                    </div>
                </div>
                    
                
            </div>
        )
    }
    
};
