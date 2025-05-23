const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    
});

const Meal = mongoose.model('Meal', mealSchema, 'meals');

module.exports = Meal;