// A middleware function to validate ObjectId
const mongoose = require("mongoose");
const { validate } = require("../models/post");
const { Types } = mongoose;

function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ObjectId' });
  }
  next();
}

module.exports = validateObjectId;