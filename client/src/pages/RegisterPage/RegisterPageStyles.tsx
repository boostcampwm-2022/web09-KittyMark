import styled from 'styled-components';

const RegisterPageBody = styled.div`
	width: 100%;
	height: calc(100vh - 4rem);
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fffbed;

	font-family: 'Jua';
	font-style: normal;
	font-weight: 400;
`;

const RegisterForm = styled.form`
	width: 17rem;
	height: 27rem;
	background: #ffe99c;
	border-radius: 35px;
	display: flex;
	flex-direction: column;
	align-items: center;

	gap: 20px;

	padding: 52px 49px 32px 49px;

	.wellcome-title {
		margin: 0px;
		font-size: 30px;
		line-height: 38px;
	}

	.wellcome-info {
		margin: 0px;
		font-size: 20px;
		line-height: 25px;
	}

	.nickname-input {
		width: 14rem;
		height: 3rem;
		border-radius: 1rem;
		background-color: #ffffff;
		border: 1px solid #ffc700;
		padding: 0px 10px;

		font-family: 'Jua';
		font-style: normal;
		font-weight: 400;

		cursor: pointer;

		&::placeholder {
			font-size: 15px;
			line-height: 19px;
			color: #9b9b9b;
		}
	}

	.submit-button {
		width: 9.5rem;
		height: 3rem;
		background: #ff9c9c;
		border: 1px solid #ffc700;
		border-radius: 1rem;

		font-family: 'Jua';
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		line-height: 25px;

		cursor: pointer;
	}
`;

const ImageSlot = styled.div`
	width: 6rem;
	height: 6rem;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #ffffff;
	border: 1px solid #ffc700;
	border-radius: 3rem;

	img {
		width: 100%;
		height: 100%;
		border-radius: 3rem;
	}

	.input-button {
		position: absolute;
		top: 4rem;
		left: 4rem;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #bcc7ff;
		border: 1px solid #ffc700;
		border-radius: 1.25rem;
		cursor: pointer;
	}
`;

export { RegisterPageBody, RegisterForm, ImageSlot };
