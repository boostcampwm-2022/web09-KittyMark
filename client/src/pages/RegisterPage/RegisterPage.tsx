import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// type
import { AxiosError } from 'axios';
// api
import { postRegisterInfo } from '../../apis/api/loginApi';
// hook
import useImage from '../../hooks/useImage';
import useNickName from '../../hooks/useNickname';
// style
import S from './RegisterPageStyles';
// component
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';
// img
import defaultProfile from '../../static/defaultProfile.svg';
import plusBtn from '../../static/plusBtn.svg';

interface LocationStateType {
  email: string;
  oauthInfo: 'NAVER' | 'KAKAO';
}

// TODO 만일 사용자가 이상한 주소로 register page 에 접근한다면 어떻게 해야 할까?
const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, oauthInfo }: LocationStateType = location.state
    ? (location.state as LocationStateType)
    : { email: '', oauthInfo: 'NAVER' };

  const profileImageBtn = useRef<HTMLInputElement>(null);

  const { image, onChangeImage } = useImage({
    image: null,
    image64: defaultProfile,
  });
  const [{ nickname, checkResult, resultMessage }, setNickname, checkNickname] =
    useNickName('');

  useEffect(() => {
    if (email === '') navigate('/');
  }, []);

  const onClickProfileImageBtn = () => {
    if (profileImageBtn.current) {
      profileImageBtn.current.click();
    }
  };

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const onClickNameChekcBtn = () => {
    checkNickname();
  };

  const onClickRegisterBtn = async () => {
    try {
      const data = await postRegisterInfo(
        email,
        nickname,
        oauthInfo,
        image.image,
      );
      if (data.statusCode === 201) navigate('/', { replace: true });
      // eslint-disable-next-line no-alert
      else alert(data.message);
    } catch (error) {
      // eslint-disable-next-line no-console
      if (error instanceof AxiosError) console.log(error);
    }
  };

  return (
    <>
      <NormalTopBar buttonData={null} />
      <S.Body>
        <S.Form>
          <S.Title>
            Kitty Mark에 오신 것을
            <br />
            환영합니다!
          </S.Title>
          <S.Info>회원가입을 위해 추가 정보를 입력해주세요.</S.Info>
          <S.ProfileContainer>
            <S.Thumbnail src={image.image64 as string} alt="Slot" />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={profileImageBtn}
              onChange={onChangeImage}
            />
            <button type="button" onClick={onClickProfileImageBtn}>
              <S.ButtonImg src={plusBtn} alt="Add" />
            </button>
          </S.ProfileContainer>
          <S.InputContainer>
            <S.Input
              type="text"
              placeholder="이름을 입력해주세요."
              onChange={onChangeNickname}
            />
            <S.NameCheckButton
              type="button"
              onClick={onClickNameChekcBtn}
              checked={checkResult}
            >
              중복 검사
            </S.NameCheckButton>
          </S.InputContainer>
          <S.NameCheckResult>{resultMessage}</S.NameCheckResult>
          <S.SubmitButton
            type="button"
            onClick={onClickRegisterBtn}
            disabled={!nickname || !checkResult}
          >
            회원가입
          </S.SubmitButton>
        </S.Form>
      </S.Body>
    </>
  );
};

export default RegisterPage;
