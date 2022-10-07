import { useAppDispatch, useFetchAndLoading } from "@/hooks";
import { Item } from "@/pages/Dashboard/models";
import { deleteItem } from "@/pages/Dashboard/services";
import { removeItem } from "@/redux";
import { numberToCurrency, SnackbarUtilities } from "@/utilities";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import { useItems } from "../../hooks";
import { CreateItem } from "../CreateItem";

const ItemItem = (props: { item: Item }) => {
  const { item } = props;
  const { isDeleting } = useItems();
  return (
    <>
      <Card>
        <Card.Body>
          {isDeleting ? (
            <TrashButton item={item} />
          ) : (
            <EditButton item={item} />
          )}
          <Card.Title className="text-center fw-bold text-uppercase">
            <div>{item.name}</div>
            <div>{numberToCurrency(item.price)}</div>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

const TrashButton = (props: { item: Item }) => {
  const { item } = props;
  const { callEndpoint } = useFetchAndLoading<any>();
  const dispatch = useAppDispatch();

  const handleTrash = async () => {
    const res = await callEndpoint(deleteItem(item.name));
    res && dispatch(removeItem(item));
    res && SnackbarUtilities.success("Item Deleted Successfull");
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

const EditButton = (props: { item: Item }) => {
  const { item } = props;
  return (
    <>
      <CreateItem item={item}>
        <div
          className="position-absolute top-0 start-100 translate-middle"
          style={{ width: "40px", height: "40px" }}
        >
          <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center h-100">
            <FontAwesomeIcon icon={faPencil} />
          </div>
        </div>
      </CreateItem>
    </>
  );
};

export default ItemItem;
