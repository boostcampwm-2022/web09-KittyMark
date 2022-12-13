import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
// type
import { AxiosError } from 'axios';
// recoil
import user from '../../store/userAtom';
// util
import { onClickNaverLogin, onClickGithubLogin } from '../../utils/loginUtils';
// style
import S from './LoginPageStyles';
// img
import logo from '../../static/newLogoName.png';
import naverOauth from '../../static/naver_oauth.png';
import githubOauth from '../../static/githubOauth.png';
// preloading
import { RegisterPage, HomePage } from '..';
import { validate } from '../../apis/api/loginApi';

const onMouseOver = () => {
  RegisterPage.preload();
  HomePage.preload();
};

const LoginPage = () => {
  const [userData, setUserData] = useRecoilState(user);
  const navigate = useNavigate();

  // 사용자가 들어왔을 때 기존 로그인인지 확인한다.
  // 이 로직이 많이 사용되는 것이 아니기 때문에 우선은 LoginPage 에 두고 차후 생각해본다.
  // TODO 여기 useCallback 쓸모 없음 그냥 때려 치우셈
  const isLoginCheck = useCallback(async () => {
    if (userData.userId === -1 || userData.userName === '') return;
    try {
      const data = await validate();
      if (data.statusCode === 200) navigate('/home', { replace: true });
      if (data.statusCode === 401)
        setUserData({ userId: -1, userName: '', userProfileUrl: '' });
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
      <S.CustomOauthButton
        type="button"
        onClick={onClickGithubLogin}
        onMouseOver={onMouseOver}
      >
        <img alt="Github Oauth" src={githubOauth} />
        <span>GitHub 로그인</span>
      </S.CustomOauthButton>
    </S.Container>
  );
};

export default LoginPage;
