import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAction } from "../Redux/Actions/Actions";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { numberOfPages } = useSelector((state) => state.postReducer);
  console.log(numberOfPages, "num");

  useEffect(() => {
    if (page) {
      dispatch(getPostsAction(page));
    }
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={2}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
