require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
const secretKey = process.env.JWT_SECRET;

module.exports = { mongoURI, secretKey };