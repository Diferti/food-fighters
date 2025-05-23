const fs = require('fs');
const { mealAnalysisPrompt } = require('../services/mealAnalysisPrompt');
const { generateDietPrompt } = require('../services/dietPrompt');
const OpenAI = require('openai');

require('dotenv').config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const analyzeMeal = async (req, res) => {
    try {
        const imageFile = req.file;
        const systemPrompt = mealAnalysisPrompt();

        const buffer = fs.readFileSync(imageFile.path);
        const base64Image = buffer.toString('base64');
        const imageUrl = `data:${imageFile.mimetype};base64,${base64Image}`;

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { 
                    role: "system", 
                    content: systemPrompt
                },
                { 
                    role: "user", 
                    content: [
                        {
                            type: "image_url",
                            image_url: {url: imageUrl}
                        }
                    ] 
                },
            ],
            response_format: { type: "json_object" },
        });

        const response = JSON.parse(completion.choices[0].message.content);
        const user = await req.getUser();
        user.points += response.mealScore.score;
        user.persistentPoints += response.mealScore.score;
        await user.save();
        res.json(response);
    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ error: 'Failed to analyze image' });
    }
};

const generateDiet = async (req, res) => {
    const user = await req.getUser();
    const age = user.dateOfBirth ? Math.floor((new Date() - new Date(user.dateOfBirth).getTime()) / 3.15576e+10) : 25;
    
    const activityLevels = [
        'Sedentary - Little to no exercise, mostly sitting (e.g., desk job, minimal movement)',
        'Low Active Light exercise or walking (e.g., short daily walks, occasional workouts)',
        'Active - Regular exercise or physically demanding job (e.g., gym 3–5 times a week, manual labor)',
        'Very Active - Intense daily exercise or highly active job (e.g., athlete, construction worker, frequent high-intensity workouts)'
    ];
    const activityLevel = activityLevels[user.activityLevel];

    const goals = [
        'Maintain my current weight',
        'Weight gain',
        'Weight loss'
    ];
    const goal = goals[user.goal];

    const desiredWeight = user.goal === 1 ? user.weight + user.weightGainTarget : null;

    const selectedMeals = req.body.selectedMeals;
    const loveProducts = req.body.loveProducts;
    const unloveProducts = req.body.unloveProducts;
    const restrictions = req.body.restrictions;

    try {
        const systemPrompt = generateDietPrompt({
            duration: req.body.selectedDays,
            age: age,
            gender: user.gender,
            weight: user.weight,
            height: user.height,
            activityLevel: activityLevel,
            goal: goal,
            desiredWeight: desiredWeight,
            selectedMeals: selectedMeals ?? [],
            loveProducts: loveProducts ?? [],
            unloveProducts: unloveProducts ?? [],
            restrictions: restrictions ?? []
        });

        console.log(systemPrompt);

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { 
                    role: "system", 
                    content: systemPrompt
                },
            ],
            response_format: { type: "json_object" },
        });

        const response = JSON.parse(completion.choices[0].message.content);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { analyzeMeal, generateDiet };