import React, { useEffect, useState } from "react";

import NavigationBar from "../Components/NavigationBar";
import NavBottomContent from "../Components/NavBottomContent";
import NavTopContent from "../Components/NavTopContent";
import TimeLine from "../Components/TimeLine";
import UserProfile from "./UserProfilePage";
import { supabase } from "../supabase/client";

export default function HomePage ({ }) {
    let user_id = "74rh4889wh36d7g389shd"
    const userIsLoggedIn = false; //remove 

    const [timelinePosts, setTimelinePosts] = useState();

    async function fetchPosts() {
        try {
            const { data, error } = await supabase.from("jk-posts").select("*");
            if (error) console.log(error);
            setTimelinePosts(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    console.log(timelinePosts)

    return (
        <div className="bg-var-1 w-full h-full">
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent />}/>
            {!userIsLoggedIn && <NavigationBar navPosition=" fixed bottom-0 " navBackgColor=" bg-var-3 " content={<NavBottomContent />}/>}
            <TimeLine posts={timelinePosts} userId={user_id} />
        </div>
    )
};