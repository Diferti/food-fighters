import React, { useEffect } from "react";
import { Text, View } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import {SafeAreaView} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getUserDataRequest } from '../routes/api';

const Main = () => {
    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserDataRequest();
            await AsyncStorage.setItem('friendCode', data.friendCode);
        };

        fetchUserData();
    }, []);

    return (
        <BackgroundWrapper>
            <SafeAreaView>
                <View className="p-4 mt-[50px]">
                    <Text className="text-white text-2xl">Main Content</Text>
                </View>
            </SafeAreaView>
        </BackgroundWrapper>
    );
};

export default Main;