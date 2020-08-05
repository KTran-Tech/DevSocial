const express = require('express');
//get router tool from express
const router = express.Router();
const {
  check,
  validationResult,
} = require('express-validator');
const auth = require('../../middleware/authenticateToken');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     POST api/posts
// @descrip   Create a post
// @access    Private
router.get(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    //If there is an error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(
        req.user.id
      ).select('-password');

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      //to be able to send it back as json
      const post = await newPost.save();

      res.json(post);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
