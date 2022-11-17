import React from 'react';
import styled from 'styled-components';
// img
import tempHomeBody from '../../static/tempHomeBody.png';
// component
import NavBar from '../../components/NavBar/NavBar';
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';

const TempBody = styled.img`
	width: 100%;
	height: calc(100% - 8rem);
	background-color: #ffffff;
	object-fit: cover;
`;

const HomePage = () => {
	return (
		<>
			<NormalTopBar />
			<TempBody src={tempHomeBody} alt="Temp" />
			<NavBar />
		</>
	);
};

export default HomePage;
