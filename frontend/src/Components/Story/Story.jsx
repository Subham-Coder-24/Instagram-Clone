import React, { useEffect, useState } from "react";
import "./Story.css";
import { Link } from "react-router-dom";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Button, Dialog, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allStory, createNewStory } from "../../Actions/Post";
import { useAlert } from "react-alert";

function Story() {
  const [commentToggle, setCommentToggle] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, message } = useSelector((state) => state.like);
  const { loading: StoryLoading, story } = useSelector(
    (state) => state.userStory
  );
  // console.log(story);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewStory(caption, image));
    await dispatch(allStory());
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);
  return (
    <div className="story">
      <div className="create" onClick={() => setCommentToggle(!commentToggle)}>
        <AddAPhotoOutlinedIcon />
      </div>

      {story &&
        story.map((item) => (
          <div key={item._id} className="story-item">
            <Link to={`/user/${item.user.name}/${item._id}`}>
              <img
                src={item.storyList[0].image.url}
                alt={`Story by ${item.user.name}`}
              />
            </Link>
            <div className="story-text">{item.user.name}</div>
          </div>
        ))}

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="dialog">
          <form className="form" onSubmit={submitHandler}>
            <Typography style={{ color: "white" }} variant="h3">
              New Story
            </Typography>

            {image && <img src={image} alt="post" />}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input
              type="text"
              placeholder="Caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Button disabled={loading} type="submit">
              Add Story
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Story;
