import React from "react";

import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

export default function NavTopContent () {
    return (
        <form className="flex flex-row h-full w-full sm:py-3 py-1 justify-evenly items-center">
            <div className="flex justify-center sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto text-var-3">
                <button className=" " >
                    <HomeIcon className="mx-4" fontSize="large" />
                </button>
            </div>

            <div className="flex flex-row sm:w-1/2 w-3/5 sm:h-full h-3/4 my-auto bg-var-1 border-solid border-2 border-var-2 rounded-[20px] ">
                <input className=" w-full h-full outline-none pl-6 pr-4 rounded-[20px]"/>
                <button>
                    <SearchIcon className="mx-1" fontSize="large"/>
                </button>
            </div>

            <div className="flex justify-center sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto text-var-3">
                <button className="hidden md:block " >
                    <LightModeIcon className="mx-4" fontSize="large" />
                </button>
                <button className="hidden md:block " >
                    <PersonIcon className="mx-4" fontSize="large" />
                </button>
                <button className="hidden md:block " >
                    <SettingsIcon className="mx-4" fontSize="large" /> 
                </button>
                <button className="mx-4 block md:hidden " >
                    <MenuOutlinedIcon fontSize="large" />
                </button>
            </div>
        </form>
    )
};