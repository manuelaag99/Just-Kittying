import React, { useState } from "react";

import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";

export default function UserProfile () {

    const friendsTab = "friends"
    const photosTab = "photos"

    const [ tabsSection, setTabsSection ] = useState(photosTab);
    function photosTabHandle () {setTabsSection(photosTab)};
    function friendsTabHandle () {setTabsSection(friendsTab)};

    const userPrototype = {
        displayName: "Abi Mejia",
        username: "abimejia",
        shortBio: "im just too soft for all of it",
        profilePicUrl: "https://economictimes.indiatimes.com/thumb/msid-96710895,width-1200,height-900,resizemode-4,imgsize-38032/blackpink-jisoo.jpg?from=mdr",
        feedPreference: "friends",
        accountPrivacy: "private",
        friends: [
            {
                name: "Liam Ballesteros",
                username: "asideofliam",
                profilePic: "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=2000"
            },
            {
                name: "Mike Gaona",
                username: "unmikemas",
                profilePic: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                name: "Max Zambada",
                username: "mazamba",
                profilePic: "https://st.depositphotos.com/1144472/2003/i/950/depositphotos_20030237-stock-photo-cheerful-young-man-over-white.jpg"
            }
        ],
        posts: [
            {
                creator: "",
                postPhoto: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
                postCaption: "",
                postComments: [],
                postDate: "",
                postLikes: [],
            },
            {
                creator: "",
                postPhoto: "https://www.dailypaws.com/thmb/b8Ev1ECLhknADPJf4kX7mc8Ev74=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/facts-about-cats-1292117990-2000-6b1a096d6f6f4ea48deb166a89d4bdea.jpg",
                postCaption: "",
                postComments: [],
                postDate: "",
                postLikes: [],
            }
        ]
    }

    const PHOTOS = [
        "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
        "https://www.dailypaws.com/thmb/b8Ev1ECLhknADPJf4kX7mc8Ev74=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/facts-about-cats-1292117990-2000-6b1a096d6f6f4ea48deb166a89d4bdea.jpg"
    ];

    const FRIENDS = [
        {
            name: "Liam Ballesteros",
            username: "asideofliam",
            profilePic: "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=2000"
        },
        {
            name: "Mike Gaona",
            username: "unmikemas",
            profilePic: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            name: "Max Zambada",
            username: "mazamba",
            profilePic: "https://st.depositphotos.com/1144472/2003/i/950/depositphotos_20030237-stock-photo-cheerful-young-man-over-white.jpg"
        }
    ];

    return (
        <div>
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent />}/>
            <div className="flex justify-center mt-top-margin-mob sm:m-top-margin-dsk">
                <div className="flex flex-col w-full sm:w-1/2 bg-var-1 h-[1000px]">
                    <div className="flex-col">
                        <div className="flex flex-row h-[100px]">
                            <div className="flex justify-center w-3/10 h-full items-start ">
                                <div className="rounded-circular bg-var-2 aspect-square w-7/10">
                                    <img className="h-full w-full object-cover rounded-circular" src={userPrototype.profilePicUrl} alt="profile-pic" />
                                </div>
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
                    
                    {(tabsSection === photosTab) && <div className="flex w-full">
                        {userPrototype.posts.map((post, index) => {
                            return <div key={index} className="w-1/2 aspect-square h-userProfilePhotosTabPhotoHeight">
                                <img className="w-full h-full object-cover hover:opacity-40 duration-200 cursor-pointer" src={post.postPhoto} alt="" />
                        </div>})}
                    </div>}

                    {(tabsSection === friendsTab) && <div className="flex flex-col justify-center w-full ">
                        {userPrototype.friends.map((friend, index) => {
                            return <div key={index} className="flex flex-row w-full py-2 hover:bg-var-2 duration-200 cursor-pointer ">
                                <div className="flex justify-center items-center h-userProfileFriendsTabPhotoHeight aspect-square pl-2">
                                    <img className="w-full h-full rounded-circular object-cover " src={friend.profilePic} alt="profile-pic" />
                                </div>
                                <div className="flex flex-col w-fit pl-2 pr-2">
                                    <div className="font-bold" >{friend.name}</div>
                                    <div className="opacity-30" >{friend.username}</div>
                                </div>
                            </div>
                        })}
                    </div>}

                </div>
            </div>
        </div>
    )
};
