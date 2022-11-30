import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// recoil
import user from '../../store/userAtom';
// style
import S from './LoginPageStyles';
// img
import logo from '../../static/whiteLogo.png';
import appName from '../../static/logoName.png';
import kakaoOauth from '../../static/kakao_oauth.png';
import naverOauth from '../../static/naver_oauth.png';

const onClickNaverLogin = () => {
  const clientId = process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID;
  const stateString = process.env.REACT_APP_NAVER_LOGIN_STATE;
  const callbackUrl = process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL;
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${stateString}&redirect_uri=${callbackUrl}`;
  window.location.assign(naverLoginUrl);
};

const LoginPage = () => {
  const userData = useRecoilValue(user);
  const navigation = useNavigate();
  useEffect(() => {
    if (userData.userId !== -1 && userData.userName !== '') navigation('/home');
  }, []);
  return (
    <S.Container>
      <img alt="Logo" src={logo} style={{ width: '5rem', height: '5rem' }} />
      <img
        alt="App Name"
        src={appName}
        style={{ width: '16rem', height: '3.5rem', marginBottom: '20px' }}
      />
      <S.OauthButton type="button" onClick={onClickNaverLogin}>
        <img alt="Naver Oauth" src={naverOauth} />
      </S.OauthButton>
      <S.OauthButton type="button">
        <img alt="Kakao Oauth" src={kakaoOauth} />
      </S.OauthButton>
    </S.Container>
  );
};

export default LoginPage;
