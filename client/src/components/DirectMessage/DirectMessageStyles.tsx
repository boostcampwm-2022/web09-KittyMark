import styled from 'styled-components';

const Body = styled.div`
  width: 100%;
`;

const ReceivedWrapper = styled.div`
  display: flex;
  justify-content: left;
  gap: 0.5rem;
  align-items: flex-end;

  .img {
    width: 1rem;
    height: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
`;

const Message = styled.div`
  max-width: 60%;
  padding: 2% 3%;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  text-align: left;
  word-break: break-all;
`;

export default { Body, ReceivedWrapper, Wrapper, Message };
