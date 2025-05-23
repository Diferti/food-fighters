const mealAnalysisPrompt = () => {
  return `Analyze the provided meal image and generate a detailed report with the following structure:
Nutritional Breakdown
- Macronutrients: 
  - Carbs (g) 
  - Proteins (g) 
  - Fats (g) 
  - Fiber (g)
- Calories: Total (kcal)
Food Identification 
- List all identifiable items (e.g., "Grilled chicken", "Basmati rice") 
- Portion estimates: 
  - Weight (grams) per item 
  - Volume (ml) for liquids/sauces
Meal Score
- Score: 0-100 based on how healthy the meal is
Requirements:
- Use metric units only (grams, milliliters, kcal)
- Meal score for example should be 10 for foods that are related to fast food, 90 for foods that are related to healthy food
- Return a JSON object strictly using the structure below:
{
  "foodIdentification: {
    items: [
      {
        name: "",
        weight: 0,
        volume: 0
      }
    ],
  }
  mealScore: {
    score: 0
  },
  nutritionalBreakdown: {
    calories: {
      total: 0
    },
    macronutrients: {
      carbs: 0,
      fats: 0,
      fiber: 0,
      proteins: 0
    }
  }
}
`;
};

module.exports = { mealAnalysisPrompt };