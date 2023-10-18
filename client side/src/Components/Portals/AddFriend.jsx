import { useEffect, useState } from "react";
import MessageWindow from "./MessageWindow";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../supabase/client";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import RoundPhoto from "../RoundPhoto";

export default function AddFriend ({ onClose, open, userId, userToAddId }) {

    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
    const [isMessageWindowForAnError, setIsMessageWindowForAnError] = useState();
    
    const [userInfo, setUserInfo] = useState();
    async function fetchUserInfo () {
        try {
            const { data, error } = await supabase.from("jk-users").select().eq("user_id", userToAddId);
            if (error) console.log(error);
            setUserInfo(data[0]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    const [requestMessage, setRequestMessage] = useState();
    let friend_request_id;
    async function sendFriendRequest () {
        friend_request_id = uuidv4();
        try {
            const { error } = await supabase.from("jk-friend-requests").insert({ request_id: friend_request_id, request_sender_id: userId, request_receiver_id: userToAddId, request_status: "pending", request_message: requestMessage })
            if (error) console.log(error);
            if (!error) {
                setTextForMessageWindow("Successfully sent a request.");
                setIsMessageWindowOpen(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    function inputChangeHandle (e) {
        setRequestMessage(e.target.value)
    }

    function closeMessageWindow () {
        if (textForMessageWindow === "Successfully sent a request.") {
            setIsMessageWindowOpen(false)
            onClose();
        }
    }

    const addFriend = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 left-0 w-screen h-screen z-20"></div>
            <MessageWindow isErrorMessage={isMessageWindowForAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
            <div className="flex flex-col fixed justify-center items-center z-30 sm:left-[25%] left-[5%] sm:w-5/10 w-9/10 h-fit bg-var-1 rounded-button text-signInOrsignUpMob sm:text-signInOrsignUpDsk duration-500 ">
				<div className="flex flex-row justify-around items-center w-full h-fit max-h-24 px-5 pt-5 pb-2 ">
                    <div className="flex w-15 h-full ">
                        <RoundPhoto classesForRoundPhoto=" aspect-square h-full " imageAlt="user-photo" imageSource={null} photoPath={null} />
                    </div>
                    <div className="flex w-85 px-2">
                        {!userInfo && <div className="rounded-button bg-gray-600 w-5/10 h-4"></div>}
                        {userInfo && <p className="text-left">Do you want to add a message to your friend request to {userInfo.display_name}?</p>}
                    </div>
				</div>
				<div className="flex flexrow justify-around w-85 py-4">
					<input className="w-9/10 h-fit py-2 px-2 mr-3 " onChange={inputChangeHandle} placeholder="Add a message (optional)..." type="text" value={requestMessage} />
					<button className="aspect-square w-fit rounded-circular p-2 cursor-pointer bg-var-3 hover:bg-var-3-hovered duration-200" onClick={sendFriendRequest}>
                        <SendRoundedIcon className="text-var-1" />
                    </button>
				</div>
			</div>
        </div>
    )

    if (open) {
        return addFriend;
    } else {
        return null;
    }
}