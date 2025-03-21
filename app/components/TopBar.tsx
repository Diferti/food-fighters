import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import { Ionicons, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

interface TopBarProps {
    balance: number;
}

const TopBar: React.FC<TopBarProps> = ({ balance }) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <SafeAreaView className="absolute top-0 w-full z-10">
            <View className="flex-row items-center justify-between px-[15px] bg-transparent">
                <TouchableOpacity className="bg-[#293953] rounded-full h-[26] w-[26] border-[1px] p-1 border-[#182335] flex items-center justify-center"
                    onPress={() => setShowInfo(!showInfo)}>
                    <FontAwesome6 name="question" size={16} color="#ECEFF3" />
                </TouchableOpacity>

                <View className="flex-row items-center justify-center">
                    <View className="flex-row items-center h-auto py-1 px-2 bg-[#293953] border-[1px] border-[#182335] rounded-[5px] mr-[30px]">
                        <Image source={require('../../assets/images/icons/coin.png')} className="w-4 h-4 mr-1" resizeMode="contain"/>
                        <Text className="text-secondary text-[16px] font-fontMain-bold">{balance.toLocaleString()}</Text>
                    </View>

                    <TouchableOpacity className="flex-row items-center py-1 px-2 bg-[#293953] border-[1px] border-[#182335] rounded-[5px]">
                        <View className="absolute w-[32px] h-[32px] items-center justify-center -left-[15px]">
                            <View className="absolute w-[32px] h-[32px] max-w-[32px] max-h-[32px] bg-[#293953] border-[1px] border-[#182335]
                            rounded-[5px] transform rotate-45 overflow-hidden"/>
                            <MaterialIcons name="shopping-cart" size={18} color="#ECEFF3" className="transform -rotate-45"/>
                        </View>
                        <Text className="text-secondary text-[16px] font-fontMain-regular w-[50px] text-right">Store</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TopBar;