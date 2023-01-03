import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import { validate } from '../apis/api/loginApi';
import user from '../store/userAtom';

const useLoginCheck = () => {
  const [userData, setUserData] = useRecoilState(user);

  const isLoginCheck = async (): Promise<boolean> => {
    if (userData.userId === -1 || userData.userName) return false;
    try {
      const data = await validate();
      if (data.statusCode === 200) return true;
      if (data.statusCode === 401) {
        setUserData({ userId: -1, userName: '', userProfileUrl: '' });
        return false;
      }
    } catch (error) {
      if (error instanceof AxiosError)
        // eslint-disable-next-line no-alert
        alert('로그인 과정 중 오류가 발생했습니다.');
      return false;
    }
    return false;
  };

  return isLoginCheck;
};

export default useLoginCheck;
