import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// util
import { onClickNaverLogin, onClickGithubLogin } from '../../utils/loginUtils';
// hook
import useLoginCheck from '../../hooks/useLoginCheck';
// style
import S from './LoginPageStyles';
// img
import logo from '../../static/newLogoName.png';
import naverOauth from '../../static/naver_oauth.png';
import githubOauth from '../../static/githubOauth.png';
// preloading
import { RegisterPage, HomePage } from '..';

const onMouseOver = () => {
  RegisterPage.preload();
  HomePage.preload();
};

const LoginPage = () => {
  const navigate = useNavigate();
  const isLoginCheck = useLoginCheck();

  useEffect(() => {
    const checkLoginToSendHome = async () => {
      const result = await isLoginCheck();
      if (result) navigate('/home', { replace: true });
    };

    checkLoginToSendHome();
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
