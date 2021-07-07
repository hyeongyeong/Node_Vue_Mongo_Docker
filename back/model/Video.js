/**
 * @swagger
 *  components:
 *    schemas:
 *      Video:
 *          type: object
 *          required:
 *            - _id
 *            - name
 *            - sequence
 *            - file_path
 *            - category
 *            - date
 *          properties:
 *            _id:
 *              type: ObjectId
 *            name:
 *              type: string
 *            sequence:
 *              type: integer
 *            file_path:
 *              type: string
 *            category:
 *              type: ObjectId
 *            date:
 *              type: Date
 * 
 */
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

/**
* @module Video
* @description contain the details of video info
*/

const VideoSchema = new Schema({
    name: {type: String},
    sequence: {type: Number},
    file_path: {type: String},
    category: {type: Number, ref: 'Category'},
    date: {type: Date, default: Date.now}
  });
  
  VideoSchema.plugin(autoIncrement.plugin, 'Video');


  const model = mongoose.model('Video', VideoSchema);
  
  module.exports = model;