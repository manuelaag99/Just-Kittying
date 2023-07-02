import React, { useState } from "react";

import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";

export default function UserProfile () {

    const friendsTab = "friends"
    const photosTab = "photos"

    const [ tabsSection, setTabsSection ] = useState(photosTab);
    function photosTabHandle () {setTabsSection(photosTab)};
    function friendsTabHandle () {setTabsSection(friendsTab)};

    return (
        <div>
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent />}/>
            <div className="flex justify-center sm:m-top-margin-dsk">
                <div className="flex flex-col w-1/2 bg-var-1 h-[1000px]">
                    <div className="flex-col">
                        <div className="flex flex-row h-[100px]">
                            <div className="flex justify-center w-3/10 h-full items-start ">
                                <div className="rounded-circular bg-var-2 aspect-square w-7/10"></div>
                            </div>
                            <div className="flex flex-col w-7/10 ">
                                <div className="font-bold text-profileDisplayName">Display Name</div>
                                <div className="font-semibold opacity-30">username</div>
                                <div className="font-light">Short bio</div>
                            </div>
                        </div>
                        <div className="flex flex-row mt-16">
                            <button className="w-1/2 bg-var-1 h-[40px] " onClick={photosTabHandle} >Photos</button>
                            <button className="w-1/2 bg-var-1 h-[40px] " onClick={friendsTabHandle} >Friends</button>
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
                    
                    {(tabsSection === photosTab) && <div className="w-full">
                        <div>
                            PHOTOS
                        </div>
                    </div>}

                    {(tabsSection === friendsTab) && <div className="w-full">
                        <div>
                            FRIENDS
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
};
