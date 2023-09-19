// const asyncHandler = require('express-async-handler');
const News = require('../models/post');
const User = require('../models/user');

// const passport = require('passport');
// const bcrypt = require('bcryptjs');

// Display all published news items
// exports.messages_list_get = asyncHandler(async (req, res, next) => {
//   // Dispaly all news, both published and unpublished
//   const allMessages = await this.messages_list_get.find({ publish: true }).sort({ date: -1 }).exec();
//   res.render('news_list', { news_list: allNews, admin: false });
// });

// Display login on GET
exports.login_get = (req, res, next) => {
  // const message = req.flash('error');
  const message = "hello"
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
  res.render('signup', { title: 'Sing Up' });
};

// // Handle signup on POST
// exports.signup_post = async (req, res, next) => {
//   bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
//     // if err, do something
//     if (err) {
//       console.log('Error hashing password');
//     } // otherwise, store hashedPassword in DB
//     else {
//       try {
//         const user = new User({
//           username: req.body.username,
//           password: hashedPassword,
//         });
//         const result = await user.save();
//         res.redirect('/');
//       } catch (err) {
//         return next(err);
//       }
//     }
//   });
// };

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
