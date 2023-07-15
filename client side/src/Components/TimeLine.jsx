import React, { useEffect, useState } from "react";

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
    
    const [timelineContent, setTimelineContent] = useState([]);
    
    let TIMELINECONTENT = POSTS;
    useEffect(() => {
        TIMELINECONTENT.map((post) => {
            USERS.map((user) => {
                if (user.user_id === post.post_creator_id) {
                    return post.creator_display_name = user.displayName;
                }
            })
        })

        TIMELINECONTENT.map((post) => {
            COMMENTS.map((comment) => {
                if (post.post_id === comment.comment_post_id) {
                    if (!post.comments) post.comments = [];             
                    if (!post.comments.includes([comment.comment_id])) {
                        return post.comments.push(comment);
                    }
                    // if (!post.comments.includes(comment.comment_id)) {
                    //     console.log("added comment");
                    //     post.comments.push(comment);
                    // }
                }
            })
        })
    }, [])

    console.log(TIMELINECONTENT)

    return (
        <div className="w-full h-full sm:mt-top-margin-dsk mt-top-margin-mob">
            <div className="sm:w-1/2 w-95 mx-auto bg-var-1 h-[1500px] ">
                <div>
                {TIMELINECONTENT.map((post, index) => {
                    return <Post key={index} numberOfLikes={post.post_likes.length} />
                })}
                    <Post numberOfLikes="2" />
                    <Post numberOfLikes={null} />
                </div>
            </div>
        </div>
    )
};