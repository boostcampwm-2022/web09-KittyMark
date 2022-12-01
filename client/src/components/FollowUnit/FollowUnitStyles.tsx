import styled from 'styled-components';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 3rem;
  width: 80%;
  * {
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const FollowButton = styled.button<{ isFollow: boolean }>`
  width: 5rem;
  height: 1.5rem;
  border: 1px solid
    ${(props) => (props.isFollow ? props.theme.palette.border : '#ff4646')};
  border-radius: 1rem;
  padding: 0px;

  color: ${(props) => (props.isFollow ? '#000000' : '#ffffff')};
  background: ${(props) => (props.isFollow ? '#ffffff' : '#ff4646')};

  cursor: pointer;

  font-size: 12px;
  line-height: 15px;
`;

export default { OuterContainer, InnerContainer, FollowButton };
