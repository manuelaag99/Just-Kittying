import { useCallback, useReducer } from "react";
import { formReducer } from "../reducers";

export const useForm = (initialFormState) => {
    const [stateOfForm, dispatch] = useReducer(formReducer, initialFormState);

    const formHandler = useCallback((value, isValid, inputName) => {
        dispatch({ type: "formChange", inputName: inputName, value: value, isValid: isValid })
    }, [dispatch])

    return [stateOfForm, formHandler]
}