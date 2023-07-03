import React, { useState } from "react";

import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import RoundPhoto from "../Components/RoundPhoto";
import UsersList from "../Components/UsersList";
import PostsGrid from "../Components/PostsGrid";

import { userPrototype } from "../userprototype";

export default function UserProfile () {

    const friendsTab = "friends"
    const photosTab = "photos"
    const [ tabsSection, setTabsSection ] = useState(photosTab);
    function photosTabHandle () {setTabsSection(photosTab)};
    function friendsTabHandle () {setTabsSection(friendsTab)};

    return (
        <div>
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent />}/>
            <div className="flex justify-center mt-top-margin-mob sm:m-top-margin-dsk">
                <div className="flex flex-col w-full sm:w-1/2 bg-var-1 h-[1000px]">
                    <div className="flex-col">
                        <div className="flex flex-row h-[100px]">
                            <div className="flex justify-center w-3/10 h-full items-start ">
                                <RoundPhoto classesForRoundPhoto="aspect-square w-7/10" imageAlt="profile-picture" imageSource={userPrototype.profilePicUrl} />
                            </div>
                            <div className="flex flex-col w-7/10 ">
                                <div className="font-bold text-profileDisplayName">{userPrototype.displayName}</div>
                                <div className="font-semibold opacity-30">{userPrototype.username}</div>
                                <div className="font-light">{userPrototype.shortBio}</div>
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
                    
                    {(tabsSection === photosTab) && <PostsGrid postsArray={userPrototype.posts}/>}
                    {(tabsSection === friendsTab) && <UsersList usersArray={userPrototype.friends} />}

                </div>
            </div>
        </div>
    )
};
