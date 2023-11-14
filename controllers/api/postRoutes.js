const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//add post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete('/delete-post', async (req, res) => {
  try {
      const postId = req.body.Post_id;
      console.log(postId)

      const deletePost = await Blogpost.destroy({
          where: { id: postId }
          })
      res.sendStatus(200).send
  } catch (error) {
      console.error(error);
      res.sendStatus(500); 
  }
});

module.exports = router;