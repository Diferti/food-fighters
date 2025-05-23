const express = require('express');
const controller = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', controller.login);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: User registration
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *              email:
 *                type: string
 *               password:
 *                 type: string
 *               goal:
 *                 type: number
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               activityLevel:
 *                 type: number
 *               gender:
 *                 type: string
 *               weightGainTarget:
 *                 type: number
 *               dateOfBirth:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */
router.post('/register', controller.register);


router.get('/google-auth', controller.googleAuth);

/**
 * @swagger
 * /api/users/check-username:
 *   post:
 *     summary: Check if username is available
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Username is available
 *       409:
 *         description: Username already exists
 */
router.post('/check-username', controller.checkUsername);

/**
 * @swagger
 * /api/users/data:
 *  get:
 *   summary: Get user data
 *  tags: [Users]
 *  responses:
 *   200:
 *    description: User data
 *  security:
 * - bearerAuth: []
 */
router.get('/data', authenticateJWT, controller.getUserData);

/**
 * @swagger
 * /api/users/get/{username}:
 *   get:
 *     summary: Get user profile by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: User profile
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 */
router.get('/get/:username', authenticateJWT, controller.getProfileByUsername);

/**
 * @swagger
 * /api/users/update-profile:
 *   post:
 *     summary: Update user profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goal:
 *                 type: number
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               activityLevel:
 *                 type: number
 *     responses:
 *       200:
 *         description: Profile updated
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 */
router.post('/update-profile', authenticateJWT, controller.updateProfile);

/**
 * @swagger
 * /api/users/add-friend:
 *   post:
 *     summary: Add a friend
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friendUsername:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend added successfully
 *       404:
 *         description: User not found
 *       409:
 *         description: Friend already added
 *     security:
 *       - bearerAuth: []
 */
router.post('/add-friend', authenticateJWT, controller.addFriend);

/**
 * @swagger
 * /api/users/send-friend-request:
 *   post:
 *     summary: Send a friend request
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friendUsername:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend request sent successfully
 *       404:
 *         description: User not found
 *       409:
 *         description: Friend request already sent
 *     security:
 *      - bearerAuth: []
 */
router.post('/send-friend-request', authenticateJWT, controller.sendFriendRequest);

router.post('/decline-friend-request', authenticateJWT, controller.declineFriendRequest);

router.get('/get-friend-requests', authenticateJWT, controller.getFriendRequests);

/**
 * @swagger
 * /api/users/friends:
 *   get:
 *     summary: Get user's friends
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of friends
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 */
router.get('/friends', authenticateJWT, controller.getFriends);

/**
 * @swagger
 * /api/users/leaderboard:
 *   get:
 *     summary: Get leaderboard
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of users to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of users to skip before starting to collect the result set
 *     responses:
 *       200:
 *        description: Leaderboard
 *     security:
 *       - bearerAuth: []
 */
router.get('/leaderboard', authenticateJWT, controller.getLeaderboard);


module.exports = router;