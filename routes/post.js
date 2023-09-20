const express = require('express');
const router = express.Router();

const validateObjectId = require('../utils/objectIdValidator');

// Require the controller module
const post_controller = require('../controllers/postController');

/// NEWS ROUTES

// GET post list
router.get('/', post_controller.post_list_get);

// GET request for creating a post item
router.get('/create', post_controller.create_post_get);

// POST request for creating a post item
router.post('/create', post_controller.create_post_post)

// // GET request for one post item
// router.get('/:id', validateObjectId, post_controller.read_post_get)


// // GET request to update post.
// router.get("/:id/update", validateObjectId, post_controller.update_post_get);

// // POST request to update post.
// router.post("/:id/update", validateObjectId, post_controller.update_post_post);

// GET request to delete post.
router.get("/:id/delete", validateObjectId, post_controller.delete_post_get);

// POST request to delete post.
router.post("/:id/delete", validateObjectId, post_controller.delete_post_post);

module.exports = router;
