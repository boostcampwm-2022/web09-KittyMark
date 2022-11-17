import React, { useEffect } from 'react';
import axios from 'axios';
import { Background, LoadingText } from './LoadingPageStyles';
import loadingCat from '../../static/loadingCat.gif';

const LoadingPage = () => {
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
		<Background>
			<img src={loadingCat} alt="로딩중" width="30%" />
			<LoadingText>Loading...</LoadingText>
		</Background>
	);
};

export default LoadingPage;
