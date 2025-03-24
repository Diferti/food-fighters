import React, { useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { getUserDataRequest } from '../routes/api';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

import { getTierImage } from '../tiers';

const Main = () => {
    const [username, setUsername] = React.useState('');
    const [points, setPoints] = React.useState(0);
    const [persistentPoints, setPersistentPoints] = React.useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserDataRequest();
            setUsername(data.username);
            setPoints(data.points);
            setPersistentPoints(data.persistentPoints);
            await AsyncStorage.setItem('friendCode', data.friendCode);
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserDataRequest();
            setPoints(data.points);
            setPersistentPoints(data.persistentPoints);
        };

        const interval = setInterval(() => {
            fetchUserData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <BackgroundWrapper>
            <SafeAreaView className="flex-1">
                <View style={{
                        marginTop: 60,
                        marginHorizontal: 25,
                        height: 95,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        borderColor: '#182335',
                        borderWidth: 2,
                        shadowColor: '#121A27',
                        shadowOffset: { width: 0, height: 7 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        elevation: 5,
                        zIndex: 5,
                    }}>
                    <LinearGradient
                        colors={['#121A27', '#293953']}
                        start={[0, 0]}
                        end={[0, 1]}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 15,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                        }}>

                        <View className="flex-row items-center">
                            <View className="w-[65px] h-[65px] rounded-[5px] border border-highlight bg-transparent justify-center items-center">
                                <Image source={require('../../assets/images/icons/user-image.png')} className="w-[37px] h-[37px]"/>
                            </View>

                            <View className="ml-4">
                                <Text className="text-tertiary text-[14px] font-fontMain-regular">Hey,</Text>
                                <Text className="text-secondary text-[20px] font-fontMain-bold">@{username}</Text>
                            </View>
                        </View>

                        <TouchableOpacity className="bg-[#354D4D] px-[15px] py-[10px] rounded-[15px] flex-row items-center border border-highlight">
                            <Text className=" text-[14px] text-highlight font-fontMain-regular">Your profile</Text>
                            <View className="ml-2 bg-highlight rounded-full h-[18px] w-[18px] items-center justify-center">
                                <Ionicons name="chevron-forward" size={16} color="#ECEFF3" className="pl-[1px]"/>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <View className="mx-[25px] h-[60px] flex-row items-center justify-between bg-[#293953] border-[2px] border-t-0 border-dark-blue rounded-b-[30px] p-[15px]">
                    <View className="flex-row w-full">
                        <View className="flex-row items-center justify-center flex-[1] pr-[15px]">
                            <Image source={require('../../assets/images/icons/gem.png')} className="w-[30px] h-[30px] mt-[3px]" />
                            <View className="ml-[5px]">
                                <Text className="text-secondary text-[26px] font-fontMain-bold">{points}</Text>
                            </View>
                        </View>

                        <View className="items-center">
                            <View className="w-[2px] h-full bg-dark-blue/50 rounded" />
                        </View>

                        <View className="flex-row items-center justify-center flex-[1] pl-[15px]">
                            <Image source={getTierImage(persistentPoints)} className="w-[30px] h-[30px] mr-[7px]" />
                            <Text className="text-highlight text-[26px] font-fontMain-bold">{persistentPoints}</Text>
                        </View>
                    </View>
                </View>

                <View className="flex-row justify-end mt-[10px] mr-[25px]">
                    <TouchableOpacity>
                        <View className="flex-row items-center bg-[#293953] p-2 rounded-[10px] border-[2px] border-dark-blue">
                            <MaterialCommunityIcons name="cookie-clock-outline" size={20} color="#ECEFF3" />
                            <Text className="text-secondary text-[16px] font-fontMain-regular ml-[5px]">Meal History</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 items-center justify-center ml-[50px]">
                    <Image source={require('../../assets/images/fighters/bobr.png')} className="w-full h-full" resizeMode="contain"/>
                </View>

                <View className="items-center mt-[20px]">
                    <TouchableOpacity className="bg-highlight h-[70px] w-[280px] justify-center rounded-[15px] active:opacity-50">
                        <View className="flex-row items-center justify-center">
                            <MaterialCommunityIcons name="sword-cross" size={45} color="#182335" />
                            <Text className="text-dark-blue text-[36px] font-fontHeader pl-[10px] pt-[10px]">FIGHT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </BackgroundWrapper>
    );
};

export default Main;