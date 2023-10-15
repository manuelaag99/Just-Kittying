import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostThumbnail from "./PostThumbnail";

export default function PostsGrid ({ postsArray, userId }) {
    const [arePostLikesVisible, setArePostLikesVisible] = useState(false);

    if (!postsArray || postsArray.length === 0) {
        return (
            <div className="flex justify-center mt-5">
                <p className="text-gray-400 text-center">
                    No posts to show.
                </p>
            </div>
        )
    } else {
        return (
            <div>
                <div className="flex w-full">
                    {postsArray.map((post, index) => {
                        return (
                            <PostThumbnail index={index} key={index} post={post} userId={userId} />
                        )
                    })}
                </div>
            </div>
        )
    }
};