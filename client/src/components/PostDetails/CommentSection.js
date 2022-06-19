import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { commentPostAction } from "../../Redux/Actions/Actions";

import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentRef = useRef();
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleCommentButton = async () => {
    const finalComment = `${user.result.name}:${comment}`;
    const newComments = await dispatch(
      commentPostAction(finalComment, post._id)
    );
    // setComments(newComments);
    console.log(newComments, "new");
    // setComment("");

    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };
  console.log(comments, "com");

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(":")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              color="primary"
              disabled={!comment}
              variant="contained"
              onClick={handleCommentButton}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
