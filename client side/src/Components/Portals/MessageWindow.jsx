import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function MessageWindow({ isErrorMessage, onClose, open, textForMessage }) {
    const [textToDisplay, setTextToDisplay] = useState();
    useEffect(() => {
        if (isErrorMessage) {
            setTextToDisplay(String(textForMessage).split(":")[1]);
        } else {
            setTextToDisplay(textForMessage);
        }
    }, [textForMessage])



    const messageWindow = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-40"></div>
            <div className="flex flex-col fixed justify-center items-center z-50 top-[30%] left-[5%] sm:left-[30%] w-9/10 sm:w-4/10 h-fit bg-var-1 rounded-button shadow-2xl text-signInOrsignUpMob sm:text-signInOrsignUpDsk duration-500 ">
                <div className="flex flex-row w-full h-fit py-2">
                    <div className="w-9/10"></div>
                    <button className="flex justify-center items-center w-1/10 text-black hover:text-gray-300 duration-200 " onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                {isErrorMessage && <div>
                    <p className="font-bold text-center text-profileOtherText">There was an error!</p>
                </div>}
                <div className="pt-3 pb-6 px-6">
                    <p className='text-center'>{textToDisplay}</p>
                </div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(messageWindow, document.body)
    } else {
        null;
    }
}