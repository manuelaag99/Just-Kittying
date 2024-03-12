import { useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/client";

import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmWindow from "./Portals/ConfirmWindow";

export default function Comment ({ commentData, editSpecificComment, fetchAgain, index, userId }) {
    const navigate = useNavigate();
    const [commentUserData, setCommentUserData] = useState();
    async function fetchCommentUserData () {
        try {
            const { data, error } = await supabase.from("jk-users").select().eq("user_id", commentData.comment_creator_id);
            if (error) console.log(error);
            setCommentUserData(data[0]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCommentUserData();
    }, [])

    function editComment () {
        editSpecificComment();
    }

    const [commentToDelete, setCommentToDelete] = useState();
    const [isConfirmWindowModalVisible, setIsConfirmWindowModalVisible] = useState(false);
    function deleteComment () {
        setCommentToDelete(commentData);
        setIsConfirmWindowModalVisible(true);
    }

    function closeConfirmWindowAndThenFetchAgain () {
        setIsConfirmWindowModalVisible(false);
        fetchAgain();
    }

    if (!commentUserData) {
        return (
            <div key={index} className="flex flex-row justify-center pb-1 w-full ">
                <div className="flex flex-row justify-start w-full pr-2">
                    <div className="bg-gray-500 h-3 rounded-post w-2/10 mr-2 my-1"></div>
                    <div className="bg-gray-300 h-3 rounded-post w-6/10 mr-2 my-1"></div>
                </div>
            </div>
        ) 
    } else if (commentUserData) {
        return (
            <>
                <div key={index} className="flex flex-row justify-between pb-1 w-full ">
                    <div className="flex flex-row justify-start w-8/10 pr-2">
                        <p className="mr-2 font-bold cursor-pointer" onClick={() => navigate("/profile/" + commentData.comment_creator_id)}>{commentUserData.display_name}</p>
                        <p className="font-light">{commentData.comment_text}</p>
                    </div>
                    {(userId === commentData.comment_creator_id) && <div className="flex flex-row w-2/10 justify-end">
                        {(commentData.comment_creator_id === userId) && <button className="ml-1" onClick={editComment}>
                            <EditSharpIcon className="text-gray-600 hover:text-var-2 duration-200 cursor-pointer" fontSize="small" />
                        </button>}
                        {(commentData.comment_creator_id === userId) && <button className="ml-1" onClick={deleteComment}>
                            <DeleteSharpIcon className="text-gray-600 hover:text-var-2 duration-200 cursor-pointer" fontSize="small" />
                        </button>}
                    </div>}
                </div>
                <ConfirmWindow idOfOtherUser={null} item={commentToDelete} onClose={closeConfirmWindowAndThenFetchAgain} onCloseConfirmWindowAndThenOpenMessageWindow={null} open={isConfirmWindowModalVisible} textForMessage="Are you sure you want to remove this comment? This is permanent." user={userId} />
            </>
        )
    }
}