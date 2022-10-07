import React from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import { Field } from "formik";
export interface InputInterface
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: any;
}

const Input: React.FC<InputInterface> = (props) => {
  const { label, error } = props;
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <InputStyle {...{ ...props, className: "form-control" }} />
      {error && (
        <Form.Control.Feedback className="d-block" type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export const InputStyle = styled(Field)`
  height: 50px;
  font-size: 18px;
  border-radius: var(--bs-border-radius);
`;

export default Input;
