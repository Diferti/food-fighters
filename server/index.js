const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');
const setupSwagger = require('./config/swagger');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Food Fighters Server');
});

app.use('/api/users', userRoutes);
app.use('/api/meal', mealRoutes);

setupSwagger(app);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${port}`);
});