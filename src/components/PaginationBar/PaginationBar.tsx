import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from "@mui/system";
import { useState } from "react";
import { Pagination } from "react-bootstrap";

export interface PaginationBarInterface {
  pages: number;
  setCurrentPage: (index: number) => void;
}

const PaginationBar: React.FC<PaginationBarInterface> = ({
  pages,
  setCurrentPage,
}) => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    if (current - 1 >= 0) {
      handleIndex(current - 1);
    }
  };
  const handleIndex = (index: number) => {
    setCurrentPage(index);
    setCurrent(index);
  };

  const handleNext = () => {
    if (current + 1 <= pages - 1) {
      handleIndex(current + 1);
    }
  };

  return (
    <>
      <Pagination size="lg">
        <Pagination.Item onClick={() => handlePrev()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Pagination.Item>
        <Pagination.Item onClick={() => handleIndex(0)}>
          <FontAwesomeIcon icon={faAnglesLeft} />
        </Pagination.Item>
        {Array.from(Array(pages).keys()).map((e, i) => (
          <Pagination.Item
            key={i}
            active={current == e}
            onClick={() => handleIndex(e)}
          >
            {e + 1}
          </Pagination.Item>
        ))}
        <Pagination.Item onClick={() => handleIndex(pages - 1)}>
          <FontAwesomeIcon icon={faAnglesRight} />
        </Pagination.Item>

        <Pagination.Item onClick={() => handleNext()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Pagination.Item>
      </Pagination>
    </>
  );
};

export default PaginationBar;
