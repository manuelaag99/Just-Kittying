import React from "react";

import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Menu() {
    return (
        <div>
            <LightModeIcon className="mx-4" fontSize="large" />
            <HomeIcon className="mx-4" fontSize="large" />
            <PersonIcon className="mx-4" fontSize="large" />
            <SettingsIcon className="mx-4" fontSize="large" /> 
        </div>
    )
};