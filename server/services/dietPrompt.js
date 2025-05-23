const generateDietPrompt = ({duration, age, gender, weight, height, activityLevel,
  goal, desiredWeight, selectedMeals, loveProducts, unloveProducts, restrictions
}) => {
  return `Generate a ${duration ? duration : "1"}-days diet plan for a ${age}-year-old ${gender} based on:
${gender === 'male' ? '♂ Male' : '♀ Female'} Profile:
- Current Weight: ${weight} kg
- Height: ${height} cm
- Activity Level: ${activityLevel}
- Goal: ${goal}${desiredWeight ? ` → Target: ${desiredWeight}kg` : ''}

Nutritional Requirements:
- Meals/Day: ${selectedMeals.length > 0 ? selectedMeals.length : 3}${selectedMeals.length > 0 ? " (" + selectedMeals.join(', ') + ")" : " (Breakfast, Lunch, Dinner)"}
- Calories/Day: auto-calculated

Foods to include: ${loveProducts.length > 0 ? loveProducts.join(', ') + " (use them often, but not always)" : 'None'}
Foods to avoid: ${unloveProducts.join(', ') || 'None'}

Restrictions:
${restrictions.length > 0 ? `- ${restrictions.join('\n- ')}` : '- None'}

Please provide:
1. Exact gram measurements for all portions
2. Calorie estimates per meal
3. Meal prep instructions
4. The response **must contain a diet plan for ${duration ? duration + " days" : "1 day"}**—no more, no less.
5. The response **must contain meals for ${selectedMeals.length > 0 ? selectedMeals.join(', ') : "Breakfast, Lunch, Dinner"} for each day**.
6. Return a JSON object, strictly using the data provided above and following the format of the example below, containing a 'days' array, with each element containing a 'day' number, 'meals' array, and 'daySummary' object.
The 'daySummary' object should include the total calories for the day and the eating window.
Use the example below as a reference for the structure and format of the response:

days: [
  {
      day: 1,
      meals: [
          {
              mealType: 'Breakfast',
              time: '8:00',
              preparation: 'Scramble eggs with spinach and tomatoes. Serve with whole grain toast. gwuiuhguiwhegfuinbweuigniujweguiwehngijwneijgnweiugniuwjengiwengijwenigjnwejignwijengjiwengwneigjwnejignji',
              items: [
                  {
                      food: 'Eggs',
                      quantity: '2 large',
                      nutrients: { protein: 12, carbs: 2, fat: 10, fiber: 0 }
                  },
                  {
                      food: 'Whole Grain Toast',
                      quantity: '1 slice',
                      nutrients: { protein: 4, carbs: 12, fat: 1, fiber: 2 }
                  }
              ],
              totalCalories: 300
          },
          {
              mealType: 'Lunch',
              time: '13:00',
              preparation: 'Grilled chicken salad with mixed greens, olive oil dressing.',
              items: [
                  {
                      food: 'Chicken Breast',
                      quantity: '150g',
                      nutrients: { protein: 35, carbs: 0, fat: 4, fiber: 0 }
                  },
                  {
                      food: 'Mixed Greens',
                      quantity: '100g',
                      nutrients: { protein: 2, carbs: 3, fat: 0, fiber: 2 }
                  }
              ],
              totalCalories: 280
          },
          {
              mealType: 'Dinner',
              time: '19:00',
              preparation: 'Baked salmon with steamed broccoli and quinoa.',
              items: [
                  {
                      food: 'Salmon',
                      quantity: '200g',
                      nutrients: { protein: 40, carbs: 0, fat: 18, fiber: 0 }
                  },
                  {
                      food: 'Quinoa',
                      quantity: '1/2 cup',
                      nutrients: { protein: 4, carbs: 20, fat: 2, fiber: 3 }
                  }
              ],
              totalCalories: 450
          }
      ],
      daySummary: {
          totalCalories: 1030,
          eatingWindow: '8:00 - 20:00'
      }
  },
  {
      day: 2,
      meals: [
          {
              mealType: 'Breakfast',
              time: '7:30',
              preparation: 'Greek yogurt with berries and almonds.',
              items: [
                  {
                      food: 'Greek Yogurt',
                      quantity: '150g',
                      nutrients: { protein: 15, carbs: 6, fat: 0, fiber: 0 }
                  },
                  {
                      food: 'Mixed Berries',
                      quantity: '1/2 cup',
                      nutrients: { protein: 1, carbs: 10, fat: 0, fiber: 3 }
                  }
              ],
              totalCalories: 200
          },
          {
              mealType: 'Lunch',
              time: '12:30',
              preparation: 'Turkey wrap with whole wheat tortilla and veggies.',
              items: [
                  {
                      food: 'Turkey Breast',
                      quantity: '100g',
                      nutrients: { protein: 25, carbs: 0, fat: 2, fiber: 0 }
                  },
                  {
                      food: 'Whole Wheat Tortilla',
                      quantity: '1 medium',
                      nutrients: { protein: 4, carbs: 18, fat: 2, fiber: 3 }
                  }
              ],
              totalCalories: 320
          }
      ],
      daySummary: {
          totalCalories: 900,
          eatingWindow: '7:30 - 19:30'
      }
  }
]}`
};

module.exports = { generateDietPrompt };