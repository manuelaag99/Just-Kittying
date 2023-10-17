import { useState } from "react";
import MessageWindow from "./MessageWindow";
import { v4 as uuidv4 } from "uuid";

export default function AddFriend ({ onClose, open, userId, userToAddId }) {

    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
    const [isMessageWindowForAnError, setIsMessageWindowForAnError] = useState();
    const [doPasswordsMatch, setDoPasswordsMatch] = useState();

    const [requestMessage, setRequestMessage] = useState();
    let friend_request_id;
    async function addFriend () {
        friend_request_id = uuidv4();
        try {
            const { error } = await supabase.from("jk-friend-requests").insert({ request_id: friend_request_id, request_sender_id: userId, request_receiver_id: userToAddId, request_status: "pending", request_message: requestMessage })
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
    }

    const addFriend = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <MessageWindow isErrorMessage={isMessageWindowForAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
            <div className="flex flex-col fixed justify-center items-center z-30 sm:left-[25%] left-[5%] sm:w-5/10 w-9/10 h-fit bg-var-1 rounded-button  text-signInOrsignUpMob sm:text-signInOrsignUpDsk duration-500 ">
            </div>
        </div>
    )

    if (open) {
        return addFriend;
    } else {
        return null;
    }
}