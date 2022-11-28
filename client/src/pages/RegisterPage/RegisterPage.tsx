import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// api
import { postRegisterInfo } from '../../apis/api/loginApi';
// style
import S from './RegisterPageStyles';
// img
import defaultProfile from '../../static/defaultProfile.svg';
import plusBtn from '../../static/plusBtn.svg';
// component
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';
// hook
import useImage from '../../hooks/useImage';

type LocationStateType = { email: string; oauthInfo: 'NAVER' | 'KAKAO' };

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

  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    if (email === '') navigate('/');
  }, []);

  const onClickProfileImageBtn = () => {
    if (profileImageBtn.current) {
      profileImageBtn.current.click();
    }
  };

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(event.target.value);

  const onClickRegisterBtn = async () => {
    try {
      const data = await postRegisterInfo(
        email,
        nickname,
        oauthInfo,
        image.image,
      );
      if (data.statusCode === 201) navigate('/');
      // TODO 아닌 경우 처리 (닉네임이 중복인 경우, 일반적인 실패)
      // eslint-disable-next-line no-alert
      else alert(data.message);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <NormalTopBar buttonData={null} />
      <S.Body>
        <S.Form>
          <S.Title>신규 유저님 환영합니다!</S.Title>
          <S.Info>유저님의 추가 정보를 작성해주세요!</S.Info>
          <S.ProfileContainer>
            <img src={image.image64 as string} alt="Slot" />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={profileImageBtn}
              onChange={onChangeImage}
            />
            <button type="button" onClick={onClickProfileImageBtn}>
              <img src={plusBtn} alt="Add" />
            </button>
          </S.ProfileContainer>
          <S.InputContainer>
            <S.Input
              type="text"
              placeholder="당신의 별명은 무엇인가냥?"
              onChange={onChangeNickname}
            />
            <button type="button">중복 체크</button>
          </S.InputContainer>
          <S.SubmitButton
            type="button"
            onClick={onClickRegisterBtn}
            disabled={!nickname}
          >
            회원가입
          </S.SubmitButton>
        </S.Form>
      </S.Body>
    </>
  );
};

export default RegisterPage;
