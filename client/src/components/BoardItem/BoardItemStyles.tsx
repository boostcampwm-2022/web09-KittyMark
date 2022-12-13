import styled from 'styled-components';

const BoardBackground = styled.div`
  padding-bottom: 0.7rem;
  max-width: 28rem;
  width: 97%;
  border-radius: 5px;
  background-color: ${(props) => props.theme.palette.inner};
  border: 1px solid ${(props) => props.theme.palette.border};
  display: flex;
  flex-direction: column;
  align-items: center;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  font-family: 'SF-Pro';
  font-style: normal;
`;

export default BoardBackground;
