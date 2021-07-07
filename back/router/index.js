/**
 * @swagger
 * tags:
 *      name: Videos
 *      description: Video management
 */
const videoRouter = express.Router();

/**
 * @swagger
 * path:
 *  /video:
 *      get:
 *          summary: Select Video
 *          tags:   [Videos]
 *          response:
 *              "200" :
 *                  description: A Video Schemas
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Video'
 */
videoRouter.get(routes.video, getVideo);

/**
 * @swagger
 * tags:
 *      name: Categories
 *      description: Category management
 */
 const categoryRouter = express.Router();

 /**
  * @swagger
  * path:
  *  /category:
  *      get:
  *          summary: Select Category
  *          tags:   [Categories]
  *          response:
  *              "200" :
  *                  description: A Category Schemas
  *                  content:
  *                      application/json:
  *                          schema:
  *                              $ref: '#components/schemas/Category'
  */
 categoryRouter.get(routes.category, getCategory);