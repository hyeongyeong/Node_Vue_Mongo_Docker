/**
 * @swagger
 * tags:
 *      name: Videos
 *      description: Video management
 */
 const express = require('express');
 const router = express.Router();
 const videoCtrl = require('./video.controller');

  /**
  * @swagger
  * paths:
  *  /video:
  *    get:
  *      summary: Select Video
  *      tags: [Videos]
  *      response:
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
  *      operationId: "addVideo"
  *      consumes:
  *        - "application/json"
  *      produces:
  *        - "application/json"
  *      parameters:
  *        - in: "body"
  *          name: "body"
  *          description: "Video object that needs to be upload"
  *          required: true
  *          schema:
  *            $ref: "#/components/schemas/Video"
  *      response:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: A Video Schemas
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#components/schemas/Video'
  */
  router.post('/', videoCtrl.createVideo);


  module.exports = router;