import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
// api
import { postNameCheck } from '../apis/api/loginApi';

interface Nickname {
  nickname: string;
  checkResult: boolean;
  resultMessage:
    | '별명 중복 체크를 해주세요.'
    | '이미 존재하는 별명입니다.'
    | '사용 가능한 별명입니다.';
}

const useNickName = (
  initalName: string,
): [Nickname, (newName: string) => void, () => void] => {
  const [nameObj, setNameObj] = useState<Nickname>({
    nickname: initalName,
    checkResult: false,
    resultMessage: '별명 중복 체크를 해주세요.',
  });

  // 사용자 입력에 따라서 값을 바꿔준다.
  const setNickname = (newName: string) => {
    setNameObj({
      nickname: newName,
      checkResult: false,
      resultMessage: '별명 중복 체크를 해주세요.',
    });
  };

  // 사용자가 중복 검사를 눌렀을 경우
  const checkNickname = useCallback(async () => {
    if (nameObj.nickname === '') return;
    try {
      const data = await postNameCheck(nameObj.nickname);
      if (data.statusCode === 200)
        setNameObj((prev) => ({
          ...prev,
          checkResult: !data.data.isExist,
          resultMessage: data.data.isExist
            ? '이미 존재하는 별명입니다.'
            : '사용 가능한 별명입니다.',
        }));
    } catch (error) {
      // eslint-disable-next-line no-console
      if (error instanceof AxiosError) console.log(error);
    }
  }, [nameObj]);

  return [nameObj, setNickname, checkNickname];
};

export default useNickName;