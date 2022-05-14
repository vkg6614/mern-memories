import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostAction,
  updatePostAction,
} from "../../Redux/Actions/Actions";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const postData = useSelector((state) =>
    currentId ? state.postReducer.find((p) => p._id === currentId) : null
  );
  const [postLists, setPostLists] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (postData) setPostLists(postData);
  }, [postData]);

  const classes = useStyles();

  const handleFromSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePostAction(currentId, postLists));
    } else {
      dispatch(createPostAction(postLists));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostLists({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

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
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postLists.creator}
          onChange={(e) =>
            setPostLists({ ...postLists, creator: e.target.value })
          }
        />
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
          onChange={(e) => setPostLists({ ...postLists, tags: e.target.value })}
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
