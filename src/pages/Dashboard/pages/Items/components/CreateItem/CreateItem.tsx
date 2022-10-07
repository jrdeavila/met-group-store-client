import { useFetchAndLoading, useAppDispatch } from "@/hooks";
import { createAdapttedItem } from "@/pages/Dashboard/adapters/item.adapters";
import { formEditToFormDataItem } from "@/pages/Dashboard/adapters/store.adapters";
import {
  EndpointItem,
  FormDataEditItem,
  FormDataItem,
  Item,
} from "@/pages/Dashboard/models";
import { postItem, putItem } from "@/pages/Dashboard/services";
import { addItem, updateItem } from "@/redux";
import { SnackbarUtilities } from "@/utilities";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import FormikForm from "./FormikForm";
export interface CreateItemInterface {
  children: React.ReactNode;
  item?: Item;
}

const CreateItem: React.FC<CreateItemInterface> = ({ children, item }) => {
  const [show, setShow] = useState(false);
  const { callEndpoint } = useFetchAndLoading<EndpointItem>();
  const dispatch = useAppDispatch();

  const handleCreate = async (value: FormDataEditItem) => {
    const data = formEditToFormDataItem(value);
    const res = await callEndpoint(postItem(value.name, data));
    const item = res && createAdapttedItem(res);
    item && dispatch(addItem(item));
    item && SnackbarUtilities.success("Item Created Successfull");
    item && setShow(false);
  };

  const handleUpdate = async (value: FormDataEditItem) => {
    const res = item && (await callEndpoint(putItem(item.name, value)));
    console.log(res);
    const newitem = res && createAdapttedItem(res);
    newitem && dispatch(updateItem({ oldItem: item, newitem }));
    newitem && SnackbarUtilities.success("Item Updated Successfull");
    newitem && setShow(false);
  };

  const handleSubmit = async (value: FormDataEditItem) => {
    item ? handleUpdate(value) : handleCreate(value);
  };

  return (
    <CreateItemStyle onClick={() => setShow(true)}>
      {children}

      <Modal
        contentClassName="bg-transparent border-0"
        show={show}
        centered
        onHide={() => setShow(false)}
        onShow={() => setShow(true)}
      >
        <Modal.Body>
          <FormikForm
            handle={handleSubmit}
            name={item?.name}
            price={item?.price}
            storeId={item?.storeId}
          />
        </Modal.Body>
      </Modal>
    </CreateItemStyle>
  );
};

export const CreateItemStyle = styled.div``;

export default CreateItem;
