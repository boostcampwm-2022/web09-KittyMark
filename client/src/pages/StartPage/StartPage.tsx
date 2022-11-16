import React, { useEffect } from 'react';
import axios from 'axios';
// style
import { StartPageContainer, OauthButton } from './StartPageStyles';
// img
import logo from '../../static/logo.png';
import appName from '../../static/logoName.png';
import kakaoOauth from '../../static/kakao_oauth.png';
import naverOauth from '../../static/naver_oauth.png';

const StartPage = () => {
	const onClickNaverLogin = () => {
		const clientId = process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID;
		const stateString = process.env.REACT_APP_NAVER_LOGIN_STATE;
		const callbackUrl = process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL;
		const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${stateString}&redirect_uri=${callbackUrl}`;
		window.location.assign(naverLoginUrl);
	};

	const getSocialName = (url: URL) => {
		const callback = url.pathname.split('/')[2];
		let name = '';
		if (callback.includes('naver')) {
			name = 'naver';
		} else if (callback.includes('kakao')) {
			name = 'kakao';
		}
		return name;
	};

	// TODO: authorization code를 BE에 전송 후, reponse에 따른 처리 필요
	const postAuthrizationInfo = async (
		socialName: string,
		authorizationCode: string,
		state: string,
	) => {
		const response = await axios.post(`/api/oauth/${socialName}`, {
			authorizationCode,
			state,
		});
		if (response.data.code === 200) {
			if (response.data.email !== undefined) {
				// TODO: 회원가입
			} else {
				// TODO: 로그인되어 홈으로 이동
			}
		}
	};

	useEffect(() => {
		const url = new URL(window.location.href);
		const authorizationCode = url.searchParams.get('code');
		const state = url.searchParams.get('state');
		if (authorizationCode && state) {
			const socialName = getSocialName(url);
			postAuthrizationInfo(socialName, authorizationCode, state);
		}
	}, []);

	return (
		<StartPageContainer>
			<img alt="Logo" src={logo} style={{ width: '5rem', height: '5rem' }} />
			<img
				alt="App Name"
				src={appName}
				style={{ width: '16rem', height: '3.5rem', marginBottom: '20px' }}
			/>
			<OauthButton type="button" onClick={onClickNaverLogin}>
				<img alt="Naver Oauth" src={naverOauth} />
			</OauthButton>
			<OauthButton type="button">
				<img alt="Kakao Oauth" src={kakaoOauth} />
			</OauthButton>
		</StartPageContainer>
	);
};

export default StartPage;
