import React from "react";
import styled from "styled-components";
export interface SignUpLinkInterface {
  text: string;
  link: string;
  action: Function;
}

const SignUpLink: React.FC<SignUpLinkInterface> = ({ text, link, action }) => {
  return (
    <SignUpLinkStyle>
      <div className="text">{text}</div>
      <div className="link" onClick={() => action()}>
        {link}
      </div>
    </SignUpLinkStyle>
  );
};

export const SignUpLinkStyle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  user-select: none;

  .text {
    margin-right: 1rem;
  }

  .link {
    color: var(--bs-secondary);
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

export default SignUpLink;
