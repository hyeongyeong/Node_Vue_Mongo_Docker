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
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Video'
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
  router.post('/', videoCtrl.createVideo);


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


/*
*
*   GET POST (Update Delete) Video File
*
*/

/**
 * @swagger
 * tags:
 *   name: VideoFile
 *   description: Related to video file upload
 */

  /**
  * @swagger
  * paths:
  *  /video/file:
  *    get:
  *      tags: [VideoFile]
  *      summary: "Get Uploaded File"
  *      parameters:
  *        - in: query
  *          name: id
  *          required: false
  *          schema:
  *            type: string
  *            description: video id
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: Successfully get uploaded file
  */
     router.get('/file', videoCtrl.getVideo);

     /**
     * @swagger
     * paths:
     *  /video/file:
     *    post:
     *      tags: [VideoFile]
     *      summary: "Upload new Video File"
     *      requestBody:
     *        required: true
     *        content:
     *          multipart/form-data:
     *            schema:
     *              type: object
     *              properties:
     *                filename:
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
     router.post('/file', videoCtrl.upload.single('file'), videoCtrl.uploadVideo);



  module.exports = router;