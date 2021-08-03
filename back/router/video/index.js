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
  *  /video/delete:
  *    delete:
  *      tags: [Videos]
  *      summary: "Delete video"
  *      parameters:
  *        - in: query
  *          name: id
  *          required: false
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
  router.delete('/delete',videoCtrl.deleteVideo);

  module.exports = router;