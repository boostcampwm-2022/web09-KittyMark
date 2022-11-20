import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import uploadFile from '../../utils/awsUpload';
// style
import {
  RegisterPageBody,
  RegisterForm,
  ImageSlot,
} from './RegisterPageStyles';
// img
import defaultProfile from '../../static/defaultProfile.svg';
import plusBtn from '../../static/plusBtn.svg';
// component
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';
// type
import { Api } from '../../types/responseData';

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, oauthInfo } = location.state
    ? (location.state as { email: string; oauthInfo: string })
    : { email: '', oauthInfo: '' };

  const profileImageBtn = useRef<HTMLInputElement>(null);
  const registerBtn = useRef<HTMLButtonElement>(null);

  const [profileImage, setProfileImage] = useState<File>();
  const [base64Image, setBase64Image] = useState<string | ArrayBuffer>(
    defaultProfile,
  );
  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    if (email === '' || oauthInfo === '') navigate('/');
  }, []);

  const onClickProfileImageBtn = () => {
    if (profileImageBtn.current) {
      profileImageBtn.current.click();
    }
  };

  const onChangeProfileImage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files;
      setProfileImage(file[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) setBase64Image(base64);
      };
      reader.readAsDataURL(file[0]);
    }
  };

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(event.target.value);

  const onClickRegisterBtn = async () => {
    let imageUrl = './defaultProfile.svg';
    if (profileImage) imageUrl = await uploadFile(profileImage);

    // '/api/auth/register',
    // 	`https://918f89f3-ffda-4d81-9766-70caf106fd5b.mock.pstmn.io/api/auth/register`,
    const { data }: AxiosResponse<Api> = await axios.post(
      `https://918f89f3-ffda-4d81-9766-70caf106fd5b.mock.pstmn.io/api/auth/register`,
      {
        email,
        imageURL: imageUrl,
        userName: nickname,
        oauthInfo,
      },
    );

    if (data.code === 200) navigate('/home');

    // TODO 아닌 경우 처리 (닉네임이 중복인 경우, 일반적인 실패)
  };

  return (
    <>
      <NormalTopBar />
      <RegisterPageBody>
        <RegisterForm>
          <p className="wellcome-title">신규 유저님 환영합니다!</p>
          <p className="wellcome-info">유저님의 추가 정보를 작성해주세요!</p>
          <ImageSlot>
            <img src={base64Image as string} alt="Slot" />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={profileImageBtn}
              onChange={onChangeProfileImage}
            />
            <button
              className="input-button"
              type="button"
              onClick={onClickProfileImageBtn}
            >
              <img src={plusBtn} alt="Add" />
            </button>
          </ImageSlot>
          <input
            className="nickname-input"
            type="text"
            placeholder="당신의 별명은 무엇인가냥?"
            onChange={onChangeNickname}
          />
          <button
            ref={registerBtn}
            className="submit-button"
            type="button"
            onClick={onClickRegisterBtn}
            disabled={!nickname}
          >
            회원가입
          </button>
        </RegisterForm>
      </RegisterPageBody>
    </>
  );
};

export default RegisterPage;
