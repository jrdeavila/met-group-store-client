import { useAppDispatch, useFetchAndLoading } from "@/hooks";
import { Item, Store } from "@/pages/Dashboard/models";
import { removeStoreItem } from "@/redux";
import { numberToCurrency, SnackbarUtilities } from "@/utilities";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Card, Table } from "react-bootstrap";
import styled from "styled-components";
import { useStoreItem, useStores } from "../../hooks";
import { deleteStoreItem } from "@/pages/Dashboard/services";
import { CreateStore } from "../CreateStore";
import { StoreItemContext } from "../../context";

export interface StoreItemInterface {
  store: Store;
}

export const StoreItem: React.FC<StoreItemInterface> = ({ store }) => {
  const cardRef = useRef<any>();

  const { isDeleting } = useStores();

  const [focus, setFocus] = useState(false);
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    return () => {
      setItems([]);
      setFocus(false);
    };
  }, []);

  useEffect(() => {
    if (focus) {
      setItems(store.items);
    } else {
      setItems(store.items.slice(0, 2));
    }
  }, [focus]);

  return (
    <>
      <StoreItemContext.Provider
        value={{ items: items ?? [], focus, setFocus, setItems }}
      >
        <CardStyled ref={cardRef}>
          {isDeleting ? (
            <TrashButton store={store} />
          ) : (
            <EditButton store={store} />
          )}
          <Card.Body>
            <Card.Title className="text-center fw-bold text-uppercase fs-2">
              {store.name}
            </Card.Title>
            <Card.Subtitle className="store-info">
              {items && <StoreItems />}
            </Card.Subtitle>
          </Card.Body>
        </CardStyled>
      </StoreItemContext.Provider>
    </>
  );
};

const TrashButton = (props: { store: Store }) => {
  const { store } = props;
  const { callEndpoint } = useFetchAndLoading<any>();
  const dispatch = useAppDispatch();

  const handleTrash = async () => {
    const res = await callEndpoint(deleteStoreItem(store.name));
    res && dispatch(removeStoreItem(store));
    res && SnackbarUtilities.success("Store Deleted Successfull");
  };

  return (
    <>
      <div
        onClick={handleTrash}
        className="position-absolute top-0 start-100 translate-middle"
        style={{ width: "40px", height: "40px" }}
      >
        <div className="bg-danger rounded-circle text-white d-flex align-items-center justify-content-center h-100">
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
      </div>
    </>
  );
};

const EditButton = (props: { store: Store }) => {
  const { store } = props;
  return (
    <>
      <CreateStore store={store}>
        <div
          className="position-absolute top-0 start-100 translate-middle"
          style={{ width: "40px", height: "40px" }}
        >
          <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center h-100">
            <FontAwesomeIcon icon={faPencil} />
          </div>
        </div>
      </CreateStore>
    </>
  );
};

const StoreItems = () => {
  const { items, focus, setFocus } = useStoreItem();
  return (
    <>
      {items.length > 0 ? (
        <TableWrapper>
          <TableScroll>
            <Table>
              <thead>
                <tr>
                  <th className="text-start">Name</th>
                  <th className="text-end">Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((e, i) => (
                  <tr key={i}>
                    <td className="text-start">{e.name}</td>
                    <td className="text-end">{numberToCurrency(e.price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={2}
                    className="text-center"
                    onClick={() => setFocus && setFocus(!focus)}
                  >
                    {focus ? "Show Less..." : "Show More..."}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </TableScroll>
        </TableWrapper>
      ) : (
        <CardMessage>
          <div className="text-center">No Items Registered</div>
        </CardMessage>
      )}
    </>
  );
};

const TableWrapper = styled.div`
  position: relative;
`;
const TableScroll = styled.div`
  overflow: auto;
  height: 10rem;
`;

const CardMessage = styled.div`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CardStyled = styled(Card)`
  cursor: pointer;
  max-width: inherit;
  user-select: none;
  height: 15rem;

  @media (max-width: 500px) {
    .store-info {
      display: none;
    }
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
