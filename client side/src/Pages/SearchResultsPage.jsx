import { useEffect, useState } from "react"
import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import UsersList from "../Components/UsersList";
import PostsGrid from "../Components/PostsGrid";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import MessageWindow from "../Components/Portals/MessageWindow";

export default function SearchResultsPage () {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    let user_id = "19ae918c-8adb-44e2-8456-f24ff1e85d59"

    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
    const [doesUserHaveDisplayName, setDoesUserHaveDisplayName] = useState();
    const [isTextMessageAnError, setIsTextMessageAnError] = useState();
    async function checkIfUserHasDisplayName () {
        try {
            const { data, error } = await supabase.from("jk-users").select("display_name").eq("user_id", user_id);
            if (error) console.log(error);
            console.log(data)
            if (!error) {
                if (data[0].display_name === "") {
                    setDoesUserHaveDisplayName(false);
                    setTextForMessageWindow("Your account doesn't have a display name; you will be redirected to the Settings page.");
                    setIsMessageWindowOpen(true);
                    console.log("no display name");
                } else {
                    setDoesUserHaveDisplayName(true);
                }
            }
        } catch (err) {
            console.log(err)
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

    const usersTab = "friends"
    const postsTab = "posts"
    const [tabsSection, setTabsSection] = useState(postsTab);

    return (
        <div className="flex flex-col w-full mt-2">
            <MessageWindow isErrorMessage={isTextMessageAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent />}/>
            <div className="flex flex-row mt-16 sm:mt-24">
                <button className="w-1/2 bg-var-1 h-[40px] " onClick={() => setTabsSection(postsTab)} >Posts</button>
                <button className="w-1/2 bg-var-1 h-[40px] " onClick={() => setTabsSection(usersTab)} >Users</button>
            </div>
            <div className="flex w-full">
                {(tabsSection === postsTab) && <div className="flex flex-row w-full">
                    <div className="w-1/2 bg-var-1-dark h-[3px]"></div>
                    <div className="w-1/2 bg-var-1 h-[3px]"></div>
                </div>}
                {(tabsSection === usersTab) && <div className="flex flex-row w-full">
                    <div className="w-1/2 bg-var-1 h-[3px]"></div>
                    <div className="w-1/2 bg-var-1-dark h-[3px]"></div>
                </div>}
            </div>
            <div className="flex flex-col w-full">
                <PostsGrid />
                <UsersList />
            </div>
        </div>
    )
}