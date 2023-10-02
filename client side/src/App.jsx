import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import HomePage from "./Pages/HomePage";
import ProfileSettingsPage from "./Pages/ProfileSettingsPage";
import PostOrPostsPage from "./Pages/PostOrPostsPage";
import UserProfilePage from "./Pages/UserProfilePage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import NotificationsPage from "./Pages/NotificationsPage";

export default function App () {
	const [ token, setToken ] = useState(null);
	const [ tokenExpiration, setTokenExpiration ] = useState(null);
	const [ userId, setUserId ] = useState(null);
		
	// const logIn = useCallback((uId, token, expirationDate) => {
	//   setUserId(uId);
	//   setToken((token));
	//   const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
	//   setTokenExpiration(tokenExpirationDate);
	//   localStorage.setItem("userData", JSON.stringify({ userId: uId, token: token, expiration: tokenExpirationDate.toISOString() }));
	// }, []);

	// const logOut = useCallback(() => {
	//   setToken(null);
	//   setTokenExpiration(null);
	//   setUserId(null);
	//   localStorage.removeItem("userData");
	// }, []);

	// useEffect(() => {
	//   if (token && tokenExpiration) {
	//     const remainingTime = tokenExpiration.getTime() - new Date().getTime();
	//     logOutTimer = setTimeout(logOut, remainingTime);
	//   } else {
	//     clearTimeout(logOutTimer);
	//   }
	// }, [token, logOut, tokenExpiration]);

	// useEffect(() => {
	//   const storedData = JSON.parse(localStorage.getItem("userData"));
	//   if (storedData && storedData.token && (new Date(storedData.expiration) > new Date())) {
	//     logIn(storedData.userId, storedData.token, new Date(storedData.expiration));
	//   }
	// }, [logIn]);

  	return <>
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/profile/:userid" element={<UserProfilePage />} />
				<Route path="/settings" element={<ProfileSettingsPage />} />
				<Route path="/post/:postid" element={<PostOrPostsPage />} />
				<Route path="/searchresults" element={<SearchResultsPage />} />
				<Route path="/notifications" element={<NotificationsPage />} />
			</Routes>
		</Router>
  	</>
};