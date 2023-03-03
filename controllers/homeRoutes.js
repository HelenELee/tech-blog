//routes that render to browser

const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      /*order: [['id']],*/
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all blogs for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    let blogs = {};
   
    // Get all projects 
    
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id},
      /*attributes : {include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]},
      */
    });

   // Serialize data so the template can read it    
      blogs = blogData.map((blog) => blog.get({ plain: true }));
  
    res.render('dashboard', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // direct user to sign up form
    res.render('signup');
  
});
//direct user to form for new blog post
router.get('/newblog', (req, res) => {

  res.render('newblog');
});
//direct user to form for updating or deleting a post
router.get('/updatedelete/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      
    });

    // Serialize data so the template can read it
    const blog = blogData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('updatedelete', { 
     blog, 
     logged_in: req.session.logged_in,
     user_id : req.session.id
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one blog, called from home page when you click on a blog post
//opens screen with blog and comments and option to post new comment
//joins Blog with User and Comment to pull data from all 3
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: Comment },
        {
          model: User,
          attributes: ['name'],
        }
      ],
    });

    // Serialize data so the template can read it

    const blog = blogData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('comment', { 
     blog, 
     logged_in: req.session.logged_in,
     user_id : req.session.id
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
