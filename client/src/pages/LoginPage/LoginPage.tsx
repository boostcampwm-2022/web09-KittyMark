import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
// type
import { AxiosError } from 'axios';
// recoil
import user from '../../store/userAtom';
// style
import S from './LoginPageStyles';
// img
import logo from '../../static/newLogoName.png';
import kakaoOauth from '../../static/kakao_oauth.png';
import naverOauth from '../../static/naver_oauth.png';
// preloading
import { RegisterPage, HomePage } from '..';
import { validate } from '../../apis/api/loginApi';

const onClickNaverLogin = () => {
  const clientId = process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID;
  const stateString = process.env.REACT_APP_NAVER_LOGIN_STATE;
  const callbackUrl = process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL;
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${stateString}&redirect_uri=${callbackUrl}`;
  window.location.assign(naverLoginUrl);
};

const onMouseOver = () => {
  RegisterPage.preload();
  HomePage.preload();
};

const LoginPage = () => {
  const [userData, setUserData] = useRecoilState(user);
  const navigate = useNavigate();

  // 사용자가 들어왔을 때 기존 로그인인지 확인한다.
  // 이 로직이 많이 사용되는 것이 아니기 때문에 우선은 LoginPage 에 두고 차후 생각해본다.
  const isLoginCheck = useCallback(async () => {
    if (userData.userId === -1 || userData.userName === '') return;
    try {
      const data = await validate();
      if (data.statusCode === 200) navigate('/home');
      if (data.statusCode === 401) setUserData({ userId: -1, userName: '' });
    } catch (error) {
      // eslint-disable-next-line no-console
      if (error instanceof AxiosError) console.log(error.message);
    }
  }, []);

  useEffect(() => {
    isLoginCheck();
  }, []);

  return (
    <S.Container>
      <S.LogoImg alt="Logo" src={logo} />
      <S.OauthButton
        type="button"
        onClick={onClickNaverLogin}
        onMouseOver={onMouseOver}
      >
        <img alt="Naver Oauth" src={naverOauth} />
      </S.OauthButton>
      <S.OauthButton type="button">
        <img alt="Kakao Oauth" src={kakaoOauth} />
      </S.OauthButton>
    </S.Container>
  );
};

export default LoginPage;
