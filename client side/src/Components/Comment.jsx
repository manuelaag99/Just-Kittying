import { useEffect, useState } from "react"
import { supabase } from "../supabase/client";

import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';

export default function Comment ({ commentData, index }) {
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

    if (!commentUserData) {
        return (
            <div key={index} className="flex flex-row justify-center pb-1 w-full ">
                <div className="flex flex-row justify-start w-full pr-2">
                    <div className="bg-gray-300 rounded-post w-3/10 mr-2"></div>
                    <div className="bg-gray-300 rounded-post w-6/10 mr-2"></div>
                </div>
            </div>
        ) 
    } else if (commentUserData) {
        return (
            <div key={index} className="flex flex-row justify-center pb-1 w-full ">
                <div className="flex flex-row justify-start w-8/10 pr-2">
                    <p className="mr-2 font-bold">{commentUserData.display_name}</p>
                    <p className="font-light">{commentData.comment_text}</p>
                </div>
                <div className="flex flex-row w-2/10 justify-end">
                    <EditSharpIcon className="ml-1 text-black hover:text-var-2 duration-200 cursor-pointer" fontSize="small" />
                    <DeleteSharpIcon className="ml-1 text-black hover:text-var-2 duration-200 cursor-pointer" fontSize="small" />
                </div>
            </div>
        )
    }
}