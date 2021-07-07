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
  *   /category:
  *     get:
  *       summary: Select Category
  *       tags:   [Categories]
  *       response:
  *         "200" :
  *           description: A Category Schemas
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Category'
  */
  router.get('/', categoryCtrl.getAllCategory);
  
   /**
  * @swagger
  * paths:
  *   /category:
  *     post:
  *       summary: Select Category
  *       tags:   [Categories]
  *       response:
  *         "200" :
  *           description: A Category Schemas
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Category'
  */

    router.get('/', categoryCtrl.createCategory);

  module.exports = router;