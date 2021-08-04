/**
 * @swagger
 * tags:
 *      name: Videos
 *      description: Video management
 */
 const express = require('express');
 const router = express.Router();
 const videoCtrl = require('./video.controller');

/*
*
*   GET POST (Update) Delete Video Row
*
*/
 
  /**
  * @swagger
  * paths:
  *  /video:
  *    get:
  *      tags: [Videos]
  *      summary: "Get All Videoes"
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: A Video Schemas
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#components/schemas/Video'
  */
  router.get('/', videoCtrl.getAllVideo);

  /**
  * @swagger
  * paths:
  *  /video:
  *    post:
  *      tags: [Videos]
  *      summary: "Add a new video"
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
  *                video:
  *                  type: object
  *                  $ref: '#components/schemas/Video'
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: A Video Schemas
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#components/schemas/Video'
  */
  router.post('/', videoCtrl.uploadVideoFile.array('file', 2), videoCtrl.createVideo);

 /**
  * @swagger
  * paths:
  *  /video/update/{id}:
  *    put:
  *      tags: [Videos]
  *      summary: "Update already exist video row data"
  *      parameters:
  *        - in: path
  *          name: id
  *          required: true
  *          schema:
  *            type: integer
  *            format: int64
  *      requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#components/schemas/Video'
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: Upadated Video Schema
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#components/schemas/Video'
  */
  router.put('/update/:id', videoCtrl.updateVideo);



  /**
  * @swagger
  * paths:
  *  /video/delete/{id}:
  *    delete:
  *      tags: [Videos]
  *      summary: "Delete video"
  *      parameters:
  *        - in: path
  *          name: id
  *          required: true
  *          schema:
  *            type: integer
  *            format: int64
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: A Video Schemas
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#components/schemas/Video'
  */
  router.delete('/delete/:id',videoCtrl.deleteVideo);

  module.exports = router;