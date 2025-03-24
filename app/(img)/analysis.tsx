import { Image, ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context";
import {Link} from "expo-router";
import React from "react";
import NutritionStats from "@/app/components/diet/NutritionStats";

import { sendMealAnalyzeRequest } from '../routes/api';

interface IdentifiedItem {
    product: string;
    weight: string;
    volume: string;
}

const Analysis = () => {
    const navigation = useNavigation();

    const [protein, setProtein] = React.useState(0);
    const [carbs, setCarbs] = React.useState(0);
    const [fats, setFats] = React.useState(0);
    const [fiber, setFiber] = React.useState(0);

    const [calories, setCalories] = React.useState(0);

    const [identifiedItems, setIdentifiedItems] = React.useState<IdentifiedItem[]>([]);

    const route = useRoute();
    const { photoUri } = route.params as { photoUri: string };

    const [pointsEarned, setPointsEarned] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(true);
    const [loadingText, setLoadingText] = React.useState('Analyzing...');

    const [isError, setIsError] = React.useState(false);
    const [errorText, setErrorText] = React.useState('');

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!isLoading) {
                return;
            }
            setLoadingText(["Analyzing...", "Please wait a moment...", "Calculating..."][Math.floor(Date.now() / 3000) % 3]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleFoodAnalysisRequest = async () => {
        setIsLoading(true);
        const response = await sendMealAnalyzeRequest(photoUri);
        if (response.error) {
            setIsError(true);
            setErrorText(response.error);
            handleFoodAnalysisRequest();
            return;
        }
        console.log(response);

        const nutritionalBreakdown = response.nutritionalBreakdown;
        const macronutrients = nutritionalBreakdown.macronutrients;
        setCalories(nutritionalBreakdown.calories.total ?? 0);
        setProtein(macronutrients.proteins ?? 0);
        setCarbs(macronutrients.carbs ?? 0);
        setFats(macronutrients.fats ?? 0);
        setFiber(macronutrients.fiber ?? 0);

        setPointsEarned(response.mealScore.score);

        try {
            const items = response.foodIdentification.items;
            const identifiedItems: IdentifiedItem[] = items.map((item: any) => ({
                product: item.name,
                weight: item.weight,
                volume: item.volume,
            }));

            setIdentifiedItems(identifiedItems);
        } catch (e) {
            console.log(e);
        }

        setIsLoading(false);
    };

    React.useEffect(() => {
        handleFoodAnalysisRequest();
    }, []);

    return (
        <SafeAreaView className="flex-1 p-[5px] bg-primary">
            <Link href="../" asChild>
                <TouchableOpacity className="ml-[12px] mt-0 active:opacity-50">
                    <Ionicons name="chevron-back" size={30} color="#07BA4D" />
                </TouchableOpacity>
            </Link>

            <Text className="text-highlight text-[26px] font-fontHeader mb-[25px] text-center">ANALYSIS</Text>
            {
            isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#07BA4D" />
                    <Text className="text-highlight text-[18px] mt-4">
                        {loadingText}
                    </Text>
                    {isError ? (
                    <Text className="text-secondary text-[14px] mt-2">
                        {errorText}
                    </Text>
                    ) : null}
                </View>
            ) : 
            (
                <View className="px-4">
                    <View className="rounded-[15px]">
                        <View className="flex-row">
                            <View className="mr-[10px] justify-between">
                                <View className="h-[130px] w-[130px]">
                                    <Image source={{ uri: photoUri }}
                                        className="w-full h-full rounded-xl border-2 border-highlight"/>
                                </View>

                                <View className="flex-row items-center p-[8px] bg-highlight/10 rounded-[10px]">
                                    <Text className="text-[38px] mr-3">🍽️</Text>
                                    <View>
                                        <Text className="text-[12px] text-secondary font-fontMain-regular">Calories</Text>
                                        <Text className="text-[22px] text-highlight font-fontMain-bold">
                                            {calories}
                                            <Text className="text-[16px] text-highlight font-fontMain-regular"> kcal</Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View className="flex-1 bg-dark-blue rounded-[15px] p-[10px]">
                                <Text className="text-[20px] font-fontMain-bold text-secondary text-center">
                                    Nutritional Breakdown
                                </Text>
                                <View>
                                    <NutritionStats icon="🥩" label="Protein" value={protein} max={60} color="bg-[#F87171]" />
                                    <NutritionStats icon="🍞" label="Carbs" value={carbs} max={120} color="bg-[#FACC15]" />
                                    <NutritionStats icon="🥑" label="Fats" value={fats} max={40} color="bg-[#60A5FA]" />
                                    <NutritionStats icon="🌿" label="Fiber" value={fiber} max={25} color="bg-[#4ADE80]" />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="bg-[#10382E] rounded-[15px] p-[15px] pt-[10px] mt-[20px] h-[230px]">
                        <Text className="text-[20px] font-fontMain-bold text-secondary text-center mb-[10px]">
                            Identified Items
                        </Text>

                        <View>
                            <View className="flex-row justify-between items-center pb-2 border-b border-highlight">
                                <Text className="text-[16px] font-fontMain-semibold text-highlight">Product</Text>
                                <Text className="text-[16px] font-fontMain-semibold text-highlight">Weight</Text>
                            </View>
                            <View className="h-[140px]">
                                <ScrollView className="flex-1" showsVerticalScrollIndicator={true}>
                                    {identifiedItems.map((item, index) => (
                                        <View key={index} className="flex-row justify-between items-center py-2 border-b border-highlight">
                                            <Text className="text-secondary text-[14px] font-fontMain-regular">{item.product}</Text>
                                            <Text className="text-secondary text-[14px] font-fontMain-regular">{item.weight}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </View>

                    <View className="bg-dark-blue rounded-[15px] p-4 mt-[20px]">
                        <View className="flex-row justify-evenly">
                            <TouchableOpacity className="flex-row h-[65px] bg-tertiary/30 p-4 rounded-[15px] justify-center items-center">
                                <Image source={require('../../assets/images/icons/gem.png')} className="w-[30px] h-[30px] mr-[10px]"/>
                                <Text className="text-[30px] text-highlight font-fontHeader pt-[8px]">
                                    +{pointsEarned}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row h-[65px] bg-tertiary/30 p-4 rounded-[15px] justify-center items-center">
                                <Image source={require('../../assets/images/icons/coin.png')} className="w-[30px] h-[30px] mr-[10px]"/>
                                <Text className="text-[30px] text-highlight font-fontHeader pt-[8px]">
                                    +{pointsEarned}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-row justify-center mt-[20px]">
                        <Link href="../" asChild>
                            <TouchableOpacity className="bg-highlight h-[70px] w-[280px] justify-center rounded-[15px] active:opacity-50">
                                <Text className="text-primary text-[24px] font-fontHeader text-center pt-[7px]">
                                    CLAIM
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
                )}
        </SafeAreaView>
    );
};

export default Analysis;