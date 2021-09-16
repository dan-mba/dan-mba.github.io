import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "gatsby-theme-material-ui";

export default function RepoPagination({page, count, baseLink}) {
  return (
    <Pagination
      page={page}
      count={count}
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${baseLink}${item.page === 1 ? '' : `/${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}
