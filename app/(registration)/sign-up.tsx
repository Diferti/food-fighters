import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Image, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Link} from "expo-router";

export default function SignUp() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        goal: '',
        targetWeight: '',
        currentWeight: '',
        activityLevel: '',
        height: '',
        gender: '',
        dob: new Date(),
    });

    const totalSteps = formData.goal === 'Maintain my current weight' ? 8 : 9;

    const handleNext = () => {
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
        if (currentStep === 8) setShowDatePicker(true);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const ProgressCircles = () => (
        <View className="flex-row items-center justify-center gap-[10px] mt-0 mb-[40px]">
            {[...Array(totalSteps)].map((_, index) => (
                <View key={index} className="flex-row items-center">
                    <View className={`w-[10px] h-[10px] rounded-full ${index + 1 <= currentStep ? 'bg-highlight' : 'bg-tertiary'}`} />
                </View>
            ))}
        </View>
    );

    const isNextDisabled = () => {
        switch(currentStep) {
            case 1: return false;
            case 2: return !formData.username;
            case 3: return !formData.goal;
            case 4: return !formData.targetWeight;
            case 5: return !formData.currentWeight;
            case 6: return !formData.activityLevel;
            case 7: return !formData.height;
            case 8: return !formData.gender;
            default: return false;
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <View className="flex-1">
                <View className="flex-row items-center p-5">
                    {currentStep == 1 && (
                        <Link href="../" asChild>
                            <TouchableOpacity className="mt-0 mb-[40px] active:opacity-50">
                                <Ionicons name="chevron-back" size={30} color="#07BA4D" />
                            </TouchableOpacity>
                        </Link>
                    )}
                    {currentStep > 1 && (
                        <TouchableOpacity onPress={handleBack} className="mt-0 mb-[40px]">
                            <Ionicons name="chevron-back" size={30} color="#07BA4D" />
                        </TouchableOpacity>
                    )}
                    <ProgressCircles />
                </View>

                    {/* Step 1 - Intro */}
                    {currentStep === 1 && (
                        <View className="items-center">
                            <Text className="text-[26px] text-highlight font-fontMain-bold text-center mb-4">Setting Up Your Profile</Text>
                            <Text className="text-lg text-center text-gray-600 mb-8">
                                Ready to start the challenge? To customize your experience and help you climb the leaderboard,
                                we'll need a few details— your goals, activity level, age, height, and more. Let's go!
                            </Text>
                        </View>
                    )}

                    {/* Step 2 - Username */}
                    {currentStep === 2 && (
                        <View>
                            <Text className="text-2xl font-bold mb-2">Username</Text>
                            <Text className="text-gray-600 mb-6">
                                Hey there! Choose a name your friends will recognize (or fear on the leaderboard!)
                            </Text>
                            <TextInput
                                className="border-b-2 border-gray-300 p-3 text-lg"
                                placeholder="Enter username"
                                value={formData.username}
                                onChangeText={text => setFormData({ ...formData, username: text })}
                            />
                        </View>
                    )}

                    {/* Step 3 - Goal */}
                    {currentStep === 3 && (
                        <View>
                            <Text className="text-2xl font-bold mb-6">What is your goal?</Text>
                            {['Maintain my current weight', 'Weight gain', 'Weight loss'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    className={`p-4 rounded-xl mb-3 ${formData.goal === option ? 'bg-purple-100' : 'bg-gray-100'}`}
                                    onPress={() => setFormData({ ...formData, goal: option })}
                                >
                                    <Text className={`text-lg ${formData.goal === option ? 'text-purple-600 font-bold' : 'text-gray-600'}`}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Step 4 - Target Weight (Conditional) */}
                    {currentStep === 4 && (
                        <View>
                            <Text className="text-2xl font-bold mb-6">
                                How much weight would you like to {formData.goal.includes('gain') ? 'gain' : 'lose'}?
                            </Text>
                            <TextInput
                                className="border-b-2 border-gray-300 p-3 text-2xl text-center"
                                keyboardType="numeric"
                                placeholder="0"
                                value={formData.targetWeight}
                                onChangeText={text => setFormData({ ...formData, targetWeight: text })}
                            />
                            <Text className="text-center text-gray-600 mt-2">kilograms</Text>
                        </View>
                    )}

                    {/* Step 5 - Current Weight */}
                    {currentStep === 5 && (
                        <View>
                            <Text className="text-2xl font-bold mb-6">What is your current weight?</Text>
                            <TextInput
                                className="border-b-2 border-gray-300 p-3 text-2xl text-center"
                                keyboardType="numeric"
                                placeholder="0"
                                value={formData.currentWeight}
                                onChangeText={text => setFormData({ ...formData, currentWeight: text })}
                            />
                            <Text className="text-center text-gray-600 mt-2">kilograms</Text>
                        </View>
                    )}

                    {/* Step 6 - Activity Level */}
                    {currentStep === 6 && (
                        <View>
                            <Text className="text-2xl font-bold mb-6">What is your activity level?</Text>
                            {[
                                {
                                    title: 'Sedentary',
                                    desc: 'Little to no exercise, mostly sitting (e.g., desk job, minimal movement)'
                                },
                                {
                                    title: 'Low Active',
                                    desc: 'Light exercise or walking (e.g., short daily walks, occasional workouts)'
                                },
                                {
                                    title: 'Active',
                                    desc: 'Regular exercise or physically demanding job (e.g., gym 3–5 times a week, manual labor)'
                                },
                                {
                                    title: 'Very Active',
                                    desc: 'Intense daily exercise or highly active job (e.g., athlete, construction worker, frequent high-intensity workouts)'
                                }
                            ].map((activity) => (
                                <TouchableOpacity
                                    key={activity.title}
                                    className={`p-4 rounded-xl mb-3 ${formData.activityLevel === activity.title ? 'bg-purple-100' : 'bg-gray-100'}`}
                                    onPress={() => setFormData({ ...formData, activityLevel: activity.title })}
                                >
                                    <Text className={`text-lg font-semibold ${formData.activityLevel === activity.title ? 'text-purple-600' : 'text-gray-800'}`}>
                                        {activity.title}
                                    </Text>
                                    <Text className={`text-sm ${formData.activityLevel === activity.title ? 'text-purple-500' : 'text-gray-600'}`}>
                                        {activity.desc}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Step 7 - Height */}
                    {currentStep === 7 && (
                        <View>
                            <Text className="text-2xl font-bold mb-6">What is your height?</Text>
                            <TextInput
                                className="border-b-2 border-gray-300 p-3 text-2xl text-center"
                                keyboardType="numeric"
                                placeholder="0"
                                value={formData.height}
                                onChangeText={text => setFormData({ ...formData, height: text })}
                            />
                            <Text className="text-center text-gray-600 mt-2">centimeters</Text>
                        </View>
                    )}

                    {/* Step 8 - Gender */}
                    {currentStep === 8 && (
                        <View>
                            <Text className="text-2xl font-bold mb-6">What is your gender?</Text>
                            <View className="flex-row justify-center space-x-4">
                                {['Male', 'Female'].map((gender) => (
                                    <TouchableOpacity
                                        key={gender}
                                        className={`flex-1 p-4 rounded-xl ${formData.gender === gender ? 'bg-purple-600' : 'bg-gray-100'}`}
                                        onPress={() => setFormData({ ...formData, gender })}
                                    >
                                        <Text className={`text-center text-lg ${formData.gender === gender ? 'text-white' : 'text-gray-600'}`}>
                                            {gender}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                <TouchableOpacity className={`w-[70px] h-[70px] rounded-full items-center justify-center self-center mt-12
                    ${isNextDisabled() ? 'bg-[#505050]' : 'bg-secondary/80'}`} onPress={handleNext} disabled={isNextDisabled()}>
                    <Image source={require('../../assets/images/icons/sword.png')} className="w-[45px] h-[45px]" resizeMode="contain"/>
                </TouchableOpacity>

                {/* Date Picker */}
                {showDatePicker && (
                    <DateTimePicker
                        value={formData.dob}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(_, date) => {
                            setShowDatePicker(false);
                            if (date) setFormData({ ...formData, dob: date });
                        }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};