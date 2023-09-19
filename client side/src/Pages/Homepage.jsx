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

    // const [users, setUsers] = useState();
    // async function fetchUsers() {
    //     try {
    //         const { data, error } = await supabase.from("jk-users").select("*");
    //         if (error) console.log(error);
    //         setUsers(data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // const [timelinePosts, setTimelinePosts] = useState();
    // async function fetchPosts() {
    //     try {
    //         const { data, error } = await supabase.from("jk-posts").select("*");
    //         if (error) console.log(error);
    //         setTimelinePosts(data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     fetchUsers();
    //     fetchPosts();
    // }, [])

    return (
        <div className="bg-var-1 w-full h-full">
            <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent userId={user_id} />}/>
            {!userIsLoggedIn && <NavigationBar navPosition=" fixed bottom-0 " navBackgColor=" bg-var-3 " content={<NavBottomContent />}/>}
            <TimeLine userId={user_id} />
        </div>
    )
};