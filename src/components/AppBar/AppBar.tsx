import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks";

export interface AppBarInterface {}

const BasicAppBar: React.FC<AppBarInterface> = () => {
  const { token, logout } = useAuth();
  return (
    <AppBarStyle>
      <div className="d-flex justify-content-between align-items-center w-100 px-5">
        <Link
          className="text-uppercase fw-bolder fs-2 text-decoration-none"
          to="/"
        >
          {import.meta.env.VITE_APP_NAME}
        </Link>
        {token && (
          <div onClick={() => logout && logout()} className="logout-button">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <div className="login-button-label">{"Logout"}</div>
          </div>
        )}
      </div>
    </AppBarStyle>
  );
};

export const AppBarStyle = styled(Navbar)`
  min-height: 80px;
  width: inherit;
  position: fixed;
  z-index: 900;
  user-select: none;
  background-color: inherit;

  .logout-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    background-color: var(--bs-primary);
    padding: 0.5rem 1rem;
    color: var(--bs-gray-100);
    font-weight: bolder;
    font-size: 16px;
    border-radius: 10px;
    * {
      margin-right: 10px;
    }
    @media (max-width: 500px) {
      .login-button-label {
        display: none;
      }

      * {
        margin-right: 0;
      }
    }
  }
`;

export default BasicAppBar;
