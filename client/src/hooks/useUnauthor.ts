import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import user from '../store/userAtom';
import { Api } from '../types/responseData';

const useUnauthCheck = () => {
  const setUserData = useSetRecoilState(user);
  const navigate = useNavigate();

  const unauthCheck = useCallback((error: AxiosError<Api>) => {
    if (
      error.response &&
      error.response.data.statusCode === 401 &&
      error.response.data.error === 'Unauthorized'
    ) {
      setUserData({ userId: -1, userName: '', userProfileUrl: '' });
      navigate('/', { replace: true });
    }
  }, []);

  return unauthCheck;
};

export default useUnauthCheck;
