const { DateTime } = require('luxon');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Post = require('../models/post');

// Display all post items
exports.post_list_get = asyncHandler(async (req, res, next) => {
  // Dispaly all post, both published and unpublished
  const allPosts = await Post.find().sort({ date: -1 }).exec();
  console.log("🚀 ~ file: postController.js:11 ~ exports.post_list_get=asyncHandler ~ allPosts:", allPosts)
  res.render('post_list', { post_list: allPosts, user: req.user, admin: true });
});

// Display post create form on GET
exports.create_post_get = function (req, res, next) {
  const today = DateTime.fromJSDate(new Date()).toISODate();
  res.render('post_form', { title: 'Add a post', today });
};

// Handle post create on POST
exports.create_post_post = [
  // Validate and sanitize fields
  // In addition to required=true in the form view
  // as a user may enter whitespace or special HTML charcters
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('text', 'Text must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);

    const post = new Post({
      date: req.body.date,
      title: req.body.title,
      text: req.body.text,
    });

    if (!errors.isEmpty()) {
      res.render('post_form', {
        title: 'Add a post',
        post: post,
        errors: errors.array(),
      });
    } else {
      await post.save();
      res.redirect('/');
    }
  }),
];

// // Display detail page for a specific post item
// exports.read_post_get = asyncHandler(async (req, res, next) => {
//   const post = await News.findById(req.params.id).exec();
//   res.render('post_detail', { post });
// });

// // Display post update form on GET
// exports.update_post_get = asyncHandler(async (req, res, next) => {
//   // Get the post from database
//   const post = await News.findById(req.params.id).exec();

//   if (post === null) {
//     // No results.
//     const err = new Error('Book not found');
//     err.status = 404;
//     return next(err);
//   }

//   res.render('post_form', {
//     title: 'Update News',
//     post,
//   });
// });

// // Handle post update form on POST
// exports.update_post_post = [
//   // Validate and sanitize fields
//   // In addition to required=true in the form view
//   // as a user may enter whitespace or special HTML charcters
//   body('heading', 'Heading must not be empty.')
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body('content', 'Content must not be empty.')
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body('imgUrl', 'Not a valid URL')
//     .optional({ values: 'falsy' })
//     .trim()
//     .isURL(),
//   body('date', 'Date must not be empty').notEmpty(),
//   // body('publish', 'Publish must not be empty').isEmpty(),

//   asyncHandler(async (req, res, next) => {
//     console.log(req.body);
//     const errors = validationResult(req);

//     const post = new News({
//       date: req.body.date,
//       heading: req.body.heading,
//       imgUrl: req.body.imgUrl,
//       content: req.body.content,
//       publish: req.body.publish === 'on',
//       _id: req.params.id,
//     });

//     if (!errors.isEmpty()) {
//       res.render('post_form', {
//         title: 'Update News',
//         post: post,
//         errors: errors.array(),
//       });
//     } else {
//       const updateNews = await News.findByIdAndUpdate(req.params.id, post, {});
//       res.redirect('/post');
//     }
//   }),
// ];

// // Display post delete form on GET
// exports.delete_post_get = asyncHandler(async (req, res, next) => {
//   const post = await News.findById(req.params.id).exec();

//   if (post === null) {
//     res.redirect('/post');
//   }

//   res.render('post_delete', {
//     title: 'Delete News',
//     post,
//   });
// });

// // Handle post delete form on POST
// exports.delete_post_post = asyncHandler(async (req, res, next) => {
//   const post = await News.findById(req.params.id).exec()

//   if (post) {
//     await News.findByIdAndRemove(req.params.id)
//     res.redirect('/post')
//   }
// });
