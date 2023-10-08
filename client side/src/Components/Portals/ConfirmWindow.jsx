import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';

export default function ConfirmWindow({ isErrorMessage, onClose, open, textForMessage }) {
    function actionButtonHandle () {

    }

    const confirmWindow = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-40"></div>
            <div className="flex flex-col fixed justify-center items-center z-50 top-[30%] left-[5%] sm:left-[30%] w-9/10 sm:w-4/10 h-fit bg-var-1 rounded-button shadow-2xl text-signInOrsignUpMob sm:text-signInOrsignUpDsk duration-500 ">
                <div className="flex flex-row w-full h-fit py-2">
                    <div className="w-9/10"></div>
                    <button className="flex justify-center items-center w-1/10 text-black hover:text-gray-300 duration-200 " onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="pt-3 pb-6 px-6">
                    <p className='text-center'>{textForMessage}</p>
                </div>
                <div className='flex flex-row w-full px-4 py-2 justify-around'>
                    <Button clickButtonFunction={actionButtonHandle}>Confirm</Button>
                    <Button clickButtonFunction={onClose}>Cancel</Button>
                </div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(confirmWindow, document.body)
    } else {
        null;
    }
}