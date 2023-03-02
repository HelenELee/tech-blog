const router = require('express').Router();
const { Blog, User } = require('../models');
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

// GET all blogs
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    let blogs = {};
   // console.log("SESSION ID = " + req.session.user_id);
    // Get all projects and JOIN with user data
    console.log(req.session.user_id);
    const blogData = await Blog.findAll({
      //TODO - want to just include blogs for logged in user
      where: { user_id: req.session.user_id},
      /*attributes : {include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    }*/
      
    }
    );
    console.log("BLOGDATA = " + blogData);
   
    //if (blogData && blogData.length > 1){
      // Serialize data so the template can read it
      console.log("here");
      blogs = blogData.map((blog) => blog.get({ plain: true }));
  // } else if (blogData != "") {
  //    console.log("now here");
  //    blogs = blogData.get({ plain: true });
  //  }
    
    console.log("OPENING DASHBARD");
    // Pass serialized data and session flag into template
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
  // If the user is already logged in, redirect the request to another route
    res.render('signup');
  
});

router.get('/newblog', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  /*
  if (req.session.logged_in) {
    res.render('newblog');
    return;
  }
  */

  res.render('newblog');
});

router.get('/updatedelete/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      
    });
    console.log("blogData - " + blogData);

    // Serialize data so the template can read it

    const blog = blogData.get({ plain: true });

    console.log(blog);

    // Pass serialized data and session flag into template
    res.render('updatedelete', { 
     blog, 
     logged_in: req.session.logged_in,
     user_id : req.session.id
    });
    

    //res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


/*
router.get('/updatedelete/:id', withAuth, async(req, res) => {
  console.log('update delete!!');
  console.log(req.query.ID);

  const response = await fetch('/api/blog/'+ req.query.ID, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log(response.json());
    const blog = blogData.get({ plain: true });
    //alert(response);
  } else {
    alert('Failed to get data.');
  }
})
*/
// get one blog
router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      
    });
    
    const blog = blogData.get({ plain: true });

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


module.exports = router;
