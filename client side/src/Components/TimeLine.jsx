import React from "react";

import Post from "./Post";

export default function TimeLine () {
    // fetch posts (based on if its logged in or not, and if it is logged in then based on their preferences)
    // fetch users 
    // fetch comments
    // map the posts to their corresponding comments
    // map the posts to their corresponding users' display names 



    const POSTS = [
        {
            post_id: "098j094jjk98j0kj98h9r4",
            post_creator_id: "a4ad98h379hdf48fgh1",
            post_date: "2023-09-09",
            post_photo_url: "https://previews.123rf.com/images/points/points1607/points160700039/61955527-the-small-black-white-kitten-on-a-white-background.jpg",
            post_likes: 4,
            post_description: "Shes my cat"
        },
        {
            post_id: "893eg365s7hjvfbvbxhnsm",
            post_creator_id: "0994e89e03ie3830e90",
            post_date: "2022-12-09",
            post_photo_url: "https://previews.123rf.com/images/points/points1607/points160700039/61955527-the-small-black-white-kitten-on-a-white-background.jpg",
            post_likes: 10,
            post_description: "I love her"
        }
    ]
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