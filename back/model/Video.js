/**
 * @swagger
 *  components:
 *    schemas:
 *      Video:
 *          type: object
 *          required:
 *            - name
 *            - sequence
 *            - file_path
 *            - category
 *            - date
 *          properties:
 *            name:
 *              type: string
 *              description: 비디오 명
 *            sequence:
 *              type: integer
 *              description: 시리즈 안의 비디오 순서
 *            img_path:
 *              type: string
 *              description: 비디오의 Thumbnail 이미지 경로
 *            file_path:
 *              type: string
 *              description: 비디오 파일 경로
 *            category:
 *              type: string
 *              description: 비디오가 속한 최하위 카테고리 id
 *            date:
 *              type: string
 *              description: 비디오가 업로드된 날짜
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
    img_path: {type: String},
    category: {type: Number, ref: 'Category'},
    date: {type: Date, default: Date.now}
  });
  
  VideoSchema.plugin(autoIncrement.plugin, 'Video');


  const model = mongoose.model('Video', VideoSchema);
  
  module.exports = model;