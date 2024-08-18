import React, { useEffect, useState } from "react";
import "./SingleStory.css";
import { Link, useParams } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { allStory } from "../../Actions/Post";

const SingleStory = () => {
  const { username, id } = useParams();
  const dispatch = useDispatch();
  const { loading: StoryLoading, story } = useSelector(
    (state) => state.userStory
  );
  const [previous, setPrevious] = useState({
    username: "",
    id: "",
    imageUrl: "",
    userImg: "",
  });
  const [next, setNext] = useState({
    username: "",
    id: "",
    imageUrl: "",
    userImg: "",
  });
  const [current, setCurrent] = useState({
    username: "",
    id: "",
    imageUrl: [],
    userImg: "",
  });
  const [img, setImg] = useState();

  const handelImage = (e) => {
    const imageWidth = e.target.width;
    const clickPosition = e.nativeEvent.offsetX;
    const imageCenter = imageWidth / 2;
    const currentIndex = current.imageUrl.findIndex(
      (url) => url === e.target.src
    );
    if (clickPosition < imageCenter && currentIndex > 0) {
      const previousImageUrl = current.imageUrl[currentIndex - 1];
      setImg(previousImageUrl);
    } else if (
      clickPosition >= imageCenter &&
      currentIndex < current.imageUrl.length - 1
    ) {
      const nextImageUrl = current.imageUrl[currentIndex + 1];
      setImg(nextImageUrl);
    }
  };

  useEffect(() => {
    const currentIndex = story.findIndex((user) => user._id === id);

    const currentUser = story[currentIndex];
    const previousUser = currentIndex > 0 ? story[currentIndex - 1] : null;
    const nextUser =
      currentIndex < story.length - 1 ? story[currentIndex + 1] : null;

    setCurrent({
      username: currentUser ? currentUser.user.name : "",
      id: currentUser ? currentUser._id : "",
      imageUrl: currentUser
        ? currentUser.storyList.map((story) => story.image.url)
        : "",
      userImg: currentUser ? currentUser.user.avatar.url : "",
    });
    console.log(currentUser.storyList);

    setImg(currentUser.storyList[0].image.url);
    setPrevious({
      username: previousUser ? previousUser.user.name : "",
      id: previousUser ? previousUser._id : "",
      imageUrl: previousUser ? previousUser.storyList[0].image.url : "",
      userImg: previousUser ? previousUser.user.avatar.url : "",
    });

    setNext({
      username: nextUser ? nextUser.user.name : "",
      id: nextUser ? nextUser._id : "",
      imageUrl: nextUser ? nextUser.storyList[0].image.url : "",
      userImg: nextUser ? nextUser.user.avatar.url : "",
    });
  }, [username, id]);
  return (
    !StoryLoading &&
    story && (
      <div className="single">
        <Link to={`/`}>
          <CloseIcon className="close" />
        </Link>
        {previous.username && (
          <div className="side">
          <img src={previous.imageUrl} alt="" />
            <div className="username">
              <Avatar
                src={previous.userImg}
                alt="User"
                sx={{
                  height: "3vmax",
                  width: "3vmax",
                }}
              />
              <Typography>{previous.username}</Typography>
            </div>
          </div>
        )}

        <div className="front">
          {previous.username && (
            <Link to={`/user/${previous.username}/${previous.id}`}>
              <KeyboardArrowLeftIcon />
            </Link>
          )}

          {img && <img onClick={handelImage} src={img} alt="" />}
          <div className="username">
            <Avatar
              src={current.userImg}
              alt="User"
              sx={{
                height: "3vmax",
                width: "3vmax",
              }}
            />
            <Typography>{current.username}</Typography>
          </div>
          {next.username && (
            <Link to={`/user/${next.username}/${next.id}`}>
              <KeyboardArrowRightIcon />
            </Link>
          )}
        </div>

        {next.username && (
          <div className="side">
            <img src={next.imageUrl} alt="" />
            <div className="username">
              <Avatar
                src={next.userImg}
                alt="User"
                sx={{
                  height: "3vmax",
                  width: "3vmax",
                }}
              />
              <Typography>{next.username}</Typography>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default SingleStory;
