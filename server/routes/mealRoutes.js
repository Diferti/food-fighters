const express = require('express');
const controller = require('../controllers/mealController');
const authenticateJWT = require('../middlewares/authMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /api/meal/analyze:
 *  post:
 *    summary: Analyze a meal
 *    description: Analyzes the nutritional content of a meal from an image
 *    tags: [Meal]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                format: binary
 *                description: The image of the meal to be analyzed
 *    responses:
 *      200:
 *        description: Successfully analyzed the meal
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                calories:
 *                  type: number
 *                  description: The number of calories in the meal
 *                protein:
 *                  type: number
 *                  description: The amount of protein in the meal
 *                fat:
 *                  type: number
 *                  description: The amount of fat in the meal
 *                carbohydrates:
 *                  type: number
 *                  description: The amount of carbohydrates in the meal
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
router.post('/analyze', authenticateJWT, upload.single('image'), controller.analyzeMeal);

router.post('/generate-diet', authenticateJWT, controller.generateDiet);

module.exports = router;