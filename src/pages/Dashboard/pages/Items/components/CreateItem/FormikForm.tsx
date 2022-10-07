import { Input, Select, SpinnerLoading } from "@/components";
import {
  useAppDispatch,
  useAppSelector,
  useAsync,
  useFetchAndLoading,
} from "@/hooks";
import { createAdapttedStoreList } from "@/pages/Dashboard/adapters/store.adapters";
import {
  EndpointStoreCollection,
  FormDataEditItem,
} from "@/pages/Dashboard/models";
import { getStores } from "@/pages/Dashboard/services";
import { addStores, resetStores, StoreSelector } from "@/redux";
import { GradientButton } from "@/styled-components";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormikProps, withFormik } from "formik";
import { Card, Col, Row } from "react-bootstrap";
import * as yup from "yup";

const BasicForm = (props: FormikProps<FormDataEditItem>) => {
  const stores = useAppSelector(StoreSelector);

  const { loading, callEndpoint } =
    useFetchAndLoading<EndpointStoreCollection>();
  const dispatch = useAppDispatch();
  const promise = async () => callEndpoint(getStores());
  const result = (value: EndpointStoreCollection | undefined) => {
    const stores = value && createAdapttedStoreList(value);
    stores && dispatch(addStores(stores));
  };

  useAsync<EndpointStoreCollection | undefined>(
    promise,
    result,
    () => {
      return () => dispatch(resetStores);
    },
    [!stores]
  );

  const { getFieldProps, touched, errors, isValid } = props;
  return (
    <>
      {loading ? (
        <div className="h-100 d-flex justify-content-center align-items-center text-white">
          <SpinnerLoading />
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title className="mb-5">
              <div className="d-flex justify-content-center align-items-center gap-3 w-100 fs-2">
                <FontAwesomeIcon icon={faStore} />
                <div>Item Information</div>
              </div>
            </Card.Title>
            <Form>
              <Row>
                <Col md="8" className="mb-3">
                  <Input
                    error={touched.name && errors.name}
                    {...getFieldProps("name")}
                    placeholder="Name"
                  />
                </Col>
                <Col md="4" className="mb-3">
                  <Input
                    error={touched.price && errors.price}
                    {...getFieldProps("price")}
                    placeholder="Price"
                    type="number"
                  />
                </Col>
                <Col md="12" className="mb-5">
                  <Select
                    error={touched.store_id && errors.store_id}
                    {...getFieldProps("store_id")}
                    placeholder="Store"
                  >
                    {stores.map((e, i) => (
                      <option key={i} value={e.id} label={e.name} />
                    ))}
                  </Select>
                </Col>
                <Col md="12">
                  <GradientButton disabled={!isValid} type="submit">
                    Save
                  </GradientButton>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export interface FormikFormProps {
  handle: (value: FormDataEditItem) => void;
  name?: string;
  price?: number;
  storeId?: number;
}

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  price: yup.number().required().label("Price"),
  store_id: yup.number().required().label("Store"),
});

const FormikForm = withFormik<FormikFormProps, FormDataEditItem>({
  mapPropsToValues: (props) => ({
    name: props.name ?? "",
    price: props.price ?? 0,
    store_id: props.storeId ?? 1,
  }),
  validationSchema: schema,
  handleSubmit: (values, form) => form.props.handle(values),
})(BasicForm);

export default FormikForm;
