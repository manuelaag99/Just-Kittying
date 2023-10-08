import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import Post from "../Components/Post";

import LoadingSpinner from "../Components/Portals/LoadingSpinner";
import MessageWindow from "../Components/Portals/MessageWindow";

import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabase/client";

export default function PostOrPostsPage () {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { posts, user_id } = location.state

    const [textForMessageWindow, setTextForMessageWindow] = useState("");
    const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
    const [doesUserHaveDisplayName, setDoesUserHaveDisplayName] = useState();
    const [isTextMessageAnError, setIsTextMessageAnError] = useState();
    async function checkIfUserHasDisplayName () {
        if (auth.isLoggedIn) {
            try {
                const { data, error } = await supabase.from("jk-users").select("display_name").eq("user_id", auth.uId);
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

    const [postsArray, setPostsArray] = useState([]);

    useEffect(() => {
        if (posts) {
            setPostsArray([...postsArray, posts]);
        }
    }, [])

    if (!postsArray) {
        return (<LoadingSpinner open={true} />)
    } else {
        return (
            <div className="w-full h-full sm:mt-top-margin-dsk mt-top-margin-mob">
                <MessageWindow isErrorMessage={isTextMessageAnError} onClose={closeMessageWindow} open={isMessageWindowOpen} textForMessage={textForMessageWindow} />
                <NavigationBar navPosition=" fixed top-0 " navBackgColor=" bg-var-1 " content={<NavTopContent />}/>
                <div className="sm:w-1/2 w-95 h-fit mx-auto py-4 bg-var-1 ">
                    {postsArray && <div>
                        {postsArray.map((post, index) => {
                            return <Post classnames=" mt-2 mb-6 " key={index} post={post} postCreatorId={post.post_creator_id} postCreationDate={post.post_creation_date} postDescription={post.post_caption} postId={post.post_id} postImageUrl={post.post_photo_url} userId={user_id} />
                        })}
                    </div>}
                </div>
            </div>
        )
    }
};