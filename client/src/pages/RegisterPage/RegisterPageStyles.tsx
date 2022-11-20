import styled from 'styled-components';

const RegisterPageBody = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.palette.back};

  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;
`;

const RegisterForm = styled.form`
  width: 17rem;
  height: 27rem;
  background: ${(props) => props.theme.palette.main};
  border-radius: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 20px;

  padding: 52px 49px 32px 49px;

  * {
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
  }

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
    background-color: ${(props) => props.theme.palette.back};
    border: 1px solid ${(props) => props.theme.palette.border};
    padding: 0px 10px;

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
    border: 1px solid ${(props) => props.theme.palette.border};
    border-radius: 1rem;
    font-size: 20px;
    line-height: 25px;

    cursor: pointer;

    &:disabled {
      background-color: #d4d4d4;
    }
  }
`;

const ImageSlot = styled.div`
  width: 6rem;
  height: 6rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.palette.back};
  border: 1px solid ${(props) => props.theme.palette.border};
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
    border: 1px solid ${(props) => props.theme.palette.border};
    border-radius: 1.25rem;
    cursor: pointer;
  }
`;

export { RegisterPageBody, RegisterForm, ImageSlot };
