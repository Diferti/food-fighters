import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerRequest } from '../routes/api';
import EmailMenu from "@/app/components/EmailMenu";

const Registr = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showEmailMenu, setShowEmailMenu] = useState(false);

    const isFormFilled = email && password;

    const handleRegistration = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const formData = await AsyncStorage.getItem('formData');
        if (!formData) {
            Alert.alert('Error', 'No form data found');
            return;
        }
        const parsedFormData = JSON.parse(formData);

        const result = await registerRequest({
            username: parsedFormData.username,
            email: email,
            password: password,
            goal: parsedFormData.goal,
            weight: parseFloat(parsedFormData.currentWeight),
            height: parseFloat(parsedFormData.height),
            activityLevel: parsedFormData.activityLevel,
            gender: parsedFormData.gender.toLowerCase(),
            weightGainTarget: parseFloat(parsedFormData.targetWeight === '' ? '0' : parsedFormData.targetWeight),
            dateOfBirth: `${new Date(parsedFormData.dob).getFullYear()}-${new Date(parsedFormData.dob).getMonth() + 1}-${new Date(parsedFormData.dob).getDate()}`
        });
        console.log(result);
        if (result.error) {
            Alert.alert('Error', result.error);
            return;
        }

        await AsyncStorage.setItem('token', result.token);
        router.push('/(tabs)/main');
    };

    return (
        <SafeAreaView className="flex-1 p-5 bg-primary">
            <Link href="../" asChild>
                <TouchableOpacity className="mt-0 mb-[40px] active:opacity-50">
                    <Ionicons name="chevron-back" size={30} color="#07BA4D" />
                </TouchableOpacity>
            </Link>

            <Text className="text-highlight text-[26px] font-fontHeader mb-[40px] text-center">
                CREATE ACCOUNT
            </Text>

            <View className="flex-row items-center border-[2px] border-[#818493] rounded-[10px] px-4 h-[60px] bg-[#383A46] mb-[20px]">
                <Ionicons name="mail-outline" size={22} color="#CED0DC" className="mr-2.5" />
                <TextInput className="flex-1 text-[#CED0DC] text-18"
                           placeholder="Email"
                           placeholderTextColor="#CED0DC"
                           autoCapitalize="none"
                           value={email}
                           onChangeText={setEmail}/>
            </View>

            <View className="flex-row items-center border-[2px] border-[#818493] rounded-[10px] px-4 h-[60px] bg-[#383A46] mb-[40px]">
                <MaterialIcons name="lock-outline" size={22} color="#CED0DC" className="mr-2.5" />
                <TextInput className="flex-1 py-[15px] text-[#CED0DC] text-18"
                           placeholder="Password"
                           placeholderTextColor="#CED0DC"
                           secureTextEntry={!showPassword}
                           value={password}
                           onChangeText={setPassword}/>
                <TouchableOpacity className="ml-2.5" onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#CED0DC"/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleRegistration} className={`h-[60px] rounded-[10px] justify-center items-center active:opacity-50 mb-[20px] ${isFormFilled ? 'bg-highlight' : 'bg-[#333B48]'}`}>
                <Text className={`text-24 font-fontHeader pt-[7px] ${isFormFilled ? 'text-primary' : 'text-[#78818A]'}`}>CREATE</Text>
            </TouchableOpacity>

            <View className="flex-1" />

            <View className="flex-row justify-center mb-[10px]">
                <Text className="text-tertiary font-fontMain-medium text-[18px]">Got an account? </Text>
                <TouchableOpacity className="active:opacity-50" onPress={() => setShowEmailMenu(true)}>
                    <Text className="text-highlight font-fontMain-bold text-[18px]">Sign in</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="none" transparent={true} visible={showEmailMenu} onRequestClose={() => setShowEmailMenu(false)}>
                <EmailMenu visible={showEmailMenu} onClose={() => setShowEmailMenu(false)}/>
            </Modal>
        </SafeAreaView>
    );
};

export default Registr;