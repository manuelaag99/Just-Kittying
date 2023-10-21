import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import Notifications from "../Components/Notifications";

import MessageWindow from "../Components/Portals/MessageWindow";

import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabase/client";

export default function NotificationsPage({}) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { user_id } = location.state;

    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
    const [doesUserHaveDisplayName, setDoesUserHaveDisplayName] = useState();
    const [isTextMessageAnError, setIsTextMessageAnError] = useState();
    async function checkIfUserHasDisplayName () {
        if (auth.isLoggedIn) {
            try {
                const { data, error } = await supabase.from("jk-users").select("display_name").eq("user_id", auth.userId);
                if (error) console.log(error);
                if (!error) {
                    if (data[0].display_name === "") {
                        setDoesUserHaveDisplayName(false);
                        setTextForMessageWindow("Your account doesn't have a display name; you will be redirected to the Settings page.");
                        setIsMessageWindowOpen(true);
                    } else {
                        setDoesUserHaveDisplayName(true);
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    function closeMessageWindow () {
        if (!doesUserHaveDisplayName) {
            navigate("/settings");
        }
        setIsMessageWindowOpen(false);
    }

    useEffect(() => {
        checkIfUserHasDisplayName();
    }, [])

    return (
        <div className="flex justify-center w-full bg-white">
            <MessageWindow isErrorMessage={isTextMessageAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent isHomePage={false} userId={user_id} />}/>
            <Notifications userId={user_id} />
        </div>
    )
}