import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import LoadingSpinner from "./Portals/LoadingSpinner";

import Notification from "./Notification";

export default function Notifications ({ userId }) {

    console.log(userId)
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

    async function fetchCommentNotifications () {
        try {
            const { data, error } = await supabase.from("jk-comments").select("*").eq("comment_post_creator_id", userId);
            if (error) console.log(error);
            setNotifications(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserRequests();
        fetchCommentNotifications();
    }, [])

    if (!notifications) {
        return (
            <LoadingSpinner open={true} />
        )
    } else {
        return (
            <div className="flex justify-center mx-auto w-full sm:w-6/10 bg-white sm:m-top-margin-dsk m-top-margin-mob">
                {notifications && (notifications.length > 0) && notifications.map((notification, index) => {
                    if (notification.request_status === "pending") {
                        return (<Notification index={index} notification={notification} />)
                    }
                })}
                {notifications && (notifications.length === 0) && <div className="flex justify-center mt-4 px-5">
                    <p className="text-center text-black">
                        No notifications.
                    </p>
                </div>}
            </div>
        )
    }
}