import { usePagination } from "@/hooks";
import { StoreSelector } from "@/redux";
import { BasicButton } from "@/styled-components";
import { faHistory, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useStores } from "../../hooks";
import { CreateStore } from "../CreateStore";
import { StoreItem } from "./StoreItem";

export interface ShowStoresInterface {}

const ShowStores: React.FC<ShowStoresInterface> = () => {
  const stores = useSelector(StoreSelector);
  const { setItems, currentItems, PaginationBar } = usePagination();

  useEffect(() => {
    setItems && setItems(stores);
  }, [stores]);

  return (
    <ShowStoresStyle>
      <Row className=" align-items-center justify-content-between">
        <Col md="3" className="mb-4">
          <TrashButton />
        </Col>
        <Col md="3" className="mb-4">
          <CreateButton />
        </Col>

        <Col md="12">
          <Row>
            {currentItems &&
              currentItems.map((e) => (
                <Col key={e.name} md="4" xs="12" sm="6" className="mb-4">
                  <StoreItem store={e} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>

      <div className="d-flex justify-content-center">
        {PaginationBar && PaginationBar}
      </div>
    </ShowStoresStyle>
  );
};

const TrashButton = () => {
  const { isDeleting, setIsDeleting } = useStores();
  return (
    <>
      <BasicButton
        onClick={() => setIsDeleting && setIsDeleting(!isDeleting)}
        className={`${
          isDeleting ? "text-danger" : "text-white bg-danger"
        } fw-bold d-flex justify-content-center gap-3 align-items-center`}
      >
        <div>{isDeleting ? "Cancel" : "Trash"}</div>
        <FontAwesomeIcon icon={faTrash} />
      </BasicButton>
    </>
  );
};

const CreateButton = () => {
  return (
    <CreateStore>
      <BasicButton className="text-primary fw-bold d-flex justify-content-center gap-3 align-items-center">
        <div>Create Store</div>
        <FontAwesomeIcon icon={faHistory} />
      </BasicButton>
    </CreateStore>
  );
};

export const ShowStoresStyle = styled.div`
  height: 100%;
  display: flex;
  padding: 1rem 2rem;
  flex-direction: column;
  justify-content: space-between;
`;

export default ShowStores;
