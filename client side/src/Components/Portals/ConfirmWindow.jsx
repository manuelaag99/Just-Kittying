import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';
import { supabase } from '../../supabase/client';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ConfirmWindow({ idOfOtherUser, onClose, onCloseConfirmWindowAndThenOpenMessageWindow, open, textForMessage, user }) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    function actionButtonHandle () {
        if (textForMessage === "Are you sure you want to delete your account? This is permanent.") {
            deleteAccount();
        } else if (textForMessage === "Are you sure you want to change your password? If you confirm, you will get an email with a link to change it.") {
            changePassword();
        } else if (textForMessage === "Are you sure you want to remove this user from your friends?") {
            removeFriend();
        }
    }

    async function removeFriend () {
        try {
            const { error } = await supabase.from("jk-friends").select().eq("user_1_id", user.userId).eq("user_2_id", idOfOtherUser);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
    }

    async function changePassword () {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(user.email);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        onCloseConfirmWindowAndThenOpenMessageWindow();
    }

    async function deleteAccount () {
        try {
            const { error } = await supabase.from("jk-posts").delete().eq("post_creator_id", auth.userId);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        try {
            const { error } = await supabase.from("jk-likes").delete().eq("like_creator_id", auth.userId);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        try {
            const { error } = await supabase.from("jk-comments").delete().eq("comment_creator_id", auth.userId);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        try {
            const { error } = await supabase.from("jk-friends").delete().eq("user_1_id", auth.userId);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        try {
            const { error } = await supabase.from("jk-friends").delete().eq("user_2_id", auth.userId);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        try {
            const { error } = await supabase.from("jk-friend-requests").delete().eq("request_receiver_id", auth.userId);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        try {
            const { error } = await supabase.from("jk-friend-requests").delete().eq("request_sender_id", auth.userId);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        try {
            const { error } = await supabase.from("jk-users").delete().eq("user_id", auth.userId);
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
        try {
            const { error } = await supabase.auth.signOut();
            if (error) console.log(error);
            if (!error) {
                auth.logout();
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
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
                <div className="py-3 px-6">
                    <p className='text-center'>{textForMessage}</p>
                </div>
                <div className='flex flex-row w-full px-4 pt-2 pb-5 justify-around'>
                    <Button clickButtonFunction={actionButtonHandle} classnames="mx-2 py-2 sm:px-4 px-7 bg-var-3 whitespace-no-wrap hover:bg-var-3-hovered text-white duration-200 drop-shadow-button" textForButton="Confirm" />
                    <Button clickButtonFunction={onClose} classnames="mx-2 py-2 sm:px-4 px-7 bg-var-3 whitespace-no-wrap hover:bg-var-3-hovered text-white duration-200 drop-shadow-button" textForButton="Cancel" />
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