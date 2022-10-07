import { GradientButton } from "@/styled-components";
import { Input } from "@/components";
import { FormikProps, withFormik } from "formik";
import { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { Form } from "formik";
import { AuthContext } from "../../context";
import { Crendentials } from "../../models";
import { SignUpLink } from "../SignUpLink";
import * as yup from "yup";

const BasicForm = (props: FormikProps<Crendentials>) => {
  const { toggle, setToggle } = useContext(AuthContext);
  const { getFieldProps, errors, touched, isValid } = props;
  return (
    <Form>
      <Row>
        <Col md="12" className="mb-3">
          <Input
            {...getFieldProps("username")}
            error={touched.username && errors.username}
            placeholder="Username"
          />
        </Col>
        <Col md="12" className="mb-3">
          <Input
            {...getFieldProps("password")}
            error={touched.password && errors.password}
            placeholder="Password"
            type="password"
          />
        </Col>
        <Col md="12" className="mb-4">
          <GradientButton type="submit" disabled={!isValid}>
            {toggle ? "Sign Up" : "Login"}
          </GradientButton>
        </Col>
        <Col md="12">
          {toggle ? (
            <SignUpLink
              text="Are already a Member?"
              link="Login Now"
              action={() => setToggle && setToggle(false)}
            />
          ) : (
            <SignUpLink
              text="Not a Member?"
              link="Signup Now"
              action={() => setToggle && setToggle(true)}
            />
          )}
        </Col>
      </Row>
    </Form>
  );
};

const scheme = yup.object().shape({
  username: yup.string().required().label("Username"),
  password: yup.string().required().label("Password"),
});

interface FormikFormProps {
  username?: string;
  toggle?: boolean;
  handle: (credentials: Crendentials) => void;
}

export const FormikForm = withFormik<FormikFormProps, Crendentials>({
  mapPropsToValues: (props) => ({
    username: props.username ?? "",
    password: "",
  }),
  handleSubmit: (values, form) => form.props.handle(values),
  validationSchema: scheme,
})(BasicForm);
