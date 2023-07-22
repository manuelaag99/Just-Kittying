import React, { useEffect, useReducer } from "react";

import CancelIcon from '@mui/icons-material/Cancel';

const initialState = { value: "", isValid: false };

function reducer (state, action) {
    switch (action.type) {
        case "change":
            
            return {
                ...state,
                value: action.value
            };
        case "focus":
            return {
                ...state,
                isActive: true,
                isTouched: false
            };
        case "blur":
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
  }

export default function InputForForm ({ individualInputAction, inputClassnames, inputName, inputPlaceholder, inputType, inputValue, isInSettingsPage, labelClassnames, labelText }) {
    const [individualInputState, dispatch] = useReducer(reducer, initialState);
    const {value, isValid} = individualInputState

    function inputBlurHandle () {
        dispatch({ type: "blur" })
    }

    function inputChangeHandle (e) {
        dispatch({ type: "change", value: e.target.value });
    }

    function inputFocusHandle () {
        dispatch({ type: "focus" });
    }

    useEffect(() => individualInputAction(value, isValid, inputName), [value, isValid, inputName]);


    return (
        <div className="flex flex-row w-full h-fit items-center mb-3 pr-2 pl-3 s">
            {isInSettingsPage && <label className={labelClassnames} htmlFor="">{labelText}</label>}
            <div className="flex flex-col w-6/10 px-2">
                <input autoComplete="off" className={inputClassnames} name={inputName} onBlur={inputBlurHandle} onChange={inputChangeHandle} onFocus={inputFocusHandle} placeholder={inputPlaceholder} type={inputType} value={value} />
                {isInSettingsPage && <div className="flex flex-row items-center">
                    {/* {(profileFormData.displayname === "") && <CancelIcon className="text-red-700" fontSize="small"/>}
                    {(profileFormData.displayname === "") && <p className="text-red-700 text-errorFont pl-2">This field can't be empty</p>} */}
                </div>}
            </div>
        </div>
    )
}