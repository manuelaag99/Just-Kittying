import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { Link } from "react-router-dom";

export default function PostThumbnail ({ index, key, post, userId }) {
    const [arePostLikesVisible, setArePostLikesVisible] = useState(false);
    const [postPhoto, setPostPhoto] = useState();
    async function fetchPostPhoto () {
        try {
            // const { data, error } = await supabase.storage.from("public-bucket").getPublicUrl("jk-images/" + post.post_photo_path);
            const { data, error } = await supabase.storage.from("jk-images").getPublicUrl("postPics/" + post.post_photo_path);
            if (error) console.log(error);
            setPostPhoto(data.publicUrl);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPostPhoto();
    }, [])

    return (
        <Link key={index} className="flex justify-center items-center w-1/2 aspect-square relative " to={"/post/" + post.post_id} onMouseOver={() => setArePostLikesVisible(true)} onMouseOut={() => setArePostLikesVisible(false)} state={{ posts: post, user_id: userId }}>
            <img className="w-full h-full object-cover hover:opacity-60 duration-200 cursor-pointer" src={postPhoto} alt="post-photo" />
                {/* {arePostLikesVisible && <div className="flex flex-row absolute top-[45%] text-white font-bold shadow-2xl" onMouseOver={() => setArePostLikesVisible(true)} onMouseOut={() => setArePostLikesVisible(false)}>
                    <FavoriteIcon className="" size="large" />
                    <p>4</p>
                </div>} */}
        </Link>
    )
}