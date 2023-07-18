import React, { useEffect, useState } from "react";

import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import RoundPhoto from "../Components/RoundPhoto";
import UsersList from "../Components/UsersList";
import PostsGrid from "../Components/PostsGrid";

import { supabase } from "../supabase/client";

import { userPrototype } from "../userprototype";
import { POSTS } from "../HARDCODED INFO";
import { USERS } from "../HARDCODED INFO";


export default function UserProfilePage () {

    const [usersInfo, setUsersInfo] = useState();
    useEffect(() => {
      async function fetchData () {
        try {
          const { data, error } = await supabase.from('jk-users').select("*")
          setUsersInfo(data)
        } catch (err) {
          console.log(err)
        }
      }
      fetchData();
    }, [])


    let selectedUser
    let username = "abimejia"
    let userPosts = [];
    let userFriends = [];

    selectedUser = USERS.find((user) => user.username === username)
    userPosts = POSTS.filter((post) => post.post_username === username)
    userFriends = USERS.filter((friend) => selectedUser.user_friends.includes(friend.user_id))
    

    const friendsTab = "friends"
    const photosTab = "photos"
    const [tabsSection, setTabsSection] = useState(photosTab);
    function photosTabHandle () {setTabsSection(photosTab)};
    function friendsTabHandle () {setTabsSection(friendsTab)};

    return (
        <div>
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent />}/>
            <div className="flex justify-center mt-top-margin-mob sm:m-top-margin-dsk">
                <div className="flex flex-col w-full sm:mt-3 sm:w-1/2 bg-var-1 h-[1000px]">
                    <div className="flex-col">
                        <div className="flex flex-row h-[100px]">
                            <div className="flex justify-center w-3/10 h-full items-start ">
                                <RoundPhoto classesForRoundPhoto="aspect-square w-7/10" imageAlt="profile-picture" imageSource={userPrototype.profile_pic_url} />
                            </div>
                            <div className="flex flex-col w-7/10 pr-8">
                                <div className="font-bold text-profileDisplayName">{userPrototype.display_name}</div>
                                <div className="font-semibold opacity-30 text-profileOtherText">{userPrototype.username}</div>
                                <div className="font-light text-profileOtherText">{userPrototype.short_bio}</div>
                            </div>
                        </div>
                        <div className="flex flex-row mt-16">
                            <button className="w-1/2 bg-var-1 h-[40px] " onClick={photosTabHandle} >Photos ({userPrototype.posts.length})</button>
                            <button className="w-1/2 bg-var-1 h-[40px] " onClick={friendsTabHandle} >Friends ({userPrototype.friends.length})</button>
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
};
