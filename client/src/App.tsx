import React from 'react';
import { Routes, Route } from 'react-router-dom';
// page
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/oauth/naverCallback" element={<LoginPage />} />
			<Route path="/home" element={<HomePage />} />
			<Route path="/register" element={<RegisterPage />} />
		</Routes>
	);
};

export default App;
