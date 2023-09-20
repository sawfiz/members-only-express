const  {DateTime} = require("luxon")

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = new Schema({
  date: {type: Date},
  title: {type: String, required: true, maxLength: 100},
  text: {type: String, required: true, maxLength: 2000},
  author: {type: Schema.Types.ObjectId, Ref:"User", rquired: true}
})

// Virtual propety date_yyyy_mm_dd
schema.virtual("date_yyyy_mm_dd").get(function () {
  return this.date ? DateTime.fromJSDate(this.date).toISODate() : '';
});

// Virtual propety news_url
schema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

const Post = mongoose.model('Post', schema)

module.exports = Post;