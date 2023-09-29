export default function MessageWindow({ onClose, open, textForMessage }) {

    const messageWindow = (
        <div>
            <div onClick={onClose} className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <div className="flex flex-col fixed justify-center items-center z-50 sm:left-[25%] left-[5%] sm:w-5/10 w-9/10 h-fit bg-var-1 rounded-button  text-signInOrsignUpMob sm:text-signInOrsignUpDsk duration-500 ">
                <p>{textForMessage}</p>
            </div>
        </div>
    )

    if (open) {
        return messageWindow;
    } else {
        null;
    }
}