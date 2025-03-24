import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Link} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import MealIcon from "@/app/components/diet/MealIcon";
import {SafeAreaView} from "react-native-safe-area-context";
import {DietDescription} from "@/app/components/diet/DietDescription";

const fakeDietPlan = {
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
    ]
};

const ShowDiet = () => {
    return (
        <SafeAreaView className="flex-1 bg-primary p-5">
            <Link href="../" asChild>
                <TouchableOpacity className="mb-[20px]">
                    <Ionicons name="chevron-back" size={30} color="#07BA4D" />
                </TouchableOpacity>
            </Link>

            <Text className="text-highlight text-[26px] font-fontHeader mb-[20px] text-center">
                GENERATED DIET
            </Text>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <DietDescription dietPlan={fakeDietPlan}/>

                <View className="items-center">
                    <TouchableOpacity className="bg-highlight h-[70px] w-[280px] justify-center rounded-[15px] active:opacity-50">
                        <Text className="text-primary text-[24px] font-fontHeader text-center pt-[7px]">SAVE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ShowDiet


