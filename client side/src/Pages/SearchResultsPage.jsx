import { useState } from "react"
import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import UsersList from "../Components/UsersList";
import PostsGrid from "../Components/PostsGrid";

export default function SearchResultsPage () {
    const usersTab = "friends"
    const postsTab = "posts"
    const [tabsSection, setTabsSection] = useState(postsTab);

    return (
        <div className="flex flex-col w-full mt-2">
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