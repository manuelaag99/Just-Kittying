import React, { useEffect, useState } from "react";

import NavigationBar from "../Components/NavigationBar";
import NavTopContent from "../Components/NavTopContent";
import Post from "../Components/Post";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../Components/Portals/LoadingSpinner";

export default function PostOrPostsPage () {
    const location = useLocation();
    const { posts, user_id } = location.state

    console.log(posts)

    const [postsArray, setPostsArray] = useState([]);

    useEffect(() => {
        if (posts) {
            setPostsArray([...postsArray, posts]);
        }
    }, [])

    console.log(postsArray)

    if (!postsArray) {
        return (<LoadingSpinner open={true} />)
    } else {
        return (
            <div className="w-full h-full sm:mt-top-margin-dsk mt-top-margin-mob">
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