const router = require('express').Router();
const { Blog, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

//create new post
//called from public/js/newpost.js
router.post('/', async (req, res) => {
  try {
    //create new post and include current users id from session
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});


// get one blog
router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    // Serialize data so the template can read it
    const blog = blogData.get({ plain: true });

    // Pass serialized data and session flags into template
    res.render('comment', { 
     blog, 
     logged_in: req.session.logged_in,
     user_id : req.session.id
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//update one blog based on id
router.put('/:id', async(req, res) => {
  try {
    const blogData = await Blog.update({
      title: req.body.title,
      contents: req.body.contents
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete one blog based on id
//called from public/js/blogupdate.js
router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
