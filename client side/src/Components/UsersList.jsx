import React, { useEffect } from "react";

import UserInList from "./UserInList";

export default function ({ selectedUsersArray, userId }) {
    console.log(selectedUsersArray)
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
                    return <UserInList key={index} index={index} userId={userId} userInListId={user} />
                })}
            </div>
        )
    }
};