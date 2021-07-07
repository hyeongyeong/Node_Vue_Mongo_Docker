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
  *      tags:   [Videos]
  *      response:
  *        "200" :
  *          description: A Video Schemas
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#components/schemas/Video'
  */
//   router.get('/', videoCtrl.getAllVideo);

  /**
  * @swagger
  * paths:
  *  /video:
  *    post:
  *      summary: Select Video
  *      tags:   [Videos]
  *      response:
  *        "200" :
  *          description: A Video Schemas
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#components/schemas/Video'
  */
  router.post('/', videoCtrl.createVideo);


  module.exports = router;