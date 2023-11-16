import { PaginationProps } from "antd";
import { useState } from "react";
import { useSubmit } from "react-router-dom";

export const usePagination = () => {
  const submit = useSubmit();
  const [state_currentPage, setState_currentPage] = useState(1);
  const [state_pageSize, setState_pageSize] = useState(5);
  const handleChange_pagination: PaginationProps["onChange"] = (page, pageSize) => {
    setState_currentPage(page);
    setState_pageSize(pageSize);
    submit([
      ["page", page],
      ["pageSize", pageSize]
    ]);
  };

  return {
    state_currentPage,
    setState_currentPage,
    state_pageSize,
    setState_pageSize,
    handleChange_pagination,
  };
};