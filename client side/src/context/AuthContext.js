import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    uId: null,
    token: null,
    login: () => {},
    logout: () => {}
});