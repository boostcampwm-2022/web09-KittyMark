import styled from 'styled-components';

const CommentPageBody = styled.div`
  width: 100vw;
  height: calc(100vh - 10rem);

  padding: 1rem 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const CommentListContainer = styled.div`
  width: 90vw;
  height: calc((100vh - 10rem) / 10 * 8.5);
  background-color: ${(props) => props.theme.palette.inner};
  border-radius: 2rem;
  border: 1px solid ${(props) => props.theme.palette.border};
  display: flex;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  .inner-container {
    margin: auto;
    width: calc(92% - 2rem);
    height: calc(95% - 2rem);
    padding: 1rem 1rem;
    background-color: ${(props) => props.theme.palette.back};
    border-radius: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
  }
`;

const CommentPageStatus = styled.p`
  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;

  text-align: center;
  margin: 5rem auto;
`;

export { CommentPageBody, CommentListContainer, CommentPageStatus };
