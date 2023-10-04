import React, { useState } from "react";

import LightModeIcon from '@mui/icons-material/LightMode';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useNavigate } from "react-router-dom";

import Menu from "./Portals/Menu";
import SearchBar from "./SearchBar";

export default function NavTopContent ({ isHomePage, onReturnToTimeLine, searchQuery, sendSearchQuery, userId }) {
    console.log(userId)
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    function closeMenuHandle () {
        setShowMenu(false)
    }

    function openMenuHandle () {
        setShowMenu(true)
    }

    function clickOnLogoHandle () {
        if (isHomePage) {
            onReturnToTimeLine()
        } else {
            navigate("/");
        }
    }

    function sendSearchQueryHandle (searchQueryState) {
        if (isHomePage) {
            sendSearchQuery(searchQueryState)
        }
    }

    return (
        <div className="flex flex-row h-full w-full sm:py-3 py-1 justify-evenly items-center">
            <Menu onClose={closeMenuHandle} open={showMenu} userId={userId} />
            <div className="flex justify-center sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto text-var-3">
                <button className="flex flex-row justify-center items-center lg:text-logoSizeLarge md:text-logoSizeMedium w-full" onClick={clickOnLogoHandle}>
                    <div className="flex h-full w-fit sm:w-3/10 md:w-fit items-center">
                        <img className="w-full h-full object-cover p-1" src="images/logo.png" alt="jk-logo" />
                    </div>
                    <p className="sm:w-fit hidden md:block sm:pl-2 hover:text-var-3-hovered">Just Kittying!</p>
                </button>
            </div>

            <SearchBar sendSearchQuery={(searchQueryState) => sendSearchQueryHandle(searchQueryState)} searchQuery={searchQuery} />

            <div className="flex justify-center sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto  text-var-3 ">
                <button className="hidden md:block hover:text-var-3-hovered " >
                    <LightModeIcon className="mx-4" fontSize="large" />
                </button>
                <Link className="justify-center items-center hidden md:flex hover:text-var-3-hovered " to={"/profile/" + userId}>
                    <PersonIcon className="mx-4" fontSize="large" />
                </Link>
                <Link className="justify-center items-center hidden md:flex hover:text-var-3-hovered " to="/settings">
                    <SettingsIcon className="mx-4" fontSize="large" />
                </Link>
                <Link className="justify-center items-center hidden md:flex hover:text-var-3-hovered " state={{ user_id: userId }} to="/notifications">
                    <NotificationsIcon className="mx-4" fontSize="large" />
                </Link>
                <button className="mx-4 px-1 block md:hidden rounded-circular hover:bg-var-2 hover:text-var-1 duration-200 " onClick={openMenuHandle} >
                    <MenuOutlinedIcon fontSize="large" />
                </button>
            </div>
        </div>
    )
};