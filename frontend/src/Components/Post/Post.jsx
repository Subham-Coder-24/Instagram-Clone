import React, { useEffect, useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/Post";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowingPosts,
  getMyPosts,
  getUserPosts,
} from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
import { useParams } from "react-router-dom";
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  ok = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const params = useParams();

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));
    if (isAccount) {
      dispatch(getMyPosts());
    } else if (ok) {
      dispatch(getUserPosts(params.id));
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else if (ok) {
      dispatch(getUserPosts(params.id));
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const updateCaptionHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        <div className="inner">
          <Avatar
            src={ownerImage}
            alt="User"
            sx={{
              height: "3vmax",
              width: "3vmax",
            }}
          />
          <Link to={`/user/${ownerId}`}>
            <Typography style={{ color: "white" }} fontWeight={700}>
              {ownerName}
            </Typography>
          </Link>
        </div>

        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert style={{ color: "white" }} />
          </Button>
        ) : null}
      </div>
      <img src={postImage} alt="Post" />
      <div className="postDetails"></div>

      <div className="postFooter">
        <div onClick={handleLike}>
          {liked ? (
            <Favorite style={{ color: "red", fontSize: 30 }} />
          ) : (
            <FavoriteBorder style={{ color: "white", fontSize: 30 }} />
          )}
        </div>

        <div onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline style={{ color: "white", fontSize: 30 }} />
        </div>

        {isDelete ? (
          <div onClick={deletePostHandler}>
            <DeleteOutline style={{ color: "white", fontSize: 30 }} />
          </div>
        ) : null}
      </div>

      <div
        style={{
          border: "none",
          backgroundColor: "black",
          cursor: "pointer",
          color: "white",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} Likes</Typography>
      </div>
      <Typography
        fontWeight={100}
        color="rgba(0, 0, 0, 0.582)"
        style={{ alignSelf: "center", color: "white" }}
      >
        ##{caption}
      </Typography>

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography style={{ color: "white" }} variant="h4">
            Liked By
          </Typography>

          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div style={{ color: "white" }} className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
                ok={ok}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography style={{ color: "white" }} variant="h4">
            Update Caption
          </Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
