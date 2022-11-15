import React from 'react';
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
	return (
		<>
			<NormalTopBar />
			<RegisterPageBody>
				<RegisterForm>
					<p className="wellcome-title">신규 유저님 환영합니다!</p>
					<p className="wellcome-info">유저님의 추가 정보를 작성해주세요!</p>
					<ImageSlot>
						<img src={defaultProfile} alt="Slot" />
						<input type="file" style={{ display: 'none' }} />
						<button className="input-button" type="button">
							<img src={plusBtn} alt="Add" />
						</button>
					</ImageSlot>
					<input
						className="nickname-input"
						type="text"
						placeholder="당신의 별명은 무엇인가냥?"
					/>
					<button className="submit-button" type="button">
						회원가입
					</button>
				</RegisterForm>
			</RegisterPageBody>
		</>
	);
};

export default RegisterPage;
