import styled from 'styled-components';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 3rem;
  width: 80%;

  * {
    font-family: 'SF-Pro';
    font-style: normal;
    font-weight: 590;
    font-size: 15px;
    line-height: 18px;
  }
`;

const InnerContainer = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DmContentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.p`
  margin: 0px;
  font-weight: 590;
  font-size: 15px;
  line-height: 18px;
`;

const Message = styled.p`
  margin: 0px;
  text-align: left;
  width: 65%;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Time = styled.p`
  margin: 0px;
  width: 25%;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  color: #7e7656;
`;

export default {
  OuterContainer,
  Name,
  Message,
  Time,
  InnerContainer,
  DmContentContainer,
};
