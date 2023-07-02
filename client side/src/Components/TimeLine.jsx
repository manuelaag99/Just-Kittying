import React from "react";

import Post from "./Post";

export default function TimeLine () {
    return (
        <div className="w-full h-full sm:mt-top-margin-dsk mt-top-margin-mob">
            <div className="sm:w-1/2 w-95 mx-auto bg-var-1 h-[1500px] ">
                <div>
                    <Post numberOfLikes="2" />
                    <Post numberOfLikes={null} />
                </div>
            </div>
        </div>
    )
};