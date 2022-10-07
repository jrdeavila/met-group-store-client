import styled from "@emotion/styled";
import { Field } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
export interface SelectInterface
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: any;
  children: React.ReactNode;
}

const Select: React.FC<SelectInterface> = (props) => {
  const { label, error, children } = props;
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <SelectStyle {...{ ...props, className: "form-control" }} as="select">
        {children}
      </SelectStyle>
      {error && (
        <Form.Control.Feedback className="d-block" type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

const SelectStyle = styled(Field)`
  height: 50px;
  font-size: 18px;
  border-radius: var(--bs-border-radius);
`;

export default Select;
