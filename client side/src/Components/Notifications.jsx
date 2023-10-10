import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import LoadingSpinner from "./Portals/LoadingSpinner";

import Notification from "./Notification";

export default function Notifications ({ userId }) {
    const [notifications, setNotifications] = useState();
    const [friendRequests, setFriendRequests] = useState();
    const [commentNotifs, setCommentNotifs] = useState();

    async function fetchUserRequests() {
        try {
            const { data, error } = await supabase.from("jk-friend-requests").select("*").eq("request_receiver_id", userId).eq("request_status", "pending");
            if (error) console.log(error);
            console.log(data)
            setFriendRequests(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchCommentNotifications () {
        try {
            const { data, error } = await supabase.from("jk-comments").select("*").eq("comment_post_creator_id", userId);
            if (error) console.log(error);
            setCommentNotifs(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserRequests();
        fetchCommentNotifications();
    }, [])

    console.log(friendRequests)
    console.log(commentNotifs)

    if (!friendRequests || !commentNotifs) {
        return (
            <LoadingSpinner open={true} />
        )
    } else {
        return (
            <div className="flex flex-col justify-center mx-auto w-full sm:w-6/10 bg-white sm:m-top-margin-dsk m-top-margin-mob">
                {friendRequests && (friendRequests.length > 0) && friendRequests.map((friendRequest, index) => {
                    return (<Notification key={index} index={index} friendRequest={friendRequest} />)
                })}
                {commentNotifs && (commentNotifs.length > 0) && commentNotifs.map((commentNotif, index) => {
                    return (<Notification key={index} index={index} commentNotif={commentNotif} />)
                })}
                {(friendRequests.length < 1) && (commentNotifs.length < 1) && <div className="flex justify-center mt-4 px-5">
                    <p className="text-center text-black">
                        No notifications.
                    </p>
                </div>}
            </div>
        )
    }
}