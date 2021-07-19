/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management
 */

 const express = require('express');
 const router = express.Router();
 const fileCtrl = require('./file.controller');

  /**
  * @swagger
  * paths:
  *  /file:
  *    get:
  *      tags: [Files]
  *      summary: "Get Uploaded File"
  *      parameters:
  *        - in: query
  *          name: path
  *          required: false
  *          schema:
  *            type: string
  *            description: file path
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: Successfully get uploaded file
  */
   router.get('/', fileCtrl.getFile);

   /**
  * @swagger
  * paths:
  *  /file/array:
  *    post:
  *      tags: [Files]
  *      summary: "Upload new Files"
  *      requestBody:
  *        required: true
  *        content:
  *          multipart/form-data:
  *            schema:
  *              type: object
  *              properties:
  *                file:
  *                  type: array
  *                  items:
  *                    type: string
  *                    format: binary 
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200":
  *          description: Successfully upload file
  */
   router.post('/array', fileCtrl.upload.array('file',10), fileCtrl.uploadFile);
 
     /**
  * @swagger
  * paths:
  *  /file/single:
  *    post:
  *      tags: [Files]
  *      summary: "Upload a new File"
  *      requestBody:
  *        required: true
  *        content:
  *          multipart/form-data:
  *            schema:
  *              type: object
  *              properties:
  *                file:
  *                  type: string
  *                  format: binary
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200":
  *          description: Successfully upload file
  */
      router.post('/single', fileCtrl.upload.single('file'), fileCtrl.uploadFile);
 
      module.exports = router;