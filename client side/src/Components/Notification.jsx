import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import { supabase } from '../supabase/client';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Notification ({ commentNotif, friendRequest, index }) {
    if (commentNotif) console.log(commentNotif)
    const [userInfo, setUserInfo] = useState();
    async function fetchUserInfo () {
        if (friendRequest) {
            try {
                const { data, error } = await supabase.from("jk-users").select("*").eq("user_id", friendRequest.request_receiver_id);
                console.log(data)
                if (error) console.log(error);
                setUserInfo(data[0]);
            } catch (err) {
                console.log(err);
            }
        } else if (commentNotif) {
            try {
                const { data, error } = await supabase.from("jk-users").select("*").eq("user_id", commentNotif.comment_creator_id);
                console.log(data)
                if (error) console.log(error);
                setUserInfo(data[0]);
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    let friendship_id;
    async function acceptRequestHandle (notification) {
        console.log(notification)
        friendship_id = uuidv4();
        try {
            const { error } = await supabase.from("jk-friends").insert({ friendship_id: friendship_id, user_1_id: userId, user_2_id: notification.request_sender_id });
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        try {
            const { error } = await supabase.from("jk-friend-requests").update({ request_status: "accepted" }).eq("request_id", notification.request_id);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        fetchUserRequests();
    }

    async function denyRequestHandle (notification) {
        try {
            const { error } = await supabase.from("jk-friend-requests").update({ request_status: "denied" }).eq("request_id", notification.request_id);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(userInfo)

    if (!userInfo) {
        <div className="flex flex-col justify-center px-4 py-2 w-full border-b border-gray-400 mx-auto" key={index}>
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-7/10">
                    <div className="w-full h-12 rounded-post bg-gray-800"></div>
                    <div className="w-full h-12 rounded-post bg-gray-500"></div>
                </div>
            </div>
        </div>
    } else {
        if (friendRequest) {
            return (
                <div className="flex flex-col justify-center px-4 py-2 w-full border-b border-gray-400 mx-auto" key={index}>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col w-7/10">
                            <div className="flex w-full">
                                {friendRequest && <p>{userInfo.display_name} wants to add you as a friend. {friendRequest.request_message &&  '"' + friendRequest.request_message + '"'}</p>}
                            </div>
                            <div className="text-gray-500 w-full font-light">
                                {friendRequest && friendRequest.created_at}
                            </div>
                        </div>
                        <button className="flex justify-center items-start w-15 text-black hover:text-gray-300 duration-200 " onClick={() => acceptRequestHandle(friendRequest)}>
                            <Check fontSize="large" />
                        </button>
                        <button className="flex justify-center items-start w-15 text-black hover:text-gray-300 duration-200 " onClick={() => denyRequestHandle(friendRequest)}>
                            <Close fontSize="large" />
                        </button>
                    </div>
                </div>
            )
        } else if (commentNotif) {
            return (
                <div className="flex flex-col justify-center px-4 py-2 w-full border-b border-gray-400 mx-auto" key={index}>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col w-9/10">
                            <div className="flex w-full">
                                {commentNotif && <p>{userInfo.display_name} has commented on your post. {'"' + commentNotif.comment_text + '"'}</p>}
                            </div>
                            <div className="text-gray-500 w-full font-light">
                                {commentNotif && commentNotif.comment_date}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}