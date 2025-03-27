import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginRequest } from '../routes/api';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isFormFilled = email && password;

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const result = await loginRequest(email, password);
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
                SIGN IN
            </Text>

            <View className="flex-row items-center border-[2px] border-[#818493] rounded-[10px] px-4 h-[60px] bg-[#383A46] mb-[20px]">
                <Ionicons name="mail-outline" size={22} color="#CED0DC" className="mr-2.5" />
                <TextInput className="flex-1 text-[#CED0DC] text-18"
                    placeholder="Email or Username"
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

            <TouchableOpacity 
                onPress={handleSignIn} 
                className={`h-[60px] rounded-[10px] justify-center items-center active:opacity-50 mb-[20px] ${isFormFilled ? 'bg-highlight' : 'bg-[#333B48]'}`}>
                <Text className={`text-24 font-fontHeader pt-[7px] ${isFormFilled ? 'text-primary' : 'text-[#78818A]'}`}>Sign In</Text>
            </TouchableOpacity>

            <Link href="../" asChild>
                <TouchableOpacity className="items-center active:opacity-50">
                    <Text className="text-highlight text-16 font-fontMain-bold">Forgot Password?</Text>
                </TouchableOpacity>
            </Link>

            <View className="flex-row justify-center mt-auto mb-[10px]">
                <Text className="text-tertiary font-fontMain-medium text-16">Not a member? </Text>
                <Link href="../(registration)/sign-up" asChild>
                    <TouchableOpacity className="active:opacity-50">
                        <Text className="text-highlight font-fontMain-bold text-16">Create account</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
    );
};

export default SignIn;