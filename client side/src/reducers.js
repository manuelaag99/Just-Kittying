import { isTextAnEmail, isTextAPassword, minLengthText, nonEmptyText } from "./CheckValidity";

export function inputReducer (state, action) {
    switch (action.type) {
        case "change":
            let checkValidity;
            if (action.placeholder === "Enter your e-mail") {
                checkValidity = isTextAnEmail(action.value);
            } else if (action.placeholder === "Create a username" || action.placeholder === "Enter a user name...") {
                checkValidity = minLengthText(action.value, 6);
            } else if (action.placeholder === "Create a password") {
                checkValidity = isTextAPassword(action.value);
            } else if (action.placeholder === "Enter a short bio...") {
                checkValidity = true;
            } else {
                checkValidity = nonEmptyText(action.value);
            }
            return {
                ...state,
                value: action.value,
                isValid: checkValidity
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

export function formReducer (state, action) {
    switch (action.type) {
        case "formChange":
            let formIsValid = true
            for (const specificInput in state.inputs) {
                if (specificInput === action.inputName) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[specificInput].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputName]: { value: action.value, isValid: action.isValid }
                },
                isFormValid: formIsValid
            }
        default:
            return state
    }
}