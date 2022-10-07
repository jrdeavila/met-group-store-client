import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { Form, FormikProps, withFormik } from "formik";
import { Input } from "@/components";
import { FormDataStore } from "@/pages/Dashboard/models";
import { GradientButton } from "@/styled-components";
import * as yup from "yup";

export const BasicForm = (props: FormikProps<FormDataStore>) => {
  const { getFieldProps, isValid, errors, touched } = props;
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="mb-5">
            <div className="d-flex justify-content-center align-items-center gap-3 w-100 fs-2">
              <FontAwesomeIcon icon={faStore} />
              <div>Store Information</div>
            </div>
          </Card.Title>
          <Card.Subtitle>
            <Form>
              <Row className="gap-3">
                <Col md="12">
                  <Input
                    {...getFieldProps("name")}
                    placeholder="Name"
                    error={touched.name && errors.name}
                  />
                </Col>
                <Col md="12">
                  <GradientButton disabled={!isValid} type="submit">
                    Save
                  </GradientButton>
                </Col>
              </Row>
            </Form>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
};

export interface FormikFormProps {
  name?: string;
  handle: (values: FormDataStore) => void;
}

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
});

export const FormikForm = withFormik<FormikFormProps, FormDataStore>({
  mapPropsToValues: (props) => ({
    name: props.name ?? "",
  }),
  validationSchema: schema,
  handleSubmit: (values, form) => form.props.handle(values),
})(BasicForm);
