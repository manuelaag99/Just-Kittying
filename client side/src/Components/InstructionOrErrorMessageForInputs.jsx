export default function InstructionOrErrorMessageForInput ({ classnames, message }) {
    return (
        <div className={"flex justify-center items-center border border-solid rounded-post absolute top-14 w-full z-10 shadow-2xl my-0.5 mx-auto px-3 " + classnames}>
            <p className="text-center mx-2 my-2">
                {message}
            </p>
        </div>
    )
}