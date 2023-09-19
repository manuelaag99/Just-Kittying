import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import LoadingSpinner from "./Portals/LoadingSpinner";

import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';

export default function Notifications ({ userId }) {

    const [notifications, setNotifications] = useState();

    async function fetchUserRequests() {
        try {
            const { data, error } = await supabase.from("jk-friend-requests").select("*").eq("request_receiver_id", userId);
            if (error) console.log(error);
            console.log(data)
            setNotifications(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserRequests();
    }, [])

    function acceptRequestHandle () {
        console.log("yeah")
    }

    function denyRequestHandle () {
        console.log("no")
    }

    if (!notifications) {
        return (
            <LoadingSpinner open={true} />
        )
    } else {
        return (
            <div className="w-full bg-white mt-20">
                {notifications && notifications.map((notification, index) => {
                    if (notification.request_status === "pending") {
                        return (
                            <div className="flex flex-col justify-center px-4 py-2 w-full border-b border-gray-400" key={index}>
                                <div className="flex flex-row w-full">
                                    <div className="flex flex-col w-7/10">
                                        <div className="flex w-full">
                                            <p>{notification.request_sender_id} wants to add you as a friend. {notification.request_message &&  '"' + notification.request_message + '"'}</p>
                                        </div>
                                        <div className="text-gray-500 w-full font-light">
                                            {notification.created_at}
                                        </div>
                                    </div>
                                    <button className="flex justify-center items-start w-15 text-black hover:text-gray-300 duration-200 " onClick={acceptRequestHandle}>
                                        <Check fontSize="large" />
                                    </button>
                                    <button className="flex justify-center items-start w-15 text-black hover:text-gray-300 duration-200 " onClick={denyRequestHandle}>
                                        <Close fontSize="large" />
                                    </button>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}