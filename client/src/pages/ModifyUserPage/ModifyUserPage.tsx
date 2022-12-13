import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
// recoil
import user from '../../store/userAtom';
// style
import S from './ModifyUserPageStyles';
// hook
import useImage from '../../hooks/useImage';
import useNickName from '../../hooks/useNickname';
// api
import { putUserImage, patchUserInfo } from '../../apis/api/userApi';
// img
import defaultProfile from '../../static/defaultProfile.svg';
import plusBtn from '../../static/plusBtn.svg';
// component
import TopBar from '../../components/TopBar/TopBar';
import { ModifyUserApi } from '../../types/responseData';

const ModifyUserPage = () => {
  const navigate = useNavigate();

  const [{ userId, userName, userProfileUrl }, setUserInfo] =
    useRecoilState(user);
  const profileImageBtn = useRef<HTMLInputElement>(null);
  const { image, onChangeImage } = useImage({
    image: null,
    image64: userProfileUrl || defaultProfile,
  });

  const [nameObj, setNickname, checkNickname] = useNickName(
    userName,
    true,
    '기존 별명은 그대로 사용 가능합니다.',
  );

  const onClickProfileImageBtn = () => {
    if (profileImageBtn.current) {
      profileImageBtn.current.click();
    }
  };

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const onClickNameChekcBtn = async () => {
    checkNickname();
  };

  const onClickModifyBtn = async () => {
    if (userName === nameObj.nickname && !image.image) {
      navigate(`/user/${userName}/${userId}`);
      return;
    }
    try {
      let data: ModifyUserApi;
      if (userName !== nameObj.nickname)
        data = await patchUserInfo(userId, nameObj.nickname, image.image);
      else data = await putUserImage(userId, image.image);
      if (data.statusCode === 200) {
        setUserInfo((prev) => ({
          userId: prev.userId,
          userName: nameObj.nickname,
          userProfileUrl: data.data?.profileUrl || prev.userProfileUrl,
        }));
        navigate(`/user/${nameObj.nickname}/${userId}`);
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
        backFunc={() => navigate(-1)}
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
              value={nameObj.nickname}
              placeholder="별명을 입력해주세요."
              onChange={onChangeNickname}
            />
            <S.NameCheckButton
              type="button"
              onClick={onClickNameChekcBtn}
              checked={nameObj.checkResult}
            >
              중복 검사
            </S.NameCheckButton>
          </S.InputContainer>
          <S.NameCheckResult>{nameObj.resultMessage}</S.NameCheckResult>
          <S.SubmitButton
            type="button"
            onClick={onClickModifyBtn}
            disabled={!nameObj.nickname || !nameObj.checkResult}
          >
            정보수정
          </S.SubmitButton>
        </S.Form>
      </S.Body>
    </>
  );
};

export default ModifyUserPage;
