import styled from 'styled-components';

const Form = styled.form`
  width: calc(100% - 2rem);
  height: calc(100vh - 10rem);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;

  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;
`;

const Textarea = styled.textarea`
  width: calc(100% - 3rem);
  height: 10rem;
  background-color: ${(props) => props.theme.palette.back};
  border: 1px solid ${(props) => props.theme.palette.border};
  border-radius: 2rem;
  padding: 1.5rem;

  resize: none;

  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export default { Form, Textarea };
