/**
 * @swagger
 *  components:
 *    schemas:
 *      Category:
 *          type: object
 *          required:
 *            - _id
 *            - name
 *            - child_category
 *            - depth
 *            - update_date
 *            - img_path
 *            - sequence
 *          properties:
 *            _id:
 *              type: string
 *            name:
 *              type: string
 *            child_category:
 *              type: integer
 *            depth:
 *              type: integer
 *            update_date:
 *              type: string
 *            img_path:
 *              type: string
 *            sequence:
 *              type: integer
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
     child_category: {type: Number, ref:'Category'},
     depth: {type: Number},
     sequence: {type: Number},
     img_path: {type: String},
     update_date: {type: Date, default: Date.now}
   });
   
   CategorySchema.plugin(autoIncrement.plugin, 'Category');
 
 
   const model = mongoose.model('Category', CategorySchema);
   
   module.exports = model;