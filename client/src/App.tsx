import React from 'react';
import { Routes, Route } from 'react-router-dom';
// page
import StartPage from './pages/StartPage/StartPage';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<StartPage />} />
			<Route path="/home" element={<HomePage />} />
			<Route path="/register" element={<RegisterPage />} />
		</Routes>
	);
};

export default App;
