export default function InstructionOrErrorMessageForInput ({ classnames, message }) {
    return (
        <div className={"flex justify-center items-center border border-solid  rounded-post absolute top-14 w-full z-10 shadow-2xl mx-auto px-3 " + classnames}>
            <p className="text-center mx-2 my-1">
                {message}
            </p>
        </div>
    )
}