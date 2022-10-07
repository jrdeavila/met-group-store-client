import styled from "styled-components";

export const ButtonStyle = styled.button`
  width: 100%;
  height: 50px;
  font-size: 18px;
  color: var(--bs-white);
  background: linear-gradient(90deg, var(--bs-secondary), var(--bs-info));
  border-radius: var(--bs-border-radius);
  padding: 10px 20px;
  text-align: center;
  border: none;

  :disabled {
    opacity: 0.4;
  }
`;

export default ButtonStyle;
