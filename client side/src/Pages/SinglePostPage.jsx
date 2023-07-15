import React, { useEffect, useState } from "react";

import Post from "../Components/Post";
import { COMMENTS } from "../HARDCODED INFO";
import { POSTS } from "../HARDCODED INFO";
import { USERS } from "../HARDCODED INFO";

export default function SinglePostPage () {
    // fetch specific post 

    const [timelineContent, setTimelineContent] = useState([]);
    let post = timelineContent[0]
    
    let TIMELINECONTENT = POSTS;
    useEffect(() => {
        TIMELINECONTENT.map((post) => {
            USERS.map((user) => {
                if (user.user_id === post.post_creator_id) {
                    return post.creator_display_name = user.displayName;
                }
            })
        })

        COMMENTS.map((comment) => {
            USERS.map((user) => {
                if (user.user_id === comment.comment_creator_id) {
                    return comment.creator_display_name = user.displayName;
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
                }
            })
        })
        setTimelineContent(TIMELINECONTENT)
    }, [])

    console.log(TIMELINECONTENT)
    console.log(post)

    return (
        <div>
            <Post postAuthorDisplayName={post.creator_display_name} postComments={post.comments} postDate={post.post_date} postImageUrl={post.post_photo_url} postNumberOfLikes={post.post_likes.length}/>
        </div>
    )
}