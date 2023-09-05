import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function PostsGrid ({ postsArray }) {
    const [arePostLikesVisible, setArePostLikesVisible] = useState(false);

    return (
        <div>
            <div className="flex w-full">
                {postsArray.map((post, index) => {
                return <div key={index} className="flex justify-center items-center w-1/2 aspect-square relative " onMouseOver={() => setArePostLikesVisible(true)} onMouseOut={() => setArePostLikesVisible(false)}>
                    <img className="w-full h-full object-cover hover:opacity-40 duration-200 cursor-pointer" src={post.post_photo_url} alt="post-photo" />
                    {arePostLikesVisible && <p className="absolute top-0 shadow-lg text-white">
                        <FavoriteIcon className="" size="large" />
                    </p>}
                </div>})}
            </div>
        </div>
    )
};