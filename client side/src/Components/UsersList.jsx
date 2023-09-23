import React, { useEffect, useState } from "react";

import RoundPhoto from "./RoundPhoto";
import { supabase } from "../supabase/client";
import UserInList from "./UserInList";

export default function ({ selectedUsersArray }) {
    const [allUsers, setAllUsers] = useState();
    async function fetchAllUsers () {
		try {
			const { data, error } = await supabase.from('jk-users').select("*");
			if (error) console.log(error);
			setAllUsers(data);
		} catch (err) {
			console.log(err);
		}
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    console.log(selectedUsersArray)

    // const [usersInfo, setUsersInfo] = useState();
    // useEffect(() => {
    //     if (allUsers) {
    //         setUsersInfo(allUsers.map((user) => {
    //             selectedUsersArray.map((selectedUser) => {
    //                 console.log(selectedUser.user_1_id)
    //                 console.log(user.user_id)
    //                 if (selectedUser.user_1_id === user.user_id) {
    //                     console.log("match")
    //                     return user;
    //                 }
    //             })
    //         }))
    //     }
    // }, [allUsers])

    // console.log(usersInfo)
    
    if (!selectedUsersArray) {
        return (
            <div className="flex justify-center mt-8">
                <p className="text-gray-400 text-center">
                    No users to show.
                </p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col justify-center w-full ">
                {selectedUsersArray && selectedUsersArray.map((user, index) => {
                    return <UserInList index={index} userId={user} />
                })}
            </div>
        )
    }
};