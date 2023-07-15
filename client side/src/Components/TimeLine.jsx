import React from "react";

import Post from "./Post";

import { COMMENTS } from "../HARDCODED INFO";
import { POSTS } from "../HARDCODED INFO";
import { USERS } from "../HARDCODED INFO";

export default function TimeLine () {
    // fetch posts (based on if its logged in or not, and if it is logged in then based on their preferences)
    // fetch users 
    // fetch comments
    // map the posts to their corresponding comments
    // map the posts to their corresponding users' display names 

    return (
        <div className="w-full h-full sm:mt-top-margin-dsk mt-top-margin-mob">
            <div className="sm:w-1/2 w-95 mx-auto bg-var-1 h-[1500px] ">
                <div>
                {POSTS.map((post, index) => {
                    return <Post key={index} numberOfLikes={post.post_likes} />
                })}
                    <Post numberOfLikes="2" />
                    <Post numberOfLikes={null} />
                </div>
            </div>
        </div>
    )
};