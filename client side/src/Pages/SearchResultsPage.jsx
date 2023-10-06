import { useEffect, useState } from "react";
import UsersList from "../Components/UsersList";
import PostsGrid from "../Components/PostsGrid";
import { useSearch } from "../context/SearchQueryContext";
import { supabase } from "../supabase/client";
import MessageWindow from "../Components/Portals/MessageWindow";
import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import NavBottomContent from "../Components/NavBottomContent";
import LoadingSpinner from "../Components/Portals/LoadingSpinner";

export default function SearchResultsPage () {
    let user_id = "19ae918c-8adb-44e2-8456-f24ff1e85d59"
    const userIsLoggedIn = false; //remove 
    const usersTab = "friends"
    const postsTab = "posts"
    const [tabsSection, setTabsSection] = useState(postsTab);

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
    }, [])

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

    const { searchQuery, setSearchQuery } = useSearch();
    const [searchResultsInUsers, setSearchResultsInUsers] = useState();
    const [searchResultsInPosts, setSearchResultsInPosts] = useState();

    function sendSearchQueryToSearchResultsPage () {
        setSearchQuery(searchQuery);
        if (searchQuery) {
            if (searchQuery.trim() !== "") {
                const filteredUsers = users.filter(user => (user.username.includes(searchQuery)) || (user.display_name.includes(searchQuery)) || (searchQuery.includes(user.username)) || (searchQuery.includes(user.display_name))).map(user => user.user_id);
                if (filteredUsers.length < 1) {
                    setSearchResultsInUsers([]);
                } else {
                    setSearchResultsInUsers(filteredUsers);
                }
                const filteredPosts = posts.filter(post => (post.post_caption.includes(searchQuery)) || (searchQuery.includes(post.post_caption)));
                if (filteredPosts.length < 1) {
                    setSearchResultsInPosts([]);
                } else {
                    setSearchResultsInPosts(filteredPosts);
                }
            } else {
                setSearchResultsInUsers([]);
                setSearchResultsInPosts([]);
            }
        } else {
            setSearchResultsInUsers([]);
            setSearchResultsInPosts([]);
        }
    }

    useEffect(() => {
        if (users && posts) {
            sendSearchQueryToSearchResultsPage();
        }
    }, [users, posts, searchQuery])

    console.log(searchResultsInUsers)
    console.log(searchResultsInPosts)

    if (!posts || !users) {
        return (
            <LoadingSpinner open={true} />
        )
    } else {
        return (
            <div className="bg-var-1 w-full h-full">
                <MessageWindow isErrorMessage={isTextMessageAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
                <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent userId={user_id} />} />
                {!userIsLoggedIn && <NavigationBar navPosition=" fixed bottom-0 " navBackgColor=" bg-var-3 " content={<NavBottomContent />} />}
                <div className="flex flex-col w-full mt-2 justify-center">
                    <div className="flex flex-row w-full sm:w-3/5 mt-16 mx-auto sm:mt-20">
                        <button className="w-1/2 bg-var-1 h-[40px] " onClick={() => setTabsSection(postsTab)} >Posts</button>
                        <button className="w-1/2 bg-var-1 h-[40px] " onClick={() => setTabsSection(usersTab)} >Users</button>
                    </div>
                    <div className="flex w-full sm:w-3/5 mx-auto">
                        {(tabsSection === postsTab) && <div className="flex flex-row w-full">
                            <div className="w-1/2 bg-var-1-dark h-[3px]"></div>
                            <div className="w-1/2 bg-var-1 h-[3px]"></div>
                        </div>}
                        {(tabsSection === usersTab) && <div className="flex flex-row w-full">
                            <div className="w-1/2 bg-var-1 h-[3px]"></div>
                            <div className="w-1/2 bg-var-1-dark h-[3px]"></div>
                        </div>}
                    </div>
    
                    {searchResultsInUsers && searchResultsInPosts && <div className="flex flex-col w-full sm:w-3/5 mx-auto">
                        {(tabsSection === postsTab) && <PostsGrid postsArray={searchResultsInPosts} />}
                        {(tabsSection === usersTab) && <UsersList selectedUsersArray={searchResultsInUsers} userId={user_id} />}
                    </div>}
                    
                    {!searchResultsInUsers || !searchResultsInPosts && <div className="flex flex-col w-full">
                        <LoadingSpinner open={true} />
                    </div>}
                </div>
            </div>
        )
    }
}