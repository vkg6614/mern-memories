import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";

import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();

  const postData = useSelector((state) => state.postReducer);

  // console.log(postData, "posts");

  return !postData.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {postData &&
        postData.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
    </Grid>
  );
};

export default Posts;
