import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import LoadingSpinner from "./Portals/LoadingSpinner";

export default function PostsGrid ({ postsArray, userId }) {
    const [arePostLikesVisible, setArePostLikesVisible] = useState(false);
    console.log(postsArray)

    if (!postsArray) {
        return (<LoadingSpinner open={true} />)
    } else {
        return (
            <div>
                <div className="flex w-full">
                    {postsArray.map((post, index) => {
                    return <Link key={index} className="flex justify-center items-center w-1/2 aspect-square relative " to={"/post/" + post.post_id} onMouseOver={() => setArePostLikesVisible(true)} onMouseOut={() => setArePostLikesVisible(false)} state={{ posts: post, user_id: userId }}>
                        <img className="w-full h-full object-cover hover:opacity-60 duration-200 cursor-pointer" src={post.post_photo_url} alt="post-photo" />
                        {/* {arePostLikesVisible && <div className="flex flex-row absolute top-[45%] text-white font-bold shadow-2xl" onMouseOver={() => setArePostLikesVisible(true)} onMouseOut={() => setArePostLikesVisible(false)}>
                            <FavoriteIcon className="" size="large" />
                            <p>4</p>
                        </div>} */}
                    </Link>})}
                </div>
            </div>
        )
    }
};