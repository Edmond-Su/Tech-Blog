const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const Postdata = await Post.findAll();
  
      const Posts = Postdata.map((post) => Post.get({ plain: true }));

      res.render('home', { 
        Posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/post/:id', async (req, res) => {
    try {
      const Postdata = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        {
          model:Comments,
          include : {
            model: User,
            attributes: ['username'],
          }
        }
        ],
      });
  
      const Posts = Postdata.get({ plain: true });
      console.log("Successfully displaying post")
      res.render('post', {
        ...Posts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id
  
        const usersPosts = await Post.findAll({
        where: { user_id: userId }
        })
  
        const Posts = usersPosts.map(post => post.get({ plain: true }));
  
        console.log(Posts)
        res.render('dash', {
          Posts: Posts,
          logged_in: req.session.logged_in
      })
    } catch (err) {
      console.log(err)
    }
  })

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
  
    res.render('login');
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
  
    res.render('signup');
});

module.exports = router;