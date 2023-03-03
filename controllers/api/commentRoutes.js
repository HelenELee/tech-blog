const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//post one comment
//called from public/js/customElements.js
router.post('/', async (req, res) => {
  try {
    //include all data from request plus session data
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
    });
    
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET all comments
//used for testing
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one comment
//used for testing
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res
        .status(400)
        .json({ message: 'No comment with that id' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//used for testing
//update one comment
router.put('/:id', async(req, res) => {
  try {
    const commentData = await Comment.update({
      title: req.body.title,
      contents: req.body.contents
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete one comment
//used for testing
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No Comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
