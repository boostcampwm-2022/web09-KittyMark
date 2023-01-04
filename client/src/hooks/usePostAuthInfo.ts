import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import user from '../store/userAtom';
import { LoginApi, RedirectApi } from '../types/responseData';
import { postAuthInfo } from '../apis/api/loginApi';

const useOauthCheck = () => {
  const setUserData = useSetRecoilState(user);
  const navigate = useNavigate();

  const oauthCheck = useCallback(
    async (
      socialName: 'naver' | 'github',
      authorizationCode: string,
      state: string,
    ) => {
      let data: LoginApi | RedirectApi;
      try {
        data = await postAuthInfo(socialName, authorizationCode, state);
        // 로그인 성공
        if (data.statusCode === 200) {
          data = data as LoginApi;
          setUserData({
            userId: data.data.userId,
            userName: data.data.userName,
            userProfileUrl: data.data.userProfileUrl,
          });
          navigate('/home', { replace: true });
          return;
        }
        // 그 외의 경우를 처리한다.
        navigate('/', { replace: true });
        return;
      } catch (error) {
        if (error instanceof AxiosError) {
          // 회원 가입
          if (error.response?.status === 300) {
            data = error.response?.data as RedirectApi;
            navigate('/register', {
              state: { email: data.data.email, oauthInfo: data.data.oauthInfo },
              replace: true,
            });
            return;
          }
          // eslint-disable-next-line no-console
          console.log(error);
        }
        navigate('/', { replace: true });
      }
    },
    [],
  );

  return oauthCheck;
};

export default useOauthCheck;
