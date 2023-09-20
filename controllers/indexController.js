const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Post = require('../models/post');
const User = require('../models/user');

// const passport = require('passport');
const bcrypt = require('bcryptjs');

// Display all published news items
exports.messages_list_get = asyncHandler(async (req, res, next) => {
  // Dispaly all news, both published and unpublished
  // const allMessages = await this.messages_list_get.find({ publish: true }).sort({ date: -1 }).exec();
  // res.render('news_list', { news_list: allNews, admin: false });
  res.render('index', { title: 'Welcome to the home page!' });
});

// Display login on GET
exports.login_get = (req, res, next) => {
  // const message = req.flash('error');
  const message = 'hello';
  res.render('login', { title: 'Log In', message });
};

// // Handle login on POST
// exports.login_post = (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/news',
//     failureRedirect: '/login',
//     failureFlash: true,
//   })(req, res, next);
// };

// Display signup on GET
exports.signup_get = (req, res, next) => {
  res.render('signup', { title: 'Sign Up' });
};

// Handle signup on POST
exports.signup_post = [
  // Validate and sanizize fields
  body('firstName', 'First name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastName', 'Last name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('username', 'Username must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty() || req.body.password !== req.body.password1) {
      const user = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
      });

      const error =
        req.body.password === req.body.password1
          ? ''
          : 'Passwords do not match.';

      res.render('signup', {
        title: 'Signup',
        user,
        error,
        errors: errors.array(),
      });
    } else {
      console.log('Password match');
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        // if err, do something
        if (err) {
          console.log('Error hashing password');
        } // otherwise, store hashedPassword in DB
        else {
          try {
            const user = new User({
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              username: req.body.username,
              password: hashedPassword,
            });

            if (!errors.isEmpty()) {
              res.render('signup', {
                title: 'Signup',
                user,
                erros: errors.array(),
              });
            } else {
              await user.save();
              res.redirect('/');
            }
          } catch (err) {
            return next(err);
          }
        }
      });
    }
  },
];

// // Display logout page on GET
// exports.logout_get = async (req, res, next) => {
//   console.log(req.user);
//   res.render('logout');
// };

// // Handle logout on POST
// exports.logout_post = async (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// };
