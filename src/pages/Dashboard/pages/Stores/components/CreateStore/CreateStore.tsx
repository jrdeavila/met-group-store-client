import { useAppDispatch, useFetchAndLoading } from "@/hooks";
import { createAdapttedStore } from "@/pages/Dashboard/adapters/store.adapters";
import { EndpointStore, FormDataStore, Store } from "@/pages/Dashboard/models";
import { addStoreItem, updateStoreItem } from "@/redux";
import { SnackbarUtilities } from "@/utilities";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { postStoreItem, putStoreItem } from "@/pages/Dashboard/services";

import { FormikForm } from "./FormikForm";
export interface CreateStoreInterface {
  children: React.ReactNode;
  store?: Store;
}

const CreateStore: React.FC<CreateStoreInterface> = ({ children, store }) => {
  const [show, setShow] = useState(false);
  const { callEndpoint } = useFetchAndLoading<EndpointStore>();
  const dispatch = useAppDispatch();

  const handleCreate = async (value: FormDataStore) => {
    const res = await callEndpoint(postStoreItem(value.name));
    const newStore = res && createAdapttedStore(res);
    newStore && dispatch(addStoreItem(newStore));
    newStore && SnackbarUtilities.success("Store Created Successfull");
    newStore && setShow(false);
  };

  const handleUpdate = async (value: FormDataStore) => {
    const res = store && (await callEndpoint(putStoreItem(store.name, value)));
    const newStore = res && createAdapttedStore(res);
    newStore &&
      store &&
      dispatch(updateStoreItem({ oldStore: store, newStore }));
    newStore && SnackbarUtilities.success("Store Updated Successfull");
    newStore && setShow(false);
  };

  const handleSubmit = async (value: FormDataStore) => {
    store ? handleUpdate(value) : handleCreate(value);
  };

  return (
    <CreateStoreStyle onClick={() => setShow(true)}>
      {children}

      <Modal
        contentClassName="bg-transparent border-0"
        show={show}
        centered
        onHide={() => setShow(false)}
        onShow={() => setShow(true)}
      >
        <Modal.Body>
          <FormikForm handle={handleSubmit} name={store?.name} />
        </Modal.Body>
      </Modal>
    </CreateStoreStyle>
  );
};

export const CreateStoreStyle = styled.div``;

export default CreateStore;
