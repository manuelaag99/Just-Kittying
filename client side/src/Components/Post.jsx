import React from "react";

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import RoundPhoto from "./RoundPhoto";
import PostPhoto from "./PostPhoto";

export default function Post ({ numberOfLikes }) {
    return (
        <div className="w-full h-fit flex flex-col border-var-2 border-2 border-solid mb-6">

            <div className="flex flex-row justify-start items-center h-[50px] w-full p-1 border-var-2 border-solid border-b-2">
                <RoundPhoto classesForRoundPhoto="w-[40px] h-full mx-1 " imageSource="https://economictimes.indiatimes.com/thumb/msid-96710895,width-1200,height-900,resizemode-4,imgsize-38032/blackpink-jisoo.jpg?from=mdr"/>
                <div className="flex flex-col w-8/10 sm:w-9/10 h-full px-2">
                    <p className="text-postDisplayName font-bold">Abi Mejia</p>
                    <p className="text-postDate font-extralight"> 11:05 A.M.</p>
                </div>
            </div>

            <div className="flex justify-center w-full sm:h-[500px] h-[250px] ">
                <PostPhoto imageSource="https://previews.123rf.com/images/points/points1607/points160700039/61955527-the-small-black-white-kitten-on-a-white-background.jpg" />
            </div>

            <div className="flex flex-row justify-start w-full py-2 px-1 border-var-2 border-solid border-y-2 ">
                <div className="flex flex-row mr-2">
                    <FavoriteBorderIcon className="mx-1" fontSize="large" />
                    <ChatBubbleOutlineOutlinedIcon className="mx-1" fontSize="large" />
                </div>
            </div>

            <div>
                <div className="flex flex-col justify-start text-commentFontSizeMob sm:text-commentFontSizeDsk px-3 pt-2 pb-2 ">
                    {numberOfLikes && <div className="mb-1">
                        <p className="mr-1 font-black">{numberOfLikes} likes</p>
                    </div>}
                    <div className="flex flex-row justify-start pb-1 w-full ">
                        <p className="mr-1 font-bold">abimejia2000</p>
                        <p className="font-light">gamoraaaa</p>
                    </div>
                    <div className="flex flex-row justify-start pb-1 w-full ">
                        <p className="mr-1 font-bold">eduardomex</p>
                        <p className="font-light">qué bonito michi</p>
                    </div>
                </div>
            </div>

        </div>
    )
};