import { usePagination } from "@/hooks";
import { ItemSelector } from "@/redux";
import { BasicButton } from "@/styled-components";
import { faHistory, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useItems } from "../../hooks";
import { CreateItem } from "../CreateItem";
import ItemItem from "./ItemItem";
export interface ShowItemsInterface {}

const ShowItems: React.FC<ShowItemsInterface> = () => {
  const items = useSelector(ItemSelector);
  const { setItems, currentItems, PaginationBar, setDivisor } = usePagination();

  useEffect(() => {
    setItems && setItems(items);
    setDivisor && setDivisor(12);
  }, [items]);

  return (
    <ShowItemsStyle>
      <Row className="mb-5 align-items-center justify-content-between gap-5">
        <Col md="3">
          <TrashButton />
        </Col>
        <Col md="3">
          <CreateButton />
        </Col>

        <Col md="12">
          <Row>
            {currentItems &&
              currentItems.map((e) => (
                <Col key={e.name} md="3" className="mb-4">
                  <ItemItem item={e} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>

      <div className="d-flex justify-content-center mt-2">
        {PaginationBar && PaginationBar}
      </div>
    </ShowItemsStyle>
  );
};

const TrashButton = () => {
  const { isDeleting, setIsDeleting } = useItems();
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
    <CreateItem>
      <BasicButton className="text-primary fw-bold d-flex justify-content-center gap-3 align-items-center">
        <div>Create Item</div>
        <FontAwesomeIcon icon={faHistory} />
      </BasicButton>
    </CreateItem>
  );
};

export const ShowItemsStyle = styled.div`
  height: 100%;
  display: flex;
  padding: 1rem 2rem;
  flex-direction: column;
  justify-content: space-between;
`;

export default ShowItems;
