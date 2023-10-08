import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import OutputIcon from '@mui/icons-material/Output';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { AuthContext } from "../../context/AuthContext";

export default function Menu({ open, onClose, userId }) {
    const auth = useContext(AuthContext);

    const menu = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <div className="flex flex-row fixed z-50 top-0 left-[20%] w-full h-screen ">
                <div className="flex flex-col w-8/10 h-full bg-var-1">
                    <div className="flex justify-between h-fit w-full py-5 pl-5 pr-2 items-center">
                        <p className="w-fit pr-4">Menu</p>
                    </div>

                    <div className="flex justify-between h-fit w-full py-5 pl-5 pr-2 cursor-pointer items-center hover:bg-var-2 duration-200">
                        <p className="w-fit pr-4">Change light mode</p>
                        <LightModeIcon className="mx-4" fontSize="large" />
                    </div>

                    <Link className="flex justify-between h-fit w-full py-5 pl-5 pr-2 cursor-pointer items-center hover:bg-var-2 duration-200" to="/">
                        <p className="w-fit pr-4">Home</p>
                        <HomeIcon className="mx-4" fontSize="large" />
                    </Link>

                    {auth.isLoggedIn && <Link className="flex justify-between h-fit w-full py-5 pl-5 pr-2 cursor-pointer items-center hover:bg-var-2 duration-200" to={"/profile/" + auth.userId}>
                        <p className="w-fit pr-4">My profile</p>
                        <PersonIcon className="mx-4" fontSize="large" />
                    </Link>}

                    {auth.isLoggedIn && <Link className="flex justify-between h-fit w-full py-5 pl-5 pr-2 cursor-pointer items-center hover:bg-var-2 duration-200" state={{ user_id: auth.userId }} to="/notifications">
                        <p className="w-fit pr-4">Notifications</p>
                        <NotificationsIcon className="mx-4" fontSize="large" />
                    </Link>}

                    {auth.isLoggedIn && <Link className="flex justify-between h-fit w-full py-5 pl-5 pr-2 cursor-pointer items-center hover:bg-var-2 duration-200" to="/settings" >
                        <p className="w-fit pr-4">Settings</p>
                        <SettingsIcon className="mx-4" fontSize="large" /> 
                    </Link>}

                    <div className="flex justify-between h-fit w-full py-5 pl-5 pr-2 cursor-pointer items-center hover:bg-var-2 duration-200" onClick={onClose}>
                        <p className="w-fit pr-4" onClick={onClose}>Hide</p>
                        <button onClick={onClose}>
                            <OutputIcon className="mx-4" fontSize="large" /> 
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )

    if (open) {
        return createPortal(menu, document.body)
    } else {
        null
    }
};