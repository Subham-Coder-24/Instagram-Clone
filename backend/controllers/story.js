const Post = require("../models/Post");
const Story = require("../models/Story");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

exports.createStory = async (req, res) => {
  try {
    const myCloud = await cloudinary.uploader.upload(req.body.image, {
      folder: "story",
    });
    const existingStory = await Story.findOne({ user: req.user._id });

    if (existingStory) {
      existingStory.storyList.push({
        caption: req.body.caption,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.url,
        },
      });
      await existingStory.save();
    } else {
      // If the user does not have a story, create a new one
      const newStory = new Story({
        user: req.user._id,
        storyList: [
          {
            caption: req.body.caption,
            image: {
              public_id: myCloud.public_id,
              url: myCloud.url,
            },
          },
        ],
      });
      await newStory.save();
    }

    res.status(201).json({
      success: true,
      message: "Story created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.allStory = async (req, res) => {
  try {
    const list = await Story.find().populate("user");

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].storyList.length; j++) {
        let expire = list[i].storyList[j].expiresAt;
        let now = new Date();

        if (expire < now) {
          await Story.updateOne(
            { _id: list[i]._id },
            { $pull: { storyList: { _id: list[i].storyList[j]._id } } }
          );
          break;
        }
      }
      if (list[i].storyList.length == 0) {
        await Story.deleteOne({ _id: list[i]._id });
      }
      break;
    }
    const story = await Story.find().populate("user");
    res.status(200).json({
      success: true,
      story,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
