import { useState } from "react";
import UsersList from "../Components/UsersList";
import PostsGrid from "../Components/PostsGrid";

export default function SearchResultsPage ({ searchQuery, searchResultsInPosts, searchResultsInUsers, userId}) {
    const usersTab = "friends"
    const postsTab = "posts"
    const [tabsSection, setTabsSection] = useState(postsTab);
    console.log(searchResultsInUsers)


    return (
        <div className="flex flex-col w-full mt-2">
            <div className="flex flex-row mt-16 sm:mt-20">
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
                {(tabsSection === postsTab) && <PostsGrid postsArray={searchResultsInPosts} />}
                {(tabsSection === usersTab) && <UsersList selectedUsersArray={searchResultsInUsers} userId={userId} />}
            </div>
        </div>
    )
}