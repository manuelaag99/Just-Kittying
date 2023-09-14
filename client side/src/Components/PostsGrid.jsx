import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function PostsGrid ({ postsArray }) {
    const [arePostLikesVisible, setArePostLikesVisible] = useState(false);

    return (
        <div>
            <div className="flex w-full">
                {postsArray.map((post, index) => {
                return <div key={index} className="flex justify-center items-center w-1/2 aspect-square relative " onMouseOver={() => setArePostLikesVisible(true)} onMouseOut={() => setArePostLikesVisible(false)}>
                    <img className="w-full h-full object-cover hover:opacity-60 duration-200 cursor-pointer" src={post.post_photo_url} alt="post-photo" />
                    {/* {arePostLikesVisible && <div className="flex flex-row absolute top-[45%] text-white font-bold shadow-2xl" onMouseOver={() => setArePostLikesVisible(true)} onMouseOut={() => setArePostLikesVisible(false)}>
                        <FavoriteIcon className="" size="large" />
                        <p>4</p>
                    </div>} */}
                </div>})}
            </div>
        </div>
    )
};