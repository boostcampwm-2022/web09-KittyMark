import React, { useRef, useState } from 'react';
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

const RegisterPage = () => {
	const profileImageBtn = useRef<HTMLInputElement>(null);
	const registerBtn = useRef<HTMLButtonElement>(null);
	const [profileImage, setProfileImage] = useState<File>();
	const [base64Image, setBase64Image] = useState<string | ArrayBuffer>(
		defaultProfile,
	);
	const [nickname, setNickname] = useState<string>('');

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

	const onClickRegisterBtn = (): number => {
		// 전송 방법이나 url 설정이 완료되면 수정할 예정
		if (nickname && profileImage) return 1;
		return 0;
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
					>
						회원가입
					</button>
				</RegisterForm>
			</RegisterPageBody>
		</>
	);
};

export default RegisterPage;
