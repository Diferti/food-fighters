import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import NutritionStats from "@/app/components/diet/NutritionStats";
import MealIcon from "@/app/components/diet/MealIcon";
import AntDesign from '@expo/vector-icons/AntDesign';

const calculateMealTotals = (meal: any) => {
    return {
        protein: meal?.items?.reduce((sum: number, item: any) => sum + (item?.nutrients?.protein || 0), 0) || 0,
        carbs: meal?.items?.reduce((sum: number, item: any) => sum + (item?.nutrients?.carbs || 0), 0) || 0,
        fat: meal?.items?.reduce((sum: number, item: any) => sum + (item?.nutrients?.fat || 0), 0) || 0,
        fiber: meal?.items?.reduce((sum: number, item: any) => sum + (item?.nutrients?.fiber || 0), 0) || 0,
    };
};

const DayNavigator = ({ current, total, onChange }: any) => (
    <View className="flex-row items-center justify-center gap-4 mb-8">
        <TouchableOpacity onPress={() => onChange(Math.max(0, current - 1))} disabled={current === 0}
                          className="p-3 bg-[#354D4D] rounded-[10px] border-[1px] border-highlight disabled:opacity-50">
            <AntDesign name="caretleft" size={24} color="#ECEFF3" />
        </TouchableOpacity>
        <Text className="font-extrabold text-[36px] font-fontHeader text-secondary pt-[10px]">Day {current + 1}</Text>
        <TouchableOpacity onPress={() => onChange(Math.min(total - 1, current + 1))} disabled={current === total - 1}
                          className="p-3 bg-[#354D4D] rounded-[10px] border-[1px] border-highlight disabled:opacity-50">
            <AntDesign name="caretright" size={24} color="#ECEFF3" />
        </TouchableOpacity>
    </View>
);

const PreparationSection = ({ meal }: any) => {
    const { protein, carbs, fat, fiber } = calculateMealTotals(meal);

    return (
        <View className='bg-[#10382E] p-2.5 mb-[10x] border border-primary rounded-[10px]'>
            <View className="flex-row items-center gap-[5px] mb-[10px] justify-center">
                <Text className="text-[20px]">📝</Text>
                <Text className="text-[20px] font-fontMain-bold text-secondary">Preparation Steps</Text>
            </View>
            <Text className="text-[16px] text-highlight leading-relaxed bg-highlight/20 p-[10px] rounded-[10px] font-fontMain-bold">
                {meal?.preparation || 'No preparation instructions.'}
            </Text>

            <View className="my-[10px] flex-row gap-[20px] mx-[10px]">
                <View className="flex-1">
                    <NutritionStats label="Protein" value={protein} max={40} color="bg-[#F87171]" icon="🥩"/>
                    <NutritionStats label="Carbs" value={carbs} max={60} color="bg-[#FACC15]" icon="🍞"/>
                </View>
                <View className="flex-1">
                    <NutritionStats label="Fat" value={fat} max={30} color="bg-[#60A5FA]" icon="🥑"/>
                    <NutritionStats label="Fiber" value={fiber} max={25} color="bg-[#4ADE80]" icon="🌿"/>
                </View>
            </View>
        </View>
    );
};

const MealCard = ({ meal }: any) => {
    const [expanded, setExpanded] = useState(false);

    if (!meal) return null;

    return (
        <View className="bg-dark-blue p-2.5 mb-6 border border-highlight rounded-[10px]">
            <TouchableOpacity className="flex-row items-center justify-between" onPress={() => setExpanded(!expanded)}>
                <View className="flex-row items-center gap-1">
                    <MealIcon type={meal?.mealType} />
                    <Text className="text-[20px] font-fontHeader text-secondary pt-[6px]">
                        {meal?.mealType || 'Meal'}
                    </Text>
                    <Text className="pl-[5px] text-[16px] text-highlight/70 font-fontMain-semibold">
                        {meal?.time || 'No time'}
                    </Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <View className="bg-highlight/30 px-2 py-1 rounded-lg mr-[3px]">
                        <Text className="text-sm font-fontMain text-secondary font-fontMain-bold">
                            {meal?.totalCalories || 'N/A'} kcal
                        </Text>
                    </View>
                    <Text className={`text-highlight ${expanded ? 'rotate-180' : ''}`}>
                        ▼
                    </Text>
                </View>
            </TouchableOpacity>

            {expanded && (
                <View className="mt-[10px]">
                    <View className="flex-col md:flex-row gap-[10px]">
                        <View className="flex-1 border-[2px] border-highlight/30 rounded-[10px] pb-[15px] bg-highlight/30">
                            <View className="flex-row items-center justify-center gap-[5px] rounded-t-[8px] py-[10px]">
                                <Text className="text-[20px]">🍱</Text>
                                <Text className="text-[20px] font-fontMain-bold text-secondary">
                                    Meal Composition
                                </Text>
                            </View>
                            {(meal?.items || []).map((item: any) => (
                                <View key={item?.food} className="px-[10px] py-2 border-b-[2px] border-highlight/30 bg-dark-blue">
                                    <View className="flex-row justify-between">
                                        <Text className="text-[16px] font-fontMain-bold text-secondary">
                                            {item?.food || 'N/A'}
                                        </Text>
                                        <Text className="text-[16px] font-fontMain-bold text-secondary">
                                            {item?.quantity || '--'}
                                        </Text>
                                    </View>
                                    <View className="flex-row gap-2">
                                        <Text className="text-[14px] font-fontMain-bold text-highlight">
                                            🥩 {item?.nutrients?.protein || 0}g
                                        </Text>
                                        <Text className="text-[14px] font-fontMain-bold text-highlight">
                                            🍞 {item?.nutrients?.carbs || 0}g
                                        </Text>
                                        <Text className="text-[14px] font-fontMain-bold text-highlight">
                                            🥑 {item?.nutrients?.fat || 0}g
                                        </Text>
                                        <Text className="text-[14px] font-fontMain-bold text-highlight">
                                            🌿 {item?.nutrients?.fiber || 0}g
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <PreparationSection meal={meal} />
                    </View>
                </View>
            )}
        </View>
    );
};

const DailySummary = ({ day }: any) => {
    const totals = (day?.meals || []).reduce((acc: any, meal: any) => {
        (meal?.items || []).forEach((item: any) => {
            acc.protein += item?.nutrients?.protein || 0;
            acc.carbs += item?.nutrients?.carbs || 0;
            acc.fat += item?.nutrients?.fat || 0;
            acc.fiber += item?.nutrients?.fiber || 0;
        });
        return acc;
    }, { protein: 0, carbs: 0, fat: 0, fiber: 0 });

    return (
        <View className="bg-dark-blue mb-[10px] border border-highlight rounded-[10px] p-[15px]">
            <View className="flex-row items-center gap-[5px] justify-center mb-[15px]">
                <Text className="text-[20px]">📊</Text>
                <Text className="text-[20px] font-fontHeader text-secondary pt-[6px]">
                    Daily Nutrition
                </Text>
            </View>

            <View>
                <View className="flex-row gap-[15px]">
                    <View className="bg-highlight/30 p-[10px] rounded-[10px] flex-1 justify-center items-center">
                        <View className="flex-row justify-center items-center mb-[5px]">
                            <Text className="text-[16px]">🍴</Text>
                            <Text className="text-[16px] font-fontMain-bold text-highlight">
                                Total Calories
                            </Text>
                        </View>
                        <Text className="text-[20px] font-fontMain-extrabold text-secondary text-center">
                            {day?.daySummary?.totalCalories || 'N/A'} kcal
                        </Text>
                    </View>
                    <View className="bg-highlight/30 p-[10px] rounded-[10px] flex-1 justify-center items-center">
                        <View className="flex-row justify-center items-center mb-[5px]">
                            <Text className="text-[16px]">⏳</Text>
                            <Text className="text-[16px] font-fontMain-bold text-highlight">
                                Eating Window
                            </Text>
                        </View>
                        <Text className="text-[20px] font-fontMain-extrabold text-secondary text-center">
                            {day?.daySummary?.eatingWindow || 'N/A'}
                        </Text>
                    </View>
                </View>

                <View className="px-[10px] pt-[5px]">
                    <NutritionStats label="Protein" value={totals.protein} max={150} color="bg-[#F87171]" icon="🥩"/>
                    <NutritionStats label="Carbohydrates" value={totals.carbs} max={300} color="bg-[#FACC15]" icon="🍞"/>
                    <NutritionStats label="Fat" value={totals.fat} max={100} color="bg-[#60A5FA]" icon="🥑"/>
                    <NutritionStats label="Fiber" value={totals.fiber} max={50} color="bg-[#4ADE80]" icon="🌿"/>
                </View>

            </View>
        </View>
    );
};

export const DietDescription = ({ dietPlan }: any) => {
    const [currentDay, setCurrentDay] = useState(0);
    const validDays = dietPlan?.days?.filter((day: any) => day?.day) || [];

    useEffect(() => {
        setCurrentDay(0);
    }, [dietPlan]);

    if (!validDays.length) {
        return (
            <View className="p-8">
                <Text className="text-tertiary text-center">
                    Something went wrong, try again!
                </Text>
            </View>
        );
    }

    const totalDays = validDays.length;
    const currentDayData = validDays[currentDay] || {};

    return (
        <ScrollView className="flex-1 p-4 pt-0">
            <DayNavigator current={currentDay} total={totalDays} onChange={setCurrentDay}/>

            <View className="flex-col">
                <View className="flex-2">
                    {(currentDayData?.meals || [])
                        .sort((a: any, b: any) => (a?.time || '').localeCompare(b?.time || ''))
                        .map((meal: any, index: number) => (
                            <MealCard key={`${meal?.mealType}-${index}`} meal={meal} />
                        ))}
                </View>

                <View className="flex-1">
                    <DailySummary day={currentDayData} />
                </View>
            </View>
        </ScrollView>
    );
};