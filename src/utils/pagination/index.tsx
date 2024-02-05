import React from "react";

import { iconArrowLeft, iconArrowRight } from "../../assets/icons";
import "./pagination.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const renderPaginationButtons = () => {
    const buttons: React.ReactNode[] = [];
    const maxButtons = 7;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      const start = Math.max(1, currentPage - 3);
      const end = Math.min(totalPages, start + maxButtons - 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={iconArrowLeft} alt="" />
        Anterior
      </button>
      {renderPaginationButtons()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima
        <img src={iconArrowRight} alt="" />
      </button>
    </div>
  );
};

export default Pagination;
