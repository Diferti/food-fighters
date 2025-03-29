import {Text, TouchableOpacity, View} from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Link} from "expo-router";
import { DietDescription } from '../components/diet/DietDescription';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Diet = () => {
    const [savedDiet, setSavedDiet] = React.useState(null);

    const loadDiet = async () => {
        const fetchDiet = async () => {
            const diet = await AsyncStorage.getItem('diet');
            setSavedDiet(JSON.parse(diet as string));
        };

        fetchDiet();
        const interval = setInterval(fetchDiet, 5000);

        return () => clearInterval(interval);
    };

    React.useEffect(() => {
        loadDiet();
    }, []);

    return (
        <BackgroundWrapper>
            <SafeAreaView className="flex-1 mb-[45px]">
                <View className="h-full bg-dark-blue mt-[45px] m-[15px] rounded-[10px] p-[15px]">
                    <Text className="text-highlight text-[26px] font-fontHeader mt-[10px] mb-[10px] text-center">My Diet</Text>
                    {savedDiet ? 
                    <>
                    <DietDescription dietPlan={savedDiet}/>
                    <View className="items-center mt-[20px]">
                        <Link href={{ pathname: '/(diet)/generateDiet'}} asChild>
                            <TouchableOpacity className="bg-highlight h-[70px] w-[280px] justify-center rounded-[15px] active:opacity-50">
                                <Text className="text-primary text-[24px] font-fontHeader text-center pt-[7px]">GENERATE NEW DIET</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    </>
                    :
                    <View className="flex-1 justify-center">
                        <MaterialCommunityIcons name="food-variant-off" size={150} color="#818795" className="text-center"/>

                        <Text className="text-[20px] font-fontMain-bold text-tertiary text-center mb-[10px]">You don’t have diet yet</Text>

                        <View className="items-center mt-[50px]">
                            <Link href={{ pathname: '/(diet)/generateDiet'}} asChild>
                                <TouchableOpacity className="bg-highlight h-[70px] w-[280px] justify-center rounded-[15px] active:opacity-50">
                                    <Text className="text-primary text-[24px] font-fontHeader text-center pt-[7px]">GENERATE DIET</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                    }
                </View>
            </SafeAreaView>
        </BackgroundWrapper>
    );
};

export default Diet;