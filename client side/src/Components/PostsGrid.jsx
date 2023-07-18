import React from "react";

export default function PostsGrid ({ postsArray }) {
    return (
        <div>
            <div className="flex w-full">
                {postsArray.map((post, index) => {
                return <div key={index} className="w-1/2 aspect-square h-userProfilePhotosTabPhotoHeight">
                    <img className="w-full h-full object-cover hover:opacity-40 duration-200 cursor-pointer" src={post.post_photo_url} alt="" />
                </div>})}
            </div>
        </div>
    )
};