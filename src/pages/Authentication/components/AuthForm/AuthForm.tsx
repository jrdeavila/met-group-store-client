import React, { useContext } from "react";
import styled from "styled-components";
import { Card, Row, Col } from "react-bootstrap";
import { Form, FormikProps, withFormik } from "formik";
import { Input } from "@/components";
import { BasicButton, GradientButton } from "@/styled-components";
import { AuthContext } from "../../context";
import { SignUpLink } from "../SignUpLink";
import { Crendentials, EndpointLoginToken } from "../../models";
import { authLoginRequest, authRegisterRequest } from "../../services";
import { useAuth, useFetchAndLoading } from "@/hooks";
import { SnackbarUtilities } from "@/utilities";
import { CreateAdapttedLoginToken } from "../../adapters";
import { FormikForm } from "./FormikForm";

export interface AuthFormInterface {}

const AuthForm: React.FC<AuthFormInterface> = () => {
  const { toggle, setToggle } = useContext(AuthContext);
  const { callEndpoint } = useFetchAndLoading<EndpointLoginToken>();
  const { login } = useAuth();

  const handleLogin = async (credentials: Crendentials) => {
    const res = await callEndpoint(authLoginRequest(credentials));
    const loginToken = res && CreateAdapttedLoginToken(res);
    login && loginToken && login(loginToken.token);
    login && loginToken && SnackbarUtilities.success("Login Sucessfull");
  };

  const handleRegister = async (credentials: Crendentials) => {
    const result = await callEndpoint(authRegisterRequest(credentials));
    const res = result && (await callEndpoint(authLoginRequest(credentials)));
    const loginToken = result && res && CreateAdapttedLoginToken(res);
    login && loginToken && login(loginToken.token);
    login && loginToken && SnackbarUtilities.success("Register Sucessfull");
  };

  const handleSubmit = (credentials: Crendentials) =>
    toggle ? handleRegister(credentials) : handleLogin(credentials);

  return (
    <AuthFormStyle>
      <Card>
        <Card.Body className="py-5 px-3">
          <Card.Title
            className="fs-1 text-center mb-4"
            style={{ userSelect: "none" }}
          >
            AUTHENTICATION
          </Card.Title>
          <div className="d-flex mb-3 border border-1 rounded-3">
            {!toggle ? (
              <GradientButton>Login</GradientButton>
            ) : (
              <BasicButton onClick={() => setToggle && setToggle(false)}>
                Login
              </BasicButton>
            )}
            {toggle ? (
              <GradientButton>Sign Up</GradientButton>
            ) : (
              <BasicButton onClick={() => setToggle && setToggle(true)}>
                Sing Up
              </BasicButton>
            )}
          </div>
          <FormikForm handle={handleSubmit} />
        </Card.Body>
      </Card>
    </AuthFormStyle>
  );
};

export const AuthFormStyle = styled.div`
  width: 25rem;
`;

export default AuthForm;
