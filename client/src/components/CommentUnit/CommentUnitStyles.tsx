import styled from 'styled-components';

const UnitWrap = styled.div`
  position: relative;
  width: 100%;
  font-family: 'SF-Pro';
  font-style: normal;
  font-weight: 400;
`;

const InfoContainer = styled.div`
  width: 100%;
  max-height: 2.5rem;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  justify-content: flex-start;
  align-items: center;

  .user-name {
    margin: 0px;
    font-weight: 590;
    font-size: 16px;
    line-height: 20px;
  }

  .time {
    margin: 0px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #9b9b9b;
  }
`;

const Content = styled.p`
  margin: 0px;
  padding-left: 1rem;
  padding-top: 0.5rem;
  font-size: 16px;
  line-height: 20px;
`;

const MenuBtn = styled.button`
  position: absolute;
  right: 0.52rem;
  top: 0.4rem;
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
  UnitWrap,
  InfoContainer,
  Content,
  MenuBtn,
};
