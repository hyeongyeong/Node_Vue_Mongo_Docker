/**
 * @swagger
 *  components:
 *    schemas:
 *      Category:
 *          type: object
 *          required:
 *            - name
 *            - parent_category
 *            - child_category
 *            - depth
 *            - update_date
 *            - img_path
 *            - sequence
 *          properties:
 *            name:
 *              type: string
 *              description: 카테고리 혹은 시리즈 명
 *            parent_category:
 *              type: integer
 *              description: 상위 카테고리 id
 *            child_category:
 *              type: integer
 *              description: 하위 카테고리 id
 *            depth:
 *              type: integer
 *              description: 카테고리 레벨
 *            update_date:
 *              type: string
 *              description: 분류별 최신 업데이트 날짜
 *            img_path:
 *              type: string
 *              description: Thumbnail 이미지 경로
 *            sequence:
 *              type: integer
 *              description: 관리자가 정의한 카테고리 순서
 * 
 */

 const mongoose = require('mongoose');
 const autoIncrement = require('mongoose-auto-increment');
 const Schema = mongoose.Schema;
 
 /**
 * @module Category
 * @description contain the details of category info
 */
 
 const CategorySchema = new Schema({
     name: {type: String},
     parent_category: {type: Number, ref:'Category'},
     child_category: [{type: Number, ref:'Category'}],
     depth: {type: Number},
     sequence: {type: Number},
     img_path: {type: String},
     update_date: {type: Date, default: Date.now}
   });
   
   CategorySchema.plugin(autoIncrement.plugin, 'Category');
 
 
   const model = mongoose.model('Category', CategorySchema);
   
   module.exports = model;