const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { secretKey } = require('../config/config');

const _updateLastOnline = async (user) => {
    user.lastOnline = Date.now();
    await user.save();
};

const login = async (req, res) => {
    const { username, password } = req.body;
    let user = await User.findOne({ username, password });

    if (!user) {
        const email = username;
        user = await User.findOne({
            email
        });
        if (!user) {
            res.status(401).send('Invalid credentials');
            return;
        }
    }

    _updateLastOnline(user);

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '7d' });
    res.json({ token });
};

const register = async (req, res) => {
    const { username, email, password, goal, weight, height, activityLevel, gender, weightGainTarget, dateOfBirth } = req.body;

    if (!username || !email || !password || !weight || !height) {
        res.status(400).send('All fields are required');
        return;
    }

    if (username.length < 4 || username.length > 20) {
        res.status(400).send('Username must be between 4 and 20 characters');
        return;
    }

    if (password.length < 8 || password.length > 20) {
        res.status(400).send('Password must be between 8 and 20 characters');
        return;
    }

    if (username.match(/[^a-zA-Z0-9]/)) {
        res.status(400).send('Username must contain only letters and numbers');
        return;
    }

    if (email.match(/[^a-zA-Z0-9@.]/)) {
        res.status(400).send('Invalid email');
        return;
    }

    const lastOnline = Date.now();
    const friendCode = Math.random().toString(36).substring(2, 8);
    const user = new User({ username, email, password, goal, weight, height, activityLevel, gender, weightGainTarget, dateOfBirth, lastOnline, friendCode});

    await user.save();
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '7d' });
    res.json({ token });
};

const checkUsername = async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({
        username
    });

    if (user) {
        res.status(409).send('Username already exists');
    }
    else {
        res.status(200).send('Username is available');
    }
};

const getUserData = async (req, res) => {
    const user = await req.getUser();

    user.lastOnline = Date.now();
    await user.save();

    const rank = await User.countDocuments({ persistentPoints: { $gt: user.persistentPoints } }) + 1;

    const u = {
        username: user.username,
        goal: user.goal,
        weight: user.weight,
        height: user.height,
        activityLevel: user.activity,
        points: user.points,
        persistentPoints: user.persistentPoints,
        rank: rank,
        avatar: user.avatar,
        gender: user.gender,
        friendCode: user.friendCode,
        dateOfBirth: user.dateOfBirth,
        weightGainTarget: user.weightGainTarget
    }

    res.status(200).json(u);
};

const getProfileByUsername = async (req, res) => {
    const user = await req.getUser();

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    user = {
        username: user.username,
        goal: user.goal,
        weight: user.weight,
        height: user.height,
        activityLevel: user.activity,
        persistentPoints: user.persistentPoints
    }

    res.status(200).json(user);
};

const updateProfile = async (req, res) => {
    const { goal, weight, height, activityLevel } = req.body;
    const user = await req.getUser();
    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    user.goal = goal;
    user.weight = weight;
    user.height = height;
    user.activityLevel = activityLevel;
    await user.save();
    res.status(200).send('Profile updated');
}

const addFriend = async (req, res) => {
    const { friendUsername } = req.body;
    const user = await req.getUser();

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    if (user.username === friendUsername) {
        res.status(409).send('Cannot add yourself as a friend');
        return;
    }

    const friend = await User.findOne({
        username: friendUsername
    });

    if (!friend) {
        res.status(404).send('Friend not found');
        return;
    }

    if (user.friends.includes(friend._id)) {
        res.status(409).send('Friend already added');
        return;
    }

    user.friends.push(friend._id);
    user.friendRequests = [];
    await user.save();
    friend.friends.push(user._id);
    await friend.save();
    res.status(200).send('Friend added');
};

const declineFriendRequest = async (req, res) => {
    const { friendUsername } = req.body;
    const user = await req.getUser();

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    const friend = await User.findOne({
        username: friendUsername
    });

    if (!friend) {
        res.status(404).send('Friend not found');
        return;
    }

    if (!user.friendRequests.includes(friend._id)) {
        res.status(409).send('No friend request from this user');
        return;
    }

    user.friendRequests = user.friendRequests.filter(friendRequest => friendRequest != friend._id);
    await user.save();
    res.status(200).send('Friend request declined');
};
        

const sendFriendRequest = async (req, res) => {
    const { friendUsername } = req.body;
    const user = await req.getUser();

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    if (user.username === friendUsername) {
        res.status(409).send('Cannot add yourself as a friend');
        return;
    }

    const friend = await User.findOne({
        $or: [{ username: friendUsername }, { friendCode: friendUsername }]
    });

    if (!friend) {
        res.status(404).send('Friend not found');
        return;
    }

    if (friend.friendRequests.includes(user._id)) {
        res.status(409).send('Friend request already sent');
        return;
    }

    if (user.friends.includes(friend._id)) {
        res.status(409).send('Friend already added');
        return;
    }

    friend.friendRequests.push(user._id);
    await friend.save();
    res.status(200).send('Friend request sent');
};

const getFriends = async (req, res) => {
    const user = await req.getUser();

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    let friends = await User.find({ _id: { $in: user.friends } });
    for (let i = 0; i < friends.length; i++) {
        friends[i] = {
            username: friends[i].username,
            persistentPoints: friends[i].persistentPoints,
            isOnline: friends[i].lastOnline > Date.now() - 60000,
            avatar: friends[i].avatar
        };
    }
    res.status(200).json(friends);
};

const getFriendRequests = async (req, res) => {
    const user = await req.getUser();

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    let friendRequests = await User.find({ _id: { $in: user.friendRequests } });
    for (let i = 0; i < friendRequests.length; i++) {
        friendRequests[i] = {
            username: friendRequests[i].username,
            avatar: friendRequests[i].avatar
        };
    }
    res.status(200).json(friendRequests);
};

const getLeaderboard = async (req, res) => {
    let { skip, limit, friendsOnly } = req.query;
    if (!skip) {
        skip = 0;
    } else {
        skip = parseInt(skip);
    }

    if (!limit) {
        limit = 100;
    } else {
        limit = parseInt(limit);
    }

    let users = [];
    if (friendsOnly === 'true') {
        const { friends } = await req.getUser();
        users = await User.find({ _id: { $in: friends } }, { username: 1, persistentPoints: 1, avatar: 1 })
            .sort({ persistentPoints: -1 }).skip(skip).limit(limit);
    } else {
        users = await User.find({}, { username: 1, persistentPoints: 1, avatar: 1 })
            .sort({ persistentPoints: -1 }).skip(skip).limit(limit);
    }
    for (let i = 0; i < users.length; i++) {
        users[i] = {
            id: users[i]._id,
            rank: skip + i + 1,
            username: users[i].username,
            persistentPoints: users[i].persistentPoints,
            avatar: users[i].avatar
        };
    }
    res.status(200).json(users);
};

const googleAuth = async (req, res) => {
    const { id_token, avatar } = req.body;
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await User.findOne({ googleId: sub });

    if (!user) {
        user = new User({ googleId: sub, email, username: name, avatar });
        await user.save();
    }

    _updateLastOnline(user);

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '7d' });
    res.json({ token });
}

module.exports = { login, register, checkUsername, getUserData, getProfileByUsername, updateProfile, addFriend, sendFriendRequest, declineFriendRequest, getFriends, getFriendRequests, getLeaderboard, googleAuth };
