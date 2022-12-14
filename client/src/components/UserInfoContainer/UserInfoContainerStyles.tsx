import styled from 'styled-components';

const StatusWrap = styled.div`
  width: calc(85% - 3rem);
  height: calc(7.5rem - 2rem);
  padding: 1rem 1.5rem;

  background-color: ${(props) => props.theme.palette.inner};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const OuterContainer = styled.div`
  width: calc(85% - 3rem);
  max-width: 35rem;
  height: calc(7.5rem - 2rem);
  padding: 1rem 1.5rem;

  background-color: ${(props) => props.theme.palette.inner};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InnerContainerWrap = styled.div`
  position: relative;
  width: 70%;
  height: 100%;
`;

const Name = styled.p`
  font-weight: 590;
  font-size: 25px;
  line-height: 30px;

  margin-top: 0px;
  margin: 0.5rem 0rem;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CountSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  button {
    font-size: 16px;
    padding: 0px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  p {
    text-align: center;
    margin: 0px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: calc(85% - 2rem);
  max-width: 35rem;
  height: 2.5rem;
  background-color: ${(props) => props.theme.palette.inner};
  border-radius: 2rem;
  padding: 1rem;

  button {
    font-family: 'SF-Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 19px;
  }
`;

const FollowButton = styled.button<{ isFollow: boolean }>`
  width: 45%;
  height: 2.5rem;

  color: ${(props) => (props.isFollow ? '#000000' : '#ffffff')};
  background: ${(props) => (props.isFollow ? '#ffffff' : '#ff4646')};
  border: 1px solid
    ${(props) => (props.isFollow ? '#ff4646' : props.theme.palette.inner)};
  border-radius: 1rem;
  padding: 0px;

  font-weight: 510;
  font-size: 14px;
  line-height: 17px;
`;

const DMButton = styled.button`
  width: 45%;
  height: 2.5rem;

  color: #ffffff;
  background: ${(props) => props.theme.palette.main};
  border: 1px solid ${(props) => props.theme.palette.border};
  border-radius: 1rem;
  padding: 0px;
`;

const MenuBtn = styled.button`
  position: absolute;
  right: 0.4rem;
  top: 0.8rem;
  padding: 0px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default {
  StatusWrap,
  OuterContainer,
  InnerContainerWrap,
  Name,
  InnerContainer,
  CountSlot,
  ButtonContainer,
  FollowButton,
  DMButton,
  MenuBtn,
};
