import React, { useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";

import Menu from "./Portals/Menu";

export default function NavTopContent () {
    const [ showMenu, setShowMenu ] = useState(false);
    function closeMenuHandle () {
        setShowMenu(false)
    }

    function openMenuHandle () {
        setShowMenu(true)
    }


    return (
        <div className="flex flex-row h-full w-full sm:py-3 py-1 justify-evenly items-center">
            <Menu onClose={closeMenuHandle} open={showMenu} />
            <div className="flex justify-center sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto text-var-3">
                <Link className="flex flex-row justify-center items-center lg:text-logoSizeLarge md:text-logoSizeMedium w-full" to="/" >
                    {/* <HomeIcon className="mx-4" fontSize="large" /> */}
                    <div className="flex w-7/10 sm:w-2/10 items-center">
                        <img className="w-full h-full object-cover p-1" src="images/logo.png" alt="jk-logo" />
                    </div>
                    <p className="sm:w-fit hidden md:block sm:pl-2">Just Kittying!</p>
                </Link>
            </div>

            <div className="flex flex-row sm:w-1/2 w-3/5 sm:h-full h-3/4 my-auto bg-var-1 border-solid border-2 border-var-2 rounded-[20px] ">
                <input className=" w-full h-full outline-none pl-6 pr-4 rounded-input "/>
                <button>
                    <SearchIcon className="mx-1 rounded-circular px-1 py-1 hover:bg-var-2 hover:text-var-1 duration-200" fontSize="large"/>
                </button>
            </div>

            <div className="flex justify-center sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto text-var-3">
                <button className="hidden md:block " >
                    <LightModeIcon className="mx-4" fontSize="large" />
                </button>
                <button className="hidden md:block " >
                    <Link to="/myprofile">
                        <PersonIcon className="mx-4" fontSize="large" />
                    </Link>
                </button>
                <button className="hidden md:block " >
                    <Link to="/profilesettings">
                        <SettingsIcon className="mx-4" fontSize="large" />
                    </Link>
                </button>
                <button className="mx-4 px-1 block md:hidden rounded-circular hover:bg-var-2 hover:text-var-1 duration-200 " onClick={openMenuHandle} >
                    <MenuOutlinedIcon fontSize="large" />
                </button>
            </div>
        </div>
    )
};