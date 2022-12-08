import React, { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
// recoil
import user from '../../store/userAtom';
import userProfile from '../../store/userProfileAtom';
// style
import S from './ModifyUserPageStyles';
// hook
import useImage from '../../hooks/useImage';
// api
import { postNameCheck } from '../../apis/api/loginApi';
import { putUserImage, patchUserInfo } from '../../apis/api/userApi';
// img
import defaultProfile from '../../static/defaultProfile.svg';
import plusBtn from '../../static/plusBtn.svg';
// component
import TopBar from '../../components/TopBar/TopBar';
import { Api } from '../../types/responseData';

const ModifyUserPage = () => {
  const navigation = useNavigate();

  const [{ userId, userName }, setUserInfo] = useRecoilState(user);
  const profile = useRecoilValue(userProfile);
  const profileImageBtn = useRef<HTMLInputElement>(null);
  const { image, onChangeImage } = useImage({
    image: null,
    image64: profile || defaultProfile,
  });
  const [nickname, setNickname] = useState<string>(userName);
  const [nameCheck, setNameCheck] = useState<boolean>(true);
  const [nameCheckP, setNameCheckP] = useState<string>(
    '기존 별명은 그대로 사용 가능합니다.',
  );

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
    if (userName === nickname) {
      setNameCheck(true);
      setNameCheckP('기존 별명은 그대로 사용 가능합니다.');
      return;
    }
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

  const onClickModifyBtn = async () => {
    try {
      let data: Api;
      if (userName !== nickname)
        data = await patchUserInfo(userId, nickname, image.image);
      else data = await putUserImage(userId, image.image);
      if (data.statusCode === 200) {
        setUserInfo((prev) => ({ userId: prev.userId, userName: nickname }));
        navigation(`/user/${nickname}/${userId}`);
      }
      // eslint-disable-next-line no-alert
      else alert(data.message);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <TopBar
        isBack
        title={userName}
        isCheck={false}
        backFunc={() => navigation(-1)}
      />
      <S.Body>
        <S.Form>
          <S.Title>유저 정보 수정 페이지</S.Title>
          <S.Info>사진과 닉네임 변경이 가능합니다.</S.Info>
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
              value={nickname}
              placeholder="바꿀 별명은 무엇인가냥?"
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
            onClick={onClickModifyBtn}
            disabled={!nickname || !nameCheck}
          >
            정보수정
          </S.SubmitButton>
        </S.Form>
      </S.Body>
    </>
  );
};

export default ModifyUserPage;
