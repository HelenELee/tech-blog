const router = require('express').Router();
const { Blog, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

   /* const blog = newBlog.map((blog) => blog.get({ plain: true }));*/
    
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

/*
// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

// GET all blogs
router.get('/currentuserzz', withAuth, async (req, res) => {
  try {
    let blogs = {};
   // console.log("SESSION ID = " + req.session.user_id);
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      //TODO - want to just include blogs for logged in user
      /*where: { "user_id": req.session.user_id },*/
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      
      
    }
    );
    console.log("BLOGDATA = " + blogData);
    if (blogData.length > 1){
      // Serialize data so the template can read it
      blogs = blogData.map((blog) => blog.get({ plain: true }));
    } else {
      blogs = blogData.get({ plain: true });
    }
    

    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/currentuserxx', async (req, res) => {
  try {
    console.log("Currentuser route");
    //console.log("session id = " + req.session.id);
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ]},
      /*{where: { "user_id": "1" },
    } */
  );

  console.log(blogData);

  // Serialize data so the template can read it
  const blogs = blogData.map((blog) => blog.get({ plain: true }));

  res.render('homepage', { 
    blogs, 
    logged_in: req.session.logged_in 
  });

  
    //res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// get one blog
router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      /*
      include: [
        {
          model: Comment,
          attributes: ['contents', 'date_created', 'user_id', 'blog_id'],
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
