import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
// style
import { Background, LoadingText } from './LoadingPageStyles';
// img
import loadingCat from '../../static/loadingCat.gif';
// type
import { LoginApi } from '../../types/responseData';

const LoadingPage = () => {
  const navigation = useNavigate();
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

  const postAuthrizationInfo = async (
    socialName: string,
    authorizationCode: string,
    state: string,
  ) => {
    // `/api/oauth/${socialName}`,
    // 	`https://918f89f3-ffda-4d81-9766-70caf106fd5b.mock.pstmn.io/api/oauth/naver/yes`,
    const { data }: AxiosResponse<LoginApi> = await axios.post(
      `https://918f89f3-ffda-4d81-9766-70caf106fd5b.mock.pstmn.io/api/oauth/naver/yes`,
      {
        authorizationCode,
        state,
      },
    );

    if (data.code === 200) {
      if (data.email !== undefined) {
        navigation('/register', {
          state: { email: data.email, ouathInfo: 'NAVER' },
        });
      } else {
        navigation('/home');
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
