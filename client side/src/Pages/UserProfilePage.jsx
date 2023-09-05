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

import { userPrototype } from "../userprototype";
import { POSTS } from "../HARDCODED INFO";
import { USERS } from "../HARDCODED INFO";
import AddButton from "../Components/Portals/AddButton";


export default function UserProfilePage () {
    const [usersInfo, setUsersInfo] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [loading, setLoading] = useState(true);

    let user_id = "74rh4889wh36d7g389shd"
    useEffect(() => {
      async function fetchSelectedUserData () {
        try {
          const { data, error } = await supabase.from('jk-users').select("*").eq("user_id", user_id);
          setSelectedUser(data[0]);
        } catch (err) {
          console.log(err)
        }
      }
      fetchSelectedUserData();
    }, []);

    const [userFriends, setUserFriends] = useState();
    useEffect(() => {
        async function fetchAllUsers () {
          try {
            const { data, error } = await supabase.from('jk-users').select("*");
            setUsersInfo(data);
          } catch (err) {
            console.log(err)
          }
        }
        fetchAllUsers();
      }, []);

      const [userPosts, setUserPosts] = useState();
      useEffect(() => {
        async function fetchUserPosts () {
          try {
            const { data, error } = await supabase.from('jk-posts').select("*").eq("post_creator_id", user_id);
            setUserPosts(data);
          } catch (err) {
            console.log(err)
          }
        }
        fetchUserPosts();
      }, []);

    console.log(userPosts)

    useEffect(() => {
        if (usersInfo) {
            if (usersInfo.user_friends) {
                setUserFriends(usersInfo.filter((friend) => selectedUser.user_friends.includes(friend.user_id)));
            }
            setUserFriends(userPrototype.friends)
        }
        
        setUserPosts(POSTS.filter((post) => post.post_creator_id === user_id));
    }, [usersInfo])

    const friendsTab = "friends"
    const photosTab = "photos"
    const [tabsSection, setTabsSection] = useState(photosTab);
    function photosTabHandle () {setTabsSection(photosTab)};
    function friendsTabHandle () {setTabsSection(friendsTab)};

    function addPersonHandle () {
        console.log("added friend!")
    }

    function removePersonHandle () {
        console.log("removed friend!")
    }

    if (!selectedUser) {
        return (
            <LoadingSpinner open={loading} />
        )
    } else {
        return (
            <div>
                <AddButton open={true} userId={user_id} />
                <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent />}/>
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
                                        <button className="ml-3" onClick={addPersonHandle}>
                                            <PersonAddAlt1Icon className="text-black hover:text-var-2 duration-100" fontSize="medium" />
                                        </button>
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
                        
                        {(tabsSection === photosTab) && <PostsGrid postsArray={userPosts}/>}
                        {(tabsSection === friendsTab) && <UsersList usersArray={userFriends} />}

                    </div>
                </div>
                    
                
            </div>
        )
    }
    
};
