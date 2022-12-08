import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// api
import { postRegisterInfo, postNameCheck } from '../../apis/api/loginApi';
// style
import S from './RegisterPageStyles';
// img
import defaultProfile from '../../static/defaultProfile.svg';
import plusBtn from '../../static/plusBtn.svg';
// component
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';
// hook
import useImage from '../../hooks/useImage';

interface LocationStateType {
  email: string;
  oauthInfo: 'NAVER' | 'KAKAO';
}

// TODO 내부에 이름 체크 로직이 아직 완벽하지 않고, 해당 로직을 custom hook 으로 빼자
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
  const [nameCheck, setNameCheck] = useState<boolean>(false);
  const [nameCheckP, setNameCheckP] =
    useState<string>('별명 중복 체크를 해주세요.');

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
    if (nameCheck) {
      setNameCheck(false);
      setNameCheckP('별명 중복 체크를 해주세요.');
    }
  };

  const onClickNameChekcBtn = async () => {
    if (nameCheck) return;
    try {
      const data = await postNameCheck(nickname);
      if (data.statusCode === 200) {
        setNameCheck(!data.data.isExist);
        setNameCheckP(
          data.data.isExist
            ? '이미 존재하는 별명입니다.'
            : '사용 가능한 별명입니다.',
        );
      } else setNameCheckP(data.message);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

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
              placeholder="별명을 입력해주세요."
              onChange={onChangeNickname}
            />
            <S.NameCheckButton
              type="button"
              onClick={onClickNameChekcBtn}
              checked={nameCheck}
            >
              중복 검사
            </S.NameCheckButton>
          </S.InputContainer>
          <S.NameCheckResult>{nameCheckP}</S.NameCheckResult>
          <S.SubmitButton
            type="button"
            onClick={onClickRegisterBtn}
            disabled={!nickname || !nameCheck}
          >
            회원가입
          </S.SubmitButton>
        </S.Form>
      </S.Body>
    </>
  );
};

export default RegisterPage;
