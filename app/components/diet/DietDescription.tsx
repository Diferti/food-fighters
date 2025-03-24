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
        <View>
            <View className="flex-row items-center gap-1 mb-3 justify-center lg:justify-start">
                <Text className="text-2xl">📝</Text>
                <Text className="text-xl font-extrabold font-fontHeader text-secondary">Preparation Steps</Text>
            </View>
            <Text className="text-primary/80 leading-relaxed bg-primary/10 p-3 rounded-lg font-fontMain font-bold">
                {meal?.preparation || 'No preparation instructions.'}
            </Text>

            <View className="mt-6 flex-row gap-4">
                <View className="flex-1 space-y-4">
                    <NutritionStats
                        label="Protein"
                        value={protein}
                        max={40}
                        color="bg-[#F87171]"
                        icon="🥩"
                    />
                    <NutritionStats
                        label="Carbs"
                        value={carbs}
                        max={60}
                        color="bg-[#FACC15]"
                        icon="🍞"
                    />
                </View>
                <View className="flex-1 space-y-4">
                    <NutritionStats
                        label="Fat"
                        value={fat}
                        max={30}
                        color="bg-[#60A5FA]"
                        icon="🥑"
                    />
                    <NutritionStats
                        label="Fiber"
                        value={fiber}
                        max={25}
                        color="bg-[#4ADE80]"
                        icon="🌿"
                    />
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
                <View className="mt-4 pt-4 border-t border-primary/20">
                    <View className="flex-col md:flex-row gap-4">
                        <View className="flex-1">
                            <View className="flex-row items-center justify-center gap-1 mb-3">
                                <Text className="text-2xl">🍴</Text>
                                <Text className="text-xl font-extrabold font-fontHeader text-secondary">
                                    Meal Composition
                                </Text>
                            </View>
                            {(meal?.items || []).map((item: any) => (
                                <View key={item?.food} className="py-2 border-b border-primary/70">
                                    <View className="flex-row justify-between">
                                        <Text className="text-base font-bold font-fontMain text-secondary">
                                            {item?.food || 'N/A'}
                                        </Text>
                                        <Text className="text-base font-bold font-fontMain text-primary/70">
                                            {item?.quantity || '--'}
                                        </Text>
                                    </View>
                                    <View className="flex-row gap-2">
                                        <Text className="text-sm font-bold font-fontMain text-primary/70">
                                            🥩 {item?.nutrients?.protein || 0}g
                                        </Text>
                                        <Text className="text-sm font-bold font-fontMain text-primary/70">
                                            🍞 {item?.nutrients?.carbs || 0}g
                                        </Text>
                                        <Text className="text-sm font-bold font-fontMain text-primary/70">
                                            🥑 {item?.nutrients?.fat || 0}g
                                        </Text>
                                        <Text className="text-sm font-bold font-fontMain text-primary/70">
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
        <View className="bg-pageColor p-2.5 mb-6 border border-primary rounded-xl shadow-lg">
            <View className="flex-row items-center gap-1 mb-4 justify-center">
                <Text className="text-2xl">📊</Text>
                <Text className="text-2xl font-extrabold font-fontHeader text-secondary">
                    Daily Nutrition
                </Text>
            </View>

            <View className="space-y-4">
                <View className="flex-row gap-4 mb-4">
                    <View className="bg-primary/5 p-3 rounded-lg flex-1">
                        <View className="flex-row justify-center items-center gap-1">
                            <Text className="text-xl">🍴</Text>
                            <Text className="text-sm font-bold font-fontHeader text-primary/80">
                                Total Calories
                            </Text>
                        </View>
                        <Text className="text-xl font-extrabold font-fontMain text-secondary text-center">
                            {day?.daySummary?.totalCalories || 'N/A'} kcal
                        </Text>
                    </View>
                    <View className="bg-primary/5 p-3 rounded-lg flex-1">
                        <View className="flex-row justify-center items-center gap-1">
                            <Text className="text-xl">⏳</Text>
                            <Text className="text-sm font-bold font-fontHeader text-primary/80">
                                Eating Window
                            </Text>
                        </View>
                        <Text className="text-xl font-extrabold font-fontMain text-secondary text-center">
                            {day?.daySummary?.eatingWindow || 'N/A'}
                        </Text>
                    </View>
                </View>

                <NutritionStats
                    label="Protein"
                    value={totals.protein}
                    max={150}
                    color="bg-[#F87171]"
                    icon="🥩"
                />
                <NutritionStats
                    label="Carbohydrates"
                    value={totals.carbs}
                    max={300}
                    color="bg-[#FACC15]"
                    icon="🍞"
                />
                <NutritionStats
                    label="Fat"
                    value={totals.fat}
                    max={100}
                    color="bg-[#60A5FA]"
                    icon="🥑"
                />
                <NutritionStats
                    label="Fiber"
                    value={totals.fiber}
                    max={50}
                    color="bg-[#4ADE80]"
                    icon="🌿"
                />
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
                <Text className="text-primary/60 text-center">
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

            <View className="flex-col lg:flex-row gap-8">
                <View className="lg:flex-2">
                    {(currentDayData?.meals || [])
                        .sort((a: any, b: any) => (a?.time || '').localeCompare(b?.time || ''))
                        .map((meal: any, index: number) => (
                            <MealCard key={`${meal?.mealType}-${index}`} meal={meal} />
                        ))}
                </View>

                <View className="lg:flex-1">
                    <DailySummary day={currentDayData} />
                </View>
            </View>
        </ScrollView>
    );
};