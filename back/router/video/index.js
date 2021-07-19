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
*   GET POST (Update Delete) Video Row
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

/*
*
*   GET POST (Update Delete) Video File
*
*/

    /**
  * @swagger
  * paths:
  *  /video/file:
  *    get:
  *      tags: [Videos]
  *      summary: "Get Uploaded File"
  *      parameters:
  *        - in: query
  *          name: video
  *          required: false
  *          schema:
  *            type: string
  *            description: 비디오 이름
  *      responses:
  *        "405":
  *          description: "Invalid input"
  *        "200" :
  *          description: 비디호 조회 성공
  */
     router.get('/file', videoCtrl.uploadVideo);

     /**
     * @swagger
     * paths:
     *  /video/file:
     *    post:
     *      tags: [Videos]
     *      summary: "Upload new Video File"
     *      consumes:
     *        - multipart/form-data
     *      parameters:
     *        - in: formData
     *          name: upfile
     *          type: file
     *          desription: The file to upload
     *      responses:
     *        "405":
     *          description: "Invalid input"
     *        "200":
     *          description: 비디오 업로드 성공
     */
     router.post('/file', videoCtrl.getVideo);



  module.exports = router;