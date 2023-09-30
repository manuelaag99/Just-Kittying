import React, { useEffect, useState } from "react";

import LoadingSpinner from "./Portals/LoadingSpinner";
import Post from "./Post";

import { COMMENTS } from "../HARDCODED INFO";
import { POSTS } from "../HARDCODED INFO";
import { USERS } from "../HARDCODED INFO";
import { supabase } from "../supabase/client";

export default function TimeLine ({ posts, userId, users }) {
    // fetch posts (based on if its logged in or not, and if it is logged in then based on their preferences)
    // fetch users 
    // fetch comments
    // map the posts to their corresponding comments
    // map the posts to their corresponding users' display names 
    


    // let TIMELINECONTENT = POSTS;
    // useEffect(() => {
    //     TIMELINECONTENT.map((post) => {
    //         USERS.map((user) => {
    //             if (user.user_id === post.post_creator_id) {
    //                 return [post.creator_display_name = user.displayName, post.creator_profile_pic_url = user.profile_pic_url]
    //             }
    //         })
    //     })

    //     COMMENTS.map((comment) => {
    //         USERS.map((user) => {
    //             if (user.user_id === comment.comment_creator_id) {
    //                 return comment.creator_display_name = user.displayName
    //             }
    //         })
    //     })

    //     TIMELINECONTENT.map((post) => {
    //         COMMENTS.map((comment) => {
    //             if (post.post_id === comment.comment_post_id) {
    //                 if (!post.comments) post.comments = [];
    //                 // if (!post.comments.includes(comment.comment_id)) {
    //                     return post.comments.push(comment);
    //                 // }
    //             }
    //         })
    //     })
    //     setTimelineContent(TIMELINECONTENT)
    // }, [])
    
    async function updatePosts () {
        fetchPosts();
    }

    if (posts) {
        return (<LoadingSpinner open={true} />)
    } else if (posts) {
        return (
            <div className="w-full h-full sm:mt-top-margin-dsk mt-top-margin-mob">
                <div className="sm:w-2/3 w-95 mx-auto bg-var-1 h-fit pb-[120px] ">
                    <div>
                        {posts && posts.map((post, index) => {
                            return <Post fetchAgain={updatePosts} key={index} post={post} postCreatorId={post.post_creator_id} postCreationDate={post.post_creation_date} postDescription={post.post_caption} postId={post.post_id} postImageUrl={post.post_photo_url} userId={userId} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
};