import React from 'react';
// style
import { StartPageContainer, OauthButton } from './StartPageStyles';
// img
import logo from '../../static/logo.png';
import appName from '../../static/logoName.png';
import kakaoOauth from '../../static/kakao_oauth.png';
import naverOauth from '../../static/naver_oauth.png';

const StartPage = () => {
	return (
		<StartPageContainer>
			<img alt="Logo" src={logo} style={{ width: '5rem', height: '5rem' }} />
			<img
				alt="App Name"
				src={appName}
				style={{ width: '16rem', height: '3.5rem', marginBottom: '20px' }}
			/>
			<OauthButton type="button">
				<img alt="Naver Oauth" src={naverOauth} />
			</OauthButton>
			<OauthButton type="button">
				<img alt="Kakao Oauth" src={kakaoOauth} />
			</OauthButton>
		</StartPageContainer>
	);
};

export default StartPage;
