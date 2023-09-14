import React, { useEffect, useRef, useState } from "react";

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import filterArrayByUniqueByKey from "../functions";
import CreateOrUpdatePost from "./Portals/CreateOrUpdatePost";
import RoundPhoto from "./RoundPhoto";
import PostPhoto from "./PostPhoto";
import { supabase } from "../supabase/client";
import { v4 as uuidv4 } from "uuid";
import LoadingPost from "./LoadingPost";
import Comment from "./Comment";

export default function Post ({ fetchAgain, postCreationDate, postCreatorId, postDescription, postId, postImageUrl, userId }) {

    const [postUserData, setPostUserData] = useState();
    async function fetchPostUserData () {
        try {
            const { data, error } = await supabase.from("jk-users").select().eq("user_id", postCreatorId)
            if (error) console.log(error);
            setPostUserData(data[0]);
        } catch (err) {
            console.log(err);
        }
    }

    const [favorite, setFavorite] = useState(false)
    function favoriteButtonHandle () {
        setFavorite(prevValue => !prevValue)
        fetchPostLikes();
    }

    const [postLikes, setPostLikes] = useState();
    async function fetchPostLikes () {
        try {
            const { data, error } = await supabase.from("jk-likes").select("*").eq("like_post_id", postId);
            if (error) console.log(error);
            setPostLikes(data);
        } catch (err) {
            console.log(err);
        }
    }

    const [comments, setComments] = useState([])
    async function fetchPostComments () {
        try {
            const { data, error } = await supabase.from("jk-comments").select("*").eq("comment_post_id", postId);
            if (error) console.log(error);
            setComments(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // setComments(filterArrayByUniqueByKey(postComments, "comment_id"))
        fetchPostUserData();
        fetchPostLikes();
        fetchPostComments();
    }, [])

    // useEffect(() => {
    //     if (postLikes) {
    //         postLikes.map((like) => {
    //             if (like.like_creator_id === userId) {
    //                 setFavorite(true);
    //             }
    //         })
    //     }
    // }, [postLikes])

    let newLikeId;
    async function likePost() {
        newLikeId = uuidv4();
        try {
            const { error } = await supabase.from("jk-likes").insert({ like_id: newLikeId, like_creator_id: userId, like_post_id: postId });
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        fetchPostLikes();
    }

    async function unlikePost() {
        try {
            const { error } = await supabase.from("jk-likes").delete().eq("like_creator_id", userId);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        fetchPostLikes();
    }

    useEffect(() => {
        if (favorite) {
            likePost();
        } else if (!favorite) {
            unlikePost();
        }
        fetchPostLikes();
    }, [favorite])

    const [newComment, setNewComment] = useState();
    function postCommentHandle (e) {
        setNewComment(e.target.value);
    }

    let comment_id;
    async function commentPost () {
        comment_id = uuidv4();
        try {
            const { error } = await supabase.from("jk-comments").insert({ comment_id: comment_id, comment_post_id: postId, comment_creator_id: userId , comment_text: newComment });
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
    }

    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef(null)
    function commentButtonHandle () {
        setShowInput(true)
    }
    useEffect(() => {
        if (showInput) inputRef.current.focus();
    }, [showInput])

    function submitCommentHandle (e) {
        e.preventDefault();
        commentPost();
        fetchPostComments();
        setNewComment("");
    }

    const [postOptions, setPostOptions] = useState(false);
    const [updatePostWindowVisibility, setUpdatePostWindowVisibility] = useState(false);

    

    async function deletePost () {
        try {
            const { error } = await supabase.from("jk-posts").delete().eq("post_id", postId);
            if (error) console.log(error);
            fetchAgain();
        } catch (err) {
            console.log(err);
        }
    }

    if (!postUserData) {
        return (<LoadingPost />)
    } else if (postUserData) {
        return (
            <div className="w-full h-fit flex flex-col border-var-2 border-2 border-solid mb-6 rounded-post">
    
                <div className="flex flex-row justify-start items-center h-[50px] w-full p-1 border-var-2 border-solid border-b-2">
                    <RoundPhoto classesForRoundPhoto="w-[40px] h-full mx-1 " imageSource={null} />
                    <div className="flex flex-col w-8/10 h-full px-2" onClick={() => setPostOptions(false)}>
                        <p className="text-postDisplayOrUserName font-bold">{postUserData.display_name}</p>
                        <div className="flex flex-row w-full">
                            <p className="text-postDisplayOrUserName font-extralight">{postUserData.username}</p>
                            <p className="text-postDisplayOrUserName font-extralight text-gray-500">, {postCreationDate.split("T")[0]}</p>    
                        </div>
                    </div>
                    <div className="flex w-1/10 h-full items-center justify-center relative">
                        <button className="flex justify-center items-center aspect-square rounded-circular bg-white hover:bg-gray-300 duration-300" onClick={() => setPostOptions((prevValue) => !prevValue)}>
                            <MoreVertIcon className="mx-1 hover:text-gray-700" fontSize="medium" />
                        </button>

                        {postOptions && <div className="h-fit w-[100px] right-0 top-[40px] bg-white shadow-2xl absolute rounded-post ">
                            <button className="px-4 pt-1.5 pb-1 w-full flex items-center text-optionsFontSize hover:bg-gray-300 cursor-pointer duration-300 rounded-post" onClick={() => setUpdatePostWindowVisibility((prevValue) => !prevValue)}>
                                Edit post
                            </button>
                            <button className="px-4 pt-1.5 pb-1 w-full flex items-center text-optionsFontSize hover:bg-red-500 hover:text-white cursor-pointer duration-300 rounded-post" onClick={deletePost}>
                                Delete post
                            </button>
                        </div>}
                    </div>
                </div>
    
                <div className="flex justify-center w-full sm:h-[500px] h-[250px] " onClick={() => setPostOptions(false)}>
                    <PostPhoto imageSource={postImageUrl} />
                </div>
    
                <div className="flex flex-row justify-start h-[50px] w-full py-2 px-1 border-var-2 border-solid border-y-2 ">
                    <div className="flex flex-row mr-2">
                        <button onClick={favoriteButtonHandle}>
                            {favorite ? <FavoriteIcon className="mx-1" fontSize="large" /> : <FavoriteBorderIcon className="mx-1" fontSize="large" />}
                        </button>
                        <button onClick={commentButtonHandle}>
                            <ChatBubbleOutlineOutlinedIcon className="mx-1" fontSize="large" />
                        </button>
                    </div>
                </div>
    
                <div>
                    <div className="flex flex-col justify-start text-commentFontSizeMob sm:text-commentFontSizeDsk px-3 pt-2 pb-2 ">
                        {postLikes && (postLikes.length > 0) && <div className="mb-1">
                            {postLikes.length == 1 && <p className="mr-1 font-black">{postLikes.length} like</p>}
                            {postLikes.length > 1 && <p className="mr-1 font-black">{postLikes.length} likes</p>}
                        </div>}
                        {postDescription && <div className="flex flex-row justify-start pb-1">
                            <p className="mr-2 font-bold">{postUserData.display_name}</p>
                            <p className="font-light">{postDescription}</p>
                        </div> }
                        {comments && comments.map((comment, index) => {
                            return <Comment commentData={comment} fetchAgain={() => fetchPostComments()} index={index} userId={userId} />
                        })}
                        
                        {showInput && <form action="" className="w-full" onSubmit={submitCommentHandle}>
                            <input className="outline-none sm:w-9/10 w-8/10 h-fit" onChange={postCommentHandle} placeholder="Write your comment..." ref={inputRef} type="text" value={newComment} />
                            <button className="font-bold px-1 rounded-[2px] sm:w-1/10 w-2/10 hover:bg-var-2 duration-200" type="submit">Post</button>
                        </form>}
                    </div>
                </div>

                <CreateOrUpdatePost open={updatePostWindowVisibility} onClose={() => setUpdatePostWindowVisibility(false)} userId={userId} />
            </div>
        )
    }
};