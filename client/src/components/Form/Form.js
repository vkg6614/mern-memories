import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostAction,
  updatePostAction,
} from "../../Redux/Actions/Actions";
import { useHistory } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) =>
    currentId ? state.postReducer.posts.find((p) => p._id === currentId) : null
  );

  const [postLists, setPostLists] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (posts) setPostLists(posts);
  }, [posts]);

  const user = JSON.parse(localStorage.getItem("profile"));

  const classes = useStyles();

  const handleFromSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePostAction(currentId, { ...postLists, name: user?.result?.name })
      );
    } else {
      dispatch(createPostAction({ ...postLists, name: user?.result?.name }));
    }
    clear();
    history.push("/");
  };
  const clear = () => {
    setCurrentId(null);
    setPostLists({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign in to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleFromSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a memory
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postLists.title}
          onChange={(e) =>
            setPostLists({ ...postLists, title: e.target.value })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postLists.message}
          onChange={(e) =>
            setPostLists({ ...postLists, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postLists.tags}
          onChange={(e) =>
            setPostLists({ ...postLists, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostLists({ ...postLists, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
