import styled from 'styled-components';

const CommentUnitWrap = styled.div`
  position: relative;
  width: 100%;
  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;
`;

const CommentInfoContainer = styled.div`
  width: 100%;
  max-height: 2.5rem;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  justify-content: flex-start;
  align-items: center;

  .user-name {
    margin: 0px;
    font-size: 18px;
    line-height: 22px;
  }

  .time {
    margin: 0px;
    padding-top: 0.25rem;
    font-size: 12px;
    line-height: 15px;
    color: #9b9b9b;
  }
`;

const CommentContent = styled.p`
  margin: 0px;
  padding-left: 1rem;
  padding-top: 0.5rem;
  font-size: 18px;
  line-height: 22px;
`;

const CommentMenuBtn = styled.button`
  position: absolute;
  right: 0px;
  top: 0.65rem;
  padding: 0px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export {
  CommentUnitWrap,
  CommentInfoContainer,
  CommentContent,
  CommentMenuBtn,
};
