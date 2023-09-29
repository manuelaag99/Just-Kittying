import CloseIcon from '@mui/icons-material/Close';

export default function MessageWindow({ onClose, open, textForMessage }) {

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
                <div className="py-5 px-5">
                    <div>
                        <p>ijfreiufneofjeuinfeufneinYeah</p>
                    </div>
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