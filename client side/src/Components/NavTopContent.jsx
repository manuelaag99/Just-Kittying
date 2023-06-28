import React from "react";
import PersonIcon from '@mui/icons-material/Person';

export default function NavTopContent () {
    return (
        <form className="flex flex-row h-full w-full sm:p-4 justify-evenly items-center">
            <div className="sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto">

            </div>
            <div className="sm:w-1/2 w-3/5 sm:h-full h-3/4 my-auto">
                <input className="bg-var-1 border-solid border-2 border-var-2 w-full h-full outline-none rounded-full pl-6 pr-14"/>            
                <button></button>
            </div>
            <div className="sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto">
                <PersonIcon />
            </div>
        </form>
    )
};