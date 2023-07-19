import React, { useEffect, useRef, useState } from "react";

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import filterArrayByUniqueByKey from "../functions";
import RoundPhoto from "./RoundPhoto";
import PostPhoto from "./PostPhoto";

export default function Post ({ postAuthorDisplayName, postComments, postDate, postImageUrl, postNumberOfLikes }) {

    const [comments, setComments] = useState([])
    useEffect(() => {
        setComments(filterArrayByUniqueByKey(postComments, "comment_id"))
    }, [])

    const [favorite, setFavorite] = useState(false)
    function favoriteButtonHandle () {
        setFavorite(prevValue => !prevValue)
    }

    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef(null)
    function commentButtonHandle () {
        setShowInput(true)
    }

    useEffect(() => {
        if (showInput) inputRef.current.focus()
    }, [showInput])

    function submitCommentHandle (e) {
        e.preventDefault()
        console.log("comment")
    }

    return (
        <div className="w-full h-fit flex flex-col border-var-2 border-2 border-solid mb-6">

            <div className="flex flex-row justify-start items-center h-[50px] w-full p-1 border-var-2 border-solid border-b-2">
                <RoundPhoto classesForRoundPhoto="w-[40px] h-full mx-1 " imageSource="https://economictimes.indiatimes.com/thumb/msid-96710895,width-1200,height-900,resizemode-4,imgsize-38032/blackpink-jisoo.jpg?from=mdr"/>
                <div className="flex flex-col w-8/10 sm:w-9/10 h-full px-2">
                    <p className="text-postdisplay_name font-bold">{postAuthorDisplayName}</p>
                    <p className="text-postDate font-extralight">{postDate}</p>
                </div>
            </div>

            <div className="flex justify-center w-full sm:h-[500px] h-[250px] ">
                <PostPhoto imageSource={postImageUrl} />
            </div>

            <div className="flex flex-row justify-start w-full py-2 px-1 border-var-2 border-solid border-y-2 ">
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
                    {(postNumberOfLikes > 0) && <div className="mb-1">
                        <p className="mr-1 font-black">{postNumberOfLikes} likes</p>
                    </div>}
                    {comments && comments.map((comment, index) => {
                        return <div key={index} className="flex flex-row justify-center pb-1 w-full ">
                            <div className="flex flex-row justify-start w-8/10 pr-2">
                                <p className="mr-1 font-bold">{comment.creator_display_name}</p>
                                <p className="font-light">{comment.comment_text}</p>
                            </div>
                            <div className="flex flex-row w-2/10">
                                <EditSharpIcon className="ml-1 text-black hover:text-var-2 duration-200 cursor-pointer" fontSize="small" />
                                <DeleteSharpIcon className="ml-1 text-black hover:text-var-2 duration-200 cursor-pointer" fontSize="small" />
                            </div>
                            
                        </div>
                    })}
                        
                    {/* {showInput && <input className="outline-none" type="text" placeholder="Write your comment..." />} */}
                    {showInput && <form action="" className="w-full" onSubmit={submitCommentHandle}>
                        <input className="outline-none w-8/10 h-fit" placeholder="Write your comment..." ref={inputRef} type="text" />
                        <button className="font-bold px-1 rounded-[2px] w-2/10 hover:bg-var-2 duration-200" type="submit">Post</button>
                    </form>}
                </div>
            </div>

        </div>
    )
};