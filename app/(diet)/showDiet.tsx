import {ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native'
import React from 'react'
import {Link, Redirect} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import MealIcon from "@/app/components/diet/MealIcon";
import {SafeAreaView} from "react-native-safe-area-context";
import {DietDescription} from "@/app/components/diet/DietDescription";
import { useRoute } from '@react-navigation/native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { sendDietGenerationRequest } from '../routes/api';


const ShowDiet = () => {
    const [dietPlan, setDietPlan] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(true);
    const [loadingText, setLoadingText] = React.useState("Generating diet plan...");

    const [isError, setIsError] = React.useState(false);
    const [errorText, setErrorText] = React.useState("");

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!isLoading) {
                return;
            }
            setLoadingText(["Generating diet plan...", "Please wait a moment...", "Calculating..."][Math.floor(Date.now() / 3000) % 3]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    
    const route = useRoute();
    const { selectedDays, selectedMeals, restrictions, loveProducts, unlovedProducts } = route.params as 
        { selectedDays: number, selectedMeals: string[], restrictions: string[], loveProducts: string[], unlovedProducts: string[] };

    const handleDietGenerationRequest = async () => {
        setIsLoading(true);
        console.log("sending: ", selectedDays, selectedMeals, restrictions, loveProducts, unlovedProducts);
        const response = await sendDietGenerationRequest(selectedDays, selectedMeals, restrictions, loveProducts, unlovedProducts);
        if (response.error) {
            setIsError(true);
            setErrorText("Error");
            console.log(response.error);
            return;
        }

        setDietPlan(response);
        setIsLoading(false);

        AsyncStorage.setItem('diet', JSON.stringify(response));
    }

    React.useEffect(() => {
        handleDietGenerationRequest();
    }, []);

    const router = useRouter();

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
            
            {isLoading ? (
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
            ) : (
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <DietDescription dietPlan={dietPlan}/>

                <View className="items-center">
                    <TouchableOpacity className="bg-highlight h-[70px] w-[280px] justify-center rounded-[15px] active:opacity-50"
                        onPress={() => router.push("/(tabs)/diet")}>
                        <Text className="text-primary text-[24px] font-fontHeader text-center pt-[7px]">SAVE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            )}
        </SafeAreaView>
    )
}
export default ShowDiet;


