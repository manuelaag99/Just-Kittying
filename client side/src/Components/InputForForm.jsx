import React, { useEffect, useReducer, useState } from "react";

import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { inputReducer } from "../reducers";

export default function InputForForm ({ individualInputAction, inputClassnames, inputName, inputPlaceholder, inputType, inputValidity, inputValue, isInSettingsPage, isPasswordField, isSelect, labelClassnames, labelText, largeDivClassnames, optionsForSelect, smallDivClassnames }) {
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

    const [passwordVisibility, setPasswordVisibility] = useState(false)
    function changeVisibilityHandle () {
        setPasswordVisibility(prevValue => !prevValue);
    }

    return (
        <div className={largeDivClassnames} >
            {isInSettingsPage && <label className={labelClassnames} htmlFor="">{labelText}</label>}
            <div className={smallDivClassnames}>

                {!isSelect && <input autoComplete="off" className={inputClassnames} name={inputName} onBlur={inputBlurHandle} onChange={inputChangeHandle} onFocus={inputFocusHandle} placeholder={inputPlaceholder} type={isPasswordField ? (passwordVisibility ? "text" : "password") : inputType} value={value} />}
                {isInSettingsPage && (inputName === "displayname" || inputName === "username") && <div className="flex flex-row items-center">
                    {(individualInputState.value === "" && individualInputState.isActive && individualInputState.isTouched) && <CancelIcon className="text-red-700" fontSize="small"/>}
                    {(individualInputState.value === "" && individualInputState.isActive && individualInputState.isTouched) && <p className="text-red-700 text-errorFont pl-2">This field can't be empty</p>}
                </div>}

                {isPasswordField && <button onClick={changeVisibilityHandle} className="w-15 sm:w-1/10 ">
                    {!passwordVisibility && <VisibilityIcon className="hover:bg-var-2 duration-200 rounded-circular" />}
                    {passwordVisibility && <VisibilityOffIcon className="hover:bg-var-2 duration-200 rounded-circular" />}
                </button>}

                {isSelect && <select className={inputClassnames} name={inputName} id={inputName} onChange={inputChangeHandle} value={value} >
                    {optionsForSelect.map((option, index) => {
                        return <option key={index} value={option.value}>{option.text}</option>
                    })}
                </select>}

            </div>
        </div>
    )
}