import React, { useContext, useState } from "react";

import LightModeIcon from '@mui/icons-material/LightMode';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useNavigate } from "react-router-dom";

import Menu from "./Portals/Menu";
import SearchBar from "./SearchBar";
import { AuthContext } from "../context/AuthContext";

export default function NavTopContent ({ userId }) {
    const auth = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    function closeMenuHandle () {
        setShowMenu(false)
    }

    function openMenuHandle () {
        setShowMenu(true)
    }

    return (
        <div className="flex flex-row h-full w-full sm:py-3 py-1 justify-evenly items-center">
            <Menu onClose={closeMenuHandle} open={showMenu} userId={userId} />
            <div className="flex justify-center sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto text-var-3">
                <Link className="flex flex-row justify-center items-center lg:text-logoSizeLarge md:text-logoSizeMedium w-full" to="/">
                    <div className="flex h-full w-fit sm:w-3/10 md:w-fit items-center">
                        <img className="w-full h-full object-cover p-1" src="images/logo.png" alt="jk-logo" />
                    </div>
                    <p className="sm:w-fit hidden md:block sm:pl-2 hover:text-var-3-hovered">Just Kittying!</p>
                </Link>
            </div>

            <SearchBar />

            <div className="flex justify-center sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto  text-var-3 ">
                <button className="hidden md:block hover:text-var-3-hovered " >
                    <LightModeIcon className="mx-4" fontSize="large" />
                </button>
                {auth.isLoggedIn && <Link className="justify-center items-center hidden md:flex hover:text-var-3-hovered " to={"/profile/" + auth.userId}>
                    <PersonIcon className="mx-4" fontSize="large" />
                </Link>}
                {auth.isLoggedIn && <Link className="justify-center items-center hidden md:flex hover:text-var-3-hovered " to="/settings">
                    <SettingsIcon className="mx-4" fontSize="large" />
                </Link>}
                {auth.isLoggedIn && <Link className="justify-center items-center hidden md:flex hover:text-var-3-hovered " state={{ user_id: auth.userId }} to="/notifications">
                    <NotificationsIcon className="mx-4" fontSize="large" />
                </Link>}
                <button className="flex justify-center items-center mx-4 px-1 md:hidden aspect-square rounded-circular hover:bg-var-2 hover:text-var-1 duration-200 " onClick={openMenuHandle} >
                    <MenuOutlinedIcon fontSize="large" />
                </button>
            </div>
        </div>
    )
};