const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  title: String, 
  post_date: Date,
  content: String, 
  url: String,
})

module.exports = mongoose.model('Item', ItemSchema)