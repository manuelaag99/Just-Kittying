import { isTextAnEmail, isTextAPassword, minLengthText, nonEmptyText } from "./CheckValidity";

export function inputReducer (state, action) {
    switch (action.type) {
        case "change":
            let checkValidity;
            if (action.placeholder === "Enter your e-mail") {
                checkValidity = isTextAnEmail(action.val);
            } else if (action.placeholder === "Create a username") {
                checkValidity = minLengthText(action.val, 6);
            } else if (action.placeholder === "Create a password") {
                checkValidity = isTextAPassword(action.val);
            } else {
                checkValidity = nonEmptyText(action.val);
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