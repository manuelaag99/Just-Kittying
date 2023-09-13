import React from "react";

export default function LoadingPost ({}) {
    return (
        <div className="w-full h-fit flex flex-col border-var-2 border-2 border-solid mb-6 rounded-post">
            <div className="flex flex-row justify-start items-center h-[50px] w-full p-1 border-var-2 border-solid border-b-2">
                <div className="bg-gray-300 rounded-circular w-[40px] h-full mx-1"></div>
                <div className="flex flex-col w-8/10 sm:w-9/10 h-full px-2">
                    <div className="bg-gray-500 h-4 my-1 w-4/10 rounded-post "></div>
                    <div className="bg-gray-400 h-4 my-1 w-4/10 rounded-post "></div>
                </div>
            </div>
    
            <div className="flex justify-center w-full sm:h-[500px] h-[250px] ">
                <div className="w-full h-full bg-gray-300"></div>
            </div>
    
            <div className="flex flex-row justify-start h-[50px] w-full py-2 px-1 border-var-2 border-solid border-y-2 ">
                <div className="flex flex-row mr-2"></div>
            </div>
    
            <div>
                <div className="flex flex-col justify-start h-[50px] px-3 pt-2 pb-2 ">
                    <div className="flex flex-row w-full h-full">
                        <div className="bg-gray-300 rounded-post h-4 w-6/10 mt-1">
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    )
};