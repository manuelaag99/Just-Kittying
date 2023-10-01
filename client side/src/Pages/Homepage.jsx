import React, { useEffect, useState } from "react";

import NavigationBar from "../Components/NavigationBar";
import NavBottomContent from "../Components/NavBottomContent";
import NavTopContent from "../Components/NavTopContent";
import TimeLine from "../Components/TimeLine";
import { supabase } from "../supabase/client";
import MessageWindow from "../Components/Portals/MessageWindow";
import { useNavigate } from "react-router-dom";
import SearchResultsPage from "./SearchResultsPage";

export default function HomePage ({ }) {
    const navigate = useNavigate();
    let user_id = "19ae918c-8adb-44e2-8456-f24ff1e85d59"
    const userIsLoggedIn = false; //remove 

    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
    const [doesUserHaveDisplayName, setDoesUserHaveDisplayName] = useState();
    const [isTextMessageAnError, setIsTextMessageAnError] = useState();
    async function checkIfUserHasDisplayName () {
        try {
            const { data, error } = await supabase.from("jk-users").select("display_name").eq("user_id", user_id);
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

    useEffect(() => {
        checkIfUserHasDisplayName();
    })

    function closeMessageWindow () {
        if (!doesUserHaveDisplayName) {
            navigate("/settings");
        }
        setIsMessageWindowOpen(false);
    }

    const [users, setUsers] = useState();
    async function fetchUsers() {
        try {
            const { data, error } = await supabase.from("jk-users").select("*");
            if (error) console.log(error);
            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }

    const [posts, setPosts] = useState();
    async function fetchPosts() {
        try {
            const { data, error } = await supabase.from("jk-posts").select("*");
            if (error) console.log(error);
            setPosts(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchPosts();
    }, [])

    const [homePageContent, setHomePageContent] = useState("timeline");
    const [searchQuery, setSearchQuery] = useState();

    const [searchResultsInUsers, setSearchResultsInUsers] = useState();
    const [searchResultsInPosts, setSearchResultsInPosts] = useState();

    function sendSearchQueryToSearchResultsPage (searchQueryState) {
        setSearchQuery(searchQueryState);
        setHomePageContent("search");
        const filteredUsers = users.map((user) => {
            if (user.username.includes(searchQuery)) {
                console.log(user.user_id)
                return user.user_id;
            } else if (user.display_name.includes(searchQuery)) {
                console.log(user.user_id)
                return user.user_id;
            } else if (searchQuery.includes(user.username)) {
                console.log(user.user_id)
                return user.user_id;
            } else if (searchQuery.includes(user.display_name)) {
                console.log(user.user_id)
                return user.user_id;
            }
        })
        setSearchResultsInUsers(filteredUsers);
        const filteredPosts = posts.filter((post) => {
            if (post.post_caption.includes(searchQuery)) {
                return post;
            } else if (searchQuery.includes(post.post_caption)) {
                return post;
            }
        })
        setSearchResultsInPosts(filteredPosts);
    }
    
    console.log(searchResultsInUsers)

    return (
        <div className="bg-var-1 w-full h-full">
            <MessageWindow isErrorMessage={isTextMessageAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent sendSearchQuery={(searchQueryState) => sendSearchQueryToSearchResultsPage(searchQueryState)} userId={user_id} />}/>
            {!userIsLoggedIn && <NavigationBar navPosition=" fixed bottom-0 " navBackgColor=" bg-var-3 " content={<NavBottomContent />}/>}
            {homePageContent === "timeline" && <TimeLine posts={posts} users={users} userId={user_id} />}
            {homePageContent === "search" && <SearchResultsPage searchQuery={searchQuery} searchResultsInPosts={searchResultsInPosts} searchResultsInUsers={searchResultsInUsers} userId={user_id} />}
        </div>
    )
};