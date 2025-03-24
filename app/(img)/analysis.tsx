import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context";
import {Link} from "expo-router";
import React from "react";
import NutritionStats from "@/app/components/diet/NutritionStats";


const Analysis = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 p-[5px] bg-primary">
            <Link href="../" asChild>
                <TouchableOpacity className="ml-[12px] mt-0 active:opacity-50">
                    <Ionicons name="chevron-back" size={30} color="#07BA4D" />
                </TouchableOpacity>
            </Link>

            <Text className="text-highlight text-[26px] font-fontHeader mb-[25px] text-center">ANALYSIS</Text>

                <View className="px-4">
                    <View className="rounded-[15px]">
                        <View className="flex-row">
                            <View className="mr-[10px] justify-between">
                                <View className="h-[130px] w-[130px]">
                                    <Image source={{ uri: 'https://images.unsplash.com/photo-151548276804b-ef922c09cfa4' }}
                                        className="w-full h-full rounded-xl border-2 border-highlight"/>
                                </View>

                                <View className="flex-row items-center p-[8px] bg-highlight/10 rounded-[10px]">
                                    <Text className="text-[38px] mr-3">🍽️</Text>
                                    <View>
                                        <Text className="text-[12px] text-secondary font-fontMain-regular">Calories</Text>
                                        <Text className="text-[22px] text-highlight font-fontMain-bold">
                                            550
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
                                    <NutritionStats icon="🥩" label="Protein" value={45} max={60} color="bg-[#F87171]" />
                                    <NutritionStats icon="🍞" label="Carbs" value={67} max={120} color="bg-[#FACC15]" />
                                    <NutritionStats icon="🥑" label="Fats" value={23} max={40} color="bg-[#60A5FA]" />
                                    <NutritionStats icon="🌿" label="Fiber" value={23} max={25} color="bg-[#4ADE80]" />
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
                                    {[
                                        { product: 'Grilled chicken breast', weight: '150g' },
                                        { product: 'Spaghetti', weight: '100g' },
                                        { product: 'Sautéed onions and mushrooms', weight: '50g' },
                                        { product: 'Cherry tomatoes', weight: '50g' },
                                        { product: 'Sautéed onions and mushrooms', weight: '50g' },
                                        { product: 'Cherry tomatoes', weight: '50g' },
                                        { product: 'Sautéed onions and mushrooms', weight: '50g' },
                                        { product: 'Cherry tomatoes', weight: '50g' },
                                    ].map((item, index) => (
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
                                    +100
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row h-[65px] bg-tertiary/30 p-4 rounded-[15px] justify-center items-center">
                                <Image source={require('../../assets/images/icons/coin.png')} className="w-[30px] h-[30px] mr-[10px]"/>
                                <Text className="text-[30px] text-highlight font-fontHeader pt-[8px]">
                                    +100
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-row justify-center mt-[20px]">
                        <TouchableOpacity className="bg-highlight h-[70px] w-[280px] justify-center rounded-[15px] active:opacity-50">
                            <Text className="text-primary text-[24px] font-fontHeader text-center pt-[7px]">
                                CLAIM
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
};

export default Analysis;