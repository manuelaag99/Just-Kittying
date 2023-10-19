import React, { useContext, useEffect, useRef, useState } from "react";

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import CreateOrUpdatePost from "./Portals/CreateOrUpdatePost";
import RoundPhoto from "./RoundPhoto";
import PostPhoto from "./PostPhoto";
import { supabase } from "../supabase/client";
import { v4 as uuidv4 } from "uuid";
import LoadingPost from "./LoadingPost";
import Comment from "./Comment";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SignInOrSignUpWindow from "./Portals/SignInOrSignUpWindow";

export default function Post ({ classnames, fetchAgain, index, post, userId }) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [signInWindow, setSignInWindow] = useState(false);
    function closeSignInHandle () {
        setSignInWindow(false);
    }
    function openSignInHandle () {
        setSignInWindow(true);
    }

    const [signUpWindow, setSignUpWindow] = useState(false);
    function closeSignUpHandle () {
        setSignUpWindow(false);
    }
    function openSignUpHandle () {
        setSignUpWindow(true);
    }

    function switchHandle () {
        setSignUpWindow(prevValue => !prevValue);
        setSignInWindow(prevValue => !prevValue);
    }

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
    
    const [postUserData, setPostUserData] = useState();
    async function fetchPostUserData () {
        try {
            const { data, error } = await supabase.from("jk-users").select().eq("user_id", post.post_creator_id)
            if (error) console.log(error);
            setPostUserData(data[0]);
        } catch (err) {
            console.log(err);
        }
    }

    const [postUserProfilePic, setPostUserProfilePic] = useState();
    async function fetchPostUserProfilePic () {
        try {
            const { data, error } = await supabase.storage.from("jk-images").getPublicUrl("userProfilePics/" + postUserData.profile_pic_path);
            if (error) console.log(error);
            setPostUserProfilePic(data.publicUrl);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (postUserData) {
            fetchPostUserProfilePic();
        }
    }, [postUserData])

    const [favorite, setFavorite] = useState(false)
    const [postLikes, setPostLikes] = useState();
    async function fetchPostLikes () {
        try {
            const { data, error } = await supabase.from("jk-likes").select("*").eq("like_post_id", post.post_id);
            if (error) console.log(error);
            setPostLikes(data);
        } catch (err) {
            console.log(err);
        }
    }

    // function convertToDateObject(isoDateString) {
    //     return new Date(isoDateString);
    // }

    const [comments, setComments] = useState();
    const [commentsToDisplay, setCommentsToDisplay] = useState();

    // function sortDataByDate() {
    //     setComments(prevData => [...prevData].sort((a, b) => {
    //         const dateA = convertToDateObject(a.comment_date);
    //         const dateB = convertToDateObject(b.comment_date);
    //         return dateA - dateB;
    //     }));
    // }
    
    async function fetchPostComments () {
        try {
            const { data, error } = await supabase.from("jk-comments").select("*").eq("comment_post_id", post.post_id);
            if (error) console.log(error);
            setComments(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPostUserData();
        fetchPostLikes();
        fetchPostComments();
        fetchPostPhoto();
        if (comments) {
            // setComments(prevData => [...prevData].sort((a, b) => a.comment_date.split("T")[1] - b.comment_date.split("T")[1]));
            // setCommentsToDisplay(comments.map((comment) => {
            //     return comment.dateObject = comment.comment_date.split("T")[1]
            // }))
        }
    }, [])

    useEffect(() => {
        if (postLikes) {
            postLikes.map((like) => {
                if (like.like_creator_id === userId) {
                    setFavorite(true);
                }
            })
        }
    }, [postLikes])

    let newLikeId;
    async function likePost() {
        if (auth.isLoggedIn) {
            newLikeId = uuidv4();
            try {
                const { error } = await supabase.from("jk-likes").insert({ like_id: newLikeId, like_creator_id: userId, like_post_id: post.post_id });
                if (error) console.log(error);
                setFavorite(true);
            } catch (err) {
                console.log(err);
            }
            fetchPostLikes();
        } else {
            openSignInHandle();
        }
    }

    async function unlikePost() {
        if (auth.isLoggedIn) {
            try {
                const { error } = await supabase.from("jk-likes").delete().eq("like_creator_id", userId);
                if (error) console.log(error);
                setFavorite(false);
            } catch (err) {
                console.log(err);
            }
            fetchPostLikes();
        } else {
            openSignInHandle();
        }
    }

    const [postCommentButtonText, setPostCommentButtonText] = useState("Post");
    const [newComment, setNewComment] = useState("");
    function postCommentHandle (e) {
        setNewComment(e.target.value);
    }
    
    let comment_id;
    let comment_date;
    async function commentPost () {
        if (postCommentButtonText === "Post") {
            comment_id = uuidv4();
            comment_date = new Date(Date.now()).toISOString();
            try {
                const { error } = await supabase.from("jk-comments").insert({ comment_date: comment_date, comment_id: comment_id, comment_post_id: post.post_id, comment_post_creator_id: post.post_creator_id, comment_creator_id: userId , comment_text: newComment, comment_notif_status: "pending" });
                if (error) console.log(error);
            } catch (err) {
                console.log(err);
            }
        } else if (postCommentButtonText === "Update") {
            try {
                const { error } = await supabase.from("jk-comments").update({ comment_text: newComment, comment_notif_status: "pending" }).eq("comment_id", editedCommentId);
                if (error) console.log(error);
            } catch (err) {
                console.log(err);
            }
        }        
        fetchPostComments();
        setPostCommentButtonText("Post");
    }

    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef(null)
    function commentButtonHandle () {
        if (auth.isLoggedIn) {
            setPostCommentButtonText("Post")
            setShowInput(true)
        } else {
            openSignInHandle();
        }
    }
    useEffect(() => {
        if (auth.isLoggedIn && showInput) inputRef.current.focus();
    }, [showInput])

    function removeCommentBeingEdited(array, idToRemove) {
        return array.filter(item => item.comment_id !== idToRemove);
    }

    const [editedCommentId, setEditedCommentId] = useState();
    let commentsWithoutEditedComment;
    function editCommentHandle (comment) {
        setPostCommentButtonText("Update");
        setEditedCommentId(comment.comment_id);
        commentsWithoutEditedComment = removeCommentBeingEdited(comments, comment.comment_id);
        setComments(commentsWithoutEditedComment);
        console.log(commentsWithoutEditedComment);
        console.log(comments);
        setNewComment(comment.comment_text);
        setShowInput(true);;
    }

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
            const { error } = await supabase.from("jk-posts").delete().eq("post_id", post.post_id);
            if (error) console.log(error);
            setPostOptions(false);
            fetchAgain();
        } catch (err) {
            console.log(err);
        }
    }

    if (!postUserData) {
        return (<LoadingPost />)
    } else if (postUserData) {
        return (
            <div className={"w-full h-fit flex flex-col border-var-2 border-2 border-solid rounded-post my-10 " + classnames} key={index}>
                <SignInOrSignUpWindow textForSignInOrSignUpButton={"Sign in"} onClose={closeSignInHandle} open={signInWindow} switchToSignUp={switchHandle} />
                <SignInOrSignUpWindow textForSignInOrSignUpButton={"Sign up"} onClose={closeSignUpHandle} open={signUpWindow} switchToSignIn={switchHandle} />
                <div className="flex flex-row justify-start items-center h-[50px] w-full p-1 border-var-2 border-solid border-b-2">
                    {!postUserProfilePic && <RoundPhoto classesForRoundPhoto="w-[40px] h-full mx-1 " imageSource={null} />}
                    {postUserProfilePic && <RoundPhoto classesForRoundPhoto="w-[40px] h-full mx-1 " imageSource={postUserProfilePic} />}
                    <Link className="flex flex-col w-8/10 h-full px-2" to={"/profile/" + postUserData.user_id}>
                        <p className="text-postDisplayOrUserName font-bold">{postUserData.display_name}</p>
                        <div className="flex flex-row w-full cursor-pointer">
                            <p className="text-postDisplayOrUserName font-extralight">{postUserData.username}</p>
                            <p className="text-postDisplayOrUserName font-extralight text-gray-500">, {post.post_creation_date.split("T")[0]}</p>    
                        </div>
                    </Link>
                    {auth.isLoggedIn && (auth.userId === post.post_creator_id) && <div className="flex w-1/10 h-full items-center justify-center relative">
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
                    </div>}
                </div>
    
                <div className="flex justify-center w-full sm:h-[500px] h-[250px] " onClick={() => setPostOptions(false)}>
                    {postPhoto && <PostPhoto imageSource={postPhoto} />}
                </div>
    
                <div className="flex flex-row justify-start h-[50px] w-full py-2 px-1 border-var-2 border-solid border-y-2 ">
                    <div className="flex flex-row mr-2">
                        {favorite && <button onClick={unlikePost}>
                            <FavoriteIcon className="mx-1" fontSize="large" />
                        </button>}
                        {(favorite === false) && <button onClick={likePost}>
                            <FavoriteBorderIcon className="mx-1" fontSize="large" />
                        </button>}
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
                        {(post.post_caption) && <div className="flex flex-row justify-start pb-1">
                            <p className="mr-2 font-bold cursor-pointer" onClick={() => navigate("/profile/" + post.post_creator_id)}>{postUserData.display_name}</p>
                            <p className="font-light">{post.post_caption}</p>
                        </div> }
                        {comments && comments.map((comment, index) => {
                            return <Comment commentData={comment} editSpecificComment={() => editCommentHandle(comment)} fetchAgain={() => fetchPostComments()} key={index} index={index} userId={userId} />
                        })}
                        
                        {showInput && <form action="" className="w-full" onSubmit={submitCommentHandle}>
                            <input className="outline-none sm:w-9/10 w-8/10 h-fit" onChange={postCommentHandle} placeholder="Write your comment..." ref={inputRef} type="text" value={newComment} />
                            <button className="font-bold px-1 rounded-[2px] sm:w-1/10 w-2/10 hover:bg-var-2 duration-200" type="submit">{postCommentButtonText}</button>
                        </form>}
                    </div>
                </div>

                <CreateOrUpdatePost fetchAgain={() => fetchAgain()} onClose={() => setUpdatePostWindowVisibility(false)} open={updatePostWindowVisibility} post={post} userId={userId} />
            </div>
        )
    }
};