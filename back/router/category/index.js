/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

 const express = require('express');
 const router = express.Router();
 const categoryCtrl = require('./category.controller');
 

  /**
  * @swagger
  * paths:
  *  /category:
  *    get:
  *      tags: [Categories]
  *      summary: "Get All Categories"
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: A Category Schemas
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#components/schemas/Category'
  */
   router.get('/', categoryCtrl.getAllCategory);

  /**
  * @swagger
  * paths:
  *  /category/root:
  *    get:
  *      tags: [Categories]
  *      summary: "Get top category"
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: A Category Schemas
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#components/schemas/Category'
  */
   router.get('/root', categoryCtrl.getTopCategory);

   /**
   * @swagger
   * paths:
   *  /category:
   *    post:
   *      tags: [Categories]
   *      summary: "Add a new Category"
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Category'
   *      responses:
   *        "405":
   *          description: "Invalid input"
   *        "200" :
   *          description: A Category Schemas
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#components/schemas/Category'
   */
   router.post('/', categoryCtrl.createCategory);


  /**
  * @swagger
  * paths:
  *  /category/delete:
  *    delete:
  *      tags: [Categories]
  *      summary: "Delete Category"
  *      parameters:
  *        - in: query
  *          name: id
  *          required: false
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: A Category Schemas
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#components/schemas/Category'
  */
   router.delete('/delete',categoryCtrl.deleteCategory);

  module.exports = router;