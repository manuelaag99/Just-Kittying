import React, { useEffect, useReducer } from "react";

import CancelIcon from '@mui/icons-material/Cancel';

import { inputReducer } from "../reducers";

export default function InputForForm ({ individualInputAction, inputClassnames, inputName, inputPlaceholder, inputType, inputValidity, inputValue, isInSettingsPage, isSelect, labelClassnames, labelText, optionsForSelect }) {
    const initialState = { value: inputValue, isValid: inputValidity };

    const [individualInputState, dispatch] = useReducer(inputReducer, initialState);
    const {value, isValid} = individualInputState

    function inputBlurHandle () {
        dispatch({ type: "blur" })
    }

    function inputChangeHandle (e) {
        dispatch({ type: "change", value: e.target.value, placeholder: e.target.placeholder });
    }

    function inputFocusHandle () {
        dispatch({ type: "focus" });
    }

    useEffect(() => individualInputAction(value, isValid, inputName), [value, isValid, inputName]);


    return (
        <div className="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3 ">
            {isInSettingsPage && <label className={labelClassnames} htmlFor="">{labelText}</label>}
            <div className="flex flex-col w-6/10 px-2">

                {!isSelect && <input autoComplete="off" className={inputClassnames} name={inputName} onBlur={inputBlurHandle} onChange={inputChangeHandle} onFocus={inputFocusHandle} placeholder={inputPlaceholder} type={inputType} value={value} />}
                {isInSettingsPage && (inputName === "displayname" || inputName === "username") && <div className="flex flex-row items-center">
                    {(individualInputState.value === "" && individualInputState.isActive && individualInputState.isTouched) && <CancelIcon className="text-red-700" fontSize="small"/>}
                    {(individualInputState.value === "" && individualInputState.isActive && individualInputState.isTouched) && <p className="text-red-700 text-errorFont pl-2">This field can't be empty</p>}
                </div>}

                {isSelect && <select className={inputClassnames} name={inputName} id={inputName} onChange={inputChangeHandle} value={value} >
                    {optionsForSelect.map((option, index) => {
                        return <option key={index} value={option.value}>{option.text}</option>
                    })}
                </select>}

            </div>
        </div>
    )
}