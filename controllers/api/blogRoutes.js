const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      /*user_id: req.session.user_id,*/
    });

   /* const blog = newBlog.map((blog) => blog.get({ plain: true }));*/
    
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one blog
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
    /*  include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      */
    });
    console.log("blogData - " + blogData);
    /*
    if (!blogData) {
      res
        .status(400)
        .json({ message: 'No blog with that id' });
      return;
    }*/

    
    // Serialize data so the template can read it
    //const blog = blogData.map((blg) => blg.get({ plain: true }));

    const blog = blogData.get({ plain: true });

    console.log(blog);

    // Pass serialized data and session flag into template
    res.render('comment', { 
     blog, 
     logged_in: req.session.logged_in,
     user_id : req.session.id
    });
    

    //res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        /*user_id: req.session.user_id,*/
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
