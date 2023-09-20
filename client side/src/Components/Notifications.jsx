import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import LoadingSpinner from "./Portals/LoadingSpinner";

import { v4 as uuidv4 } from 'uuid';
import Notification from "./Notification";

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

    if (!notifications) {
        return (
            <LoadingSpinner open={true} />
        )
    } else {
        return (
            <div className="flex justify-center mx-auto w-full sm:w-6/10 bg-white ">
                {notifications && notifications.map((notification, index) => {
                    if (notification.request_status === "pending") {
                        return (<Notification index={index} notification={notification} />)
                    }
                })}
            </div>
        )
    }
}