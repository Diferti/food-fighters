import React, {useEffect, useRef, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Modal, Keyboard, Animated,} from 'react-native';
import {Ionicons, FontAwesome6, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Link} from "expo-router";
import EmailMenu from "@/app/components/EmailMenu";

export default function SignUp() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showEmailMenu, setShowEmailMenu] = useState(false);
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

    const totalSteps = formData.goal === 'Maintain my current weight' ? 9 : 10;

    const handleNext = () => {
        if (currentStep === 3 && formData.goal === 'Maintain my current weight') {
            setCurrentStep(5);
        } else if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
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
        const currentYear = new Date().getFullYear();
        switch(currentStep) {
            case 1: return false;
            case 2: return !(hasCheckedUsername && isUsernameAvailable);
            case 3: return !formData.goal;
            case 4: return !formData.targetWeight;
            case 5: return !formData.currentWeight;
            case 6: return !formData.activityLevel;
            case 7: return !formData.height;
            case 8: return !formData.gender;
            case 9: return !(currentYear - formData.dob.getFullYear() > 8);
            default: return false;
        }
    };

    const [isChecking, setIsChecking] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
    const [hasCheckedUsername, setHasCheckedUsername] = useState(false);

    const checkUsernameAvailability = async ({username}: { username: any }) => {
        setIsChecking(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        const available = !['admin', 'user', 'test'].includes(username.toLowerCase());
        setIsUsernameAvailable(available);
        setIsChecking(false);
        setHasCheckedUsername(true);
    };

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const marginBottomAnim = useRef(new Animated.Value(0)).current;
    const getDefaultMargin = () => { return currentStep === 6 ? 50 : 150; };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            setIsKeyboardVisible(true);
            Animated.timing(marginBottomAnim, {
                toValue: e.endCoordinates.height - 50,
                duration: 400,
                useNativeDriver: false,
            }).start();
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
            Animated.timing(marginBottomAnim, {
                toValue: getDefaultMargin(),
                duration: 400,
                useNativeDriver: false,
            }).start();
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        marginBottomAnim.setValue(getDefaultMargin());
    }, [currentStep]);

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <View className="flex-1">
                <View className="flex-row items-center p-5">
                    {currentStep == 1 && (
                        <Link href="../" asChild>
                            <TouchableOpacity className="mt-0 mb-[25px] active:opacity-50">
                                <Ionicons name="chevron-back" size={30} color="#07BA4D" />
                            </TouchableOpacity>
                        </Link>
                    )}
                    {currentStep > 1 && (
                        <TouchableOpacity onPress={handleBack} className="mt-0 mb-[25px] active:opacity-50">
                            <Ionicons name="chevron-back" size={30} color="#07BA4D" />
                        </TouchableOpacity>
                    )}
                    <View className="absolute left-0 right-0 justify-center items-center">
                        <ProgressCircles />
                    </View>
                </View>

                {currentStep === 1 && (
                    <View className="items-center">
                        <Text className="text-[26px] text-highlight font-fontMain-bold text-center mb-[150px]">Setting Up Your Profile</Text>
                        <Text className="text-[20px] text-highlight font-fontMain-bold text-center mb-[30px]">Ready to start the challenge?</Text>
                        <Text className="text-[20px] text-secondary font-fontMain-bold text-center mx-[20px]">
                            To customize your experience and help you climb the leaderboard, we'll need a few details — your goals, activity level, age, height, and more. Let's go!
                        </Text>
                    </View>
                )}

                {currentStep === 2 && (
                    <View>
                        <Text className="text-[26px] text-highlight font-fontMain-bold text-center mb-[10px]">Username</Text>
                        <Text className="text-[18px] text-tertiary font-fontMain-bold text-center mx-[20px] mb-[30px]">
                            Hey there! Choose a name your friends will recognize (or fear on the leaderboard!)
                        </Text>

                        <View className="mx-[20px]">
                            <View className="relative">
                                <TextInput className={`h-[60px] rounded-[10px] text-[18px] p-[15px] pr-[50px] border-2 ${
                                    (hasCheckedUsername && formData.username.length > 3) 
                                                        ? isUsernameAvailable
                                                            ? 'border-[#39CF78] bg-[#354D4D] text-[#39CF78]'
                                                            : 'border-[#E63946] bg-[#4D2F2F] text-[#E63946]'
                                                       : 'border-[#818493] bg-[#383A46] text-secondary'}`}
                                    placeholder="What’s your nickname?" placeholderTextColor="#CED0DC"
                                    value={formData.username}
                                    onChangeText={text => {
                                    setFormData({ ...formData, username: text });
                                    setHasCheckedUsername(false);
                                    if (text.length > 3) { checkUsernameAvailability({username: text}); }}}/>

                                {formData.username.length > 0 && (
                                    <View className="absolute right-[15px] top-[16px]">
                                        {isChecking ? (
                                            <ActivityIndicator size={28} color="#ECEFF3"/>
                                        ) : hasCheckedUsername ? (
                                            isUsernameAvailable ? (
                                                <FontAwesome6 name="check" size={28} color="#39CF78"/>
                                            ) : (
                                                <AntDesign name="close" size={28} color="#E63946" />
                                            )
                                        ) : null}
                                    </View>
                                )}
                            </View>

                            {hasCheckedUsername && !isUsernameAvailable && (
                                <Text className="text-[#E63946] text-[15px] font-fontMain-regular mt-2 ml-2">{formData.username} is not available</Text>
                            )}
                        </View>
                    </View>
                )}

                {currentStep === 3 && (
                    <View>
                        <Text className="text-[26px] text-highlight font-fontMain-bold text-center mb-[30px]">What is your goal?</Text>
                        {['Maintain my current weight', 'Weight gain', 'Weight loss'].map((option) => (
                            <TouchableOpacity key={option} className={`mx-[20px] h-[60px] p-[15px] rounded-[10px] mb-[15px] border-2 justify-center
                             bg-primary ${formData.goal === option ? 'border-[#39CF78]' : 'border-secondary'}`}
                                onPress={() => setFormData({ ...formData, goal: option })}>
                                <Text className={`text-[18px] font-fontMain-bold ${formData.goal === option ? 'text-[#39CF78]' : 'text-secondary'}`}>
                                    {option}
                                </Text>
                                {formData.goal === option && (
                                    <View className="absolute right-[15px] top-[14px]">
                                        <FontAwesome6 name="check" size={28} color="#39CF78"/>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {currentStep === 4 && (
                    <View>
                        <Text className="text-[26px] text-highlight font-fontMain-bold text-center mb-[30px] mx-[30px]">
                            How much weight would you like to {formData.goal.includes('gain') ? 'gain' : 'lose'}?
                        </Text>
                        <View className="flex-row w-full max-w-[250px] mx-auto gap-[10px] items-center">
                            <TextInput className="flex-1 bg-dark-blue text-secondary text-[32px] font-fontMain-regular text-center
                                rounded-[10px] h-[60px] pb-[3px]" placeholderTextColor="#818795"
                                keyboardType="numeric" placeholder="0.0" value={formData.targetWeight}
                                onChangeText={text => setFormData({ ...formData, targetWeight: text })}/>

                            <Text className="flex-1 bg-dark-blue text-highlight text-[32px] font-fontHeader text-center rounded-[10px] h-[60px] pt-[19px]">KG</Text>
                        </View>
                    </View>
                )}

                {currentStep === 5 && (
                    <View>
                        <Text className="text-[26px] text-highlight font-fontMain-bold text-center mb-[30px]">What is your current weight?</Text>
                        <View className="flex-row w-full max-w-[250px] mx-auto gap-[10px] items-center">
                            <TextInput className="flex-1 bg-dark-blue text-secondary text-[32px] font-fontMain-regular text-center
                                rounded-[10px] h-[60px] pb-[3px]" placeholderTextColor="#818795"
                                       keyboardType="numeric" placeholder="0.0" value={formData.currentWeight}
                                       onChangeText={text => setFormData({ ...formData, currentWeight: text })}/>

                            <Text className="flex-1 bg-dark-blue text-highlight text-[32px] font-fontHeader text-center rounded-[10px] h-[60px] pt-[19px]">KG</Text>
                        </View>
                    </View>
                )}

                {currentStep === 6 && (
                    <View>
                        <Text className="text-[26px] text-highlight font-fontMain-bold text-center mb-[30px]">What is your activity level?</Text>
                        {[
                            { title: 'Sedentary', desc: 'Little to no exercise, mostly sitting (e.g., desk job, minimal movement)'},
                            { title: 'Low Active', desc: 'Light exercise or walking (e.g., short daily walks, occasional workouts)'},
                            { title: 'Active', desc: 'Regular exercise or physically demanding job (e.g., gym 3–5 times a week, manual labor)'},
                            { title: 'Very Active', desc: 'Intense daily exercise or highly active job (e.g., athlete, construction worker, frequent high-intensity workouts)'}
                        ].map((activity) => (
                            <TouchableOpacity key={activity.title} onPress={() => setFormData({ ...formData, activityLevel: activity.title })}
                                className={`p-4 rounded-[10px] mb-[15px] mx-[20px] bg-primary border-2
                                    ${formData.activityLevel === activity.title ? 'border-[#39CF78]' : 'border-secondary'}`}>
                                <Text className={`text-[20px] font-fontMain-bold mb-[5px] ${formData.activityLevel === activity.title ? 'text-[#39CF78]' : 'text-secondary'}`}>
                                    {activity.title}
                                </Text>
                                <Text className={`text-[15px] font-fontMain-regular ${formData.activityLevel === activity.title ? 'text-[#2D9960]' : 'text-tertiary'}`}>
                                    {activity.desc}
                                </Text>
                                {formData.activityLevel === activity.title && (
                                    <View className="absolute right-[16px] top-[10px]">
                                        <FontAwesome6 name="check" size={28} color="#39CF78"/>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {currentStep === 7 && (
                    <View>
                        <Text className="text-[26px] text-highlight font-fontMain-bold text-center mb-[30px]">What is your height?</Text>
                        <View className="flex-row w-full max-w-[250px] mx-auto gap-[10px] items-center">
                            <TextInput className="flex-1 bg-dark-blue text-secondary text-[32px] font-fontMain-regular text-center
                                rounded-[10px] h-[60px] pb-[3px]" placeholderTextColor="#818795"
                                       keyboardType="numeric" placeholder="0" value={formData.height}
                                       onChangeText={text => setFormData({ ...formData, height: text })}/>

                            <Text className="flex-1 bg-dark-blue text-highlight text-[32px] font-fontHeader text-center rounded-[10px] h-[60px] pt-[19px]">CM</Text>
                        </View>
                    </View>
                )}

                {currentStep === 8 && (
                    <View>
                        <Text className="text-[26px] text-highlight font-fontMain-bold text-center mb-[30px]">What is your gender?</Text>
                        <View className="flex-row justify-center gap-[15px]">
                            {['Female', 'Male'].map((gender) => (
                                <TouchableOpacity key={gender} onPress={() => setFormData({ ...formData, gender })}
                                    className={`bg-dark-blue items-center rounded-[10px] border-2 h-[120px] w-[120px] justify-center
                                    ${formData.gender === gender ? 'border-highlight' : 'border-transparent'}`}>
                                    {gender === 'Female' && (
                                        <View className="bg-[#EA596E] h-[80px] w-[80px] rounded-[10px] items-center justify-center">
                                            <MaterialCommunityIcons name="gender-female" size={60} color="#ECEFF3" />
                                        </View>
                                    )}
                                    {gender === 'Male' && (
                                        <View className="bg-[#226699] h-[80px] w-[80px] rounded-[10px] items-center justify-center">
                                            <MaterialCommunityIcons name="gender-male" size={60} color="#ECEFF3" />
                                        </View>
                                    )}
                                    <Text className="text-secondary mt-[5px] text-[16px] font-fontMain-regular">{gender}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {currentStep === 9 && (
                    <View>
                        <Text className="text-[26px] text-highlight font-fontMain-bold text-center mb-[30px]">
                            What is your date of birth?
                        </Text>
                        <View className="mx-[20px] border-[1px] border-[#818493] rounded-[10px] items-center bg-[#383A46]">
                                <DateTimePicker value={formData.dob} mode="date" display="spinner" maximumDate={new Date()} themeVariant="dark"
                                    onChange={(event, date) => {if (date) {setFormData({ ...formData, dob: date });}}}/>
                        </View>
                    </View>
                )}

                <View className="flex-1" />

                <Animated.View style={{ marginBottom: marginBottomAnim }}>
                    <TouchableOpacity className={`w-[70px] h-[70px] rounded-full items-center justify-center self-center
                        ${isNextDisabled() ? 'bg-[#505050]' : 'bg-secondary'}`} onPress={handleNext} disabled={isNextDisabled()}>
                        <Image source={require('../../assets/images/icons/sword.png')} className="w-[45px] h-[45px]" resizeMode="contain"/>
                    </TouchableOpacity>
                </Animated.View>

                <View className="flex-row justify-center mb-[10px]">
                    <Text className="text-tertiary font-fontMain-medium text-[18px]">Got an account? </Text>
                    <TouchableOpacity className="active:opacity-50" onPress={() => setShowEmailMenu(true)}>
                        <Text className="text-highlight font-fontMain-bold text-[18px]">Sign in</Text>
                    </TouchableOpacity>
                </View>

                <Modal animationType="none" transparent={true} visible={showEmailMenu} onRequestClose={() => setShowEmailMenu(false)}>
                    <EmailMenu visible={showEmailMenu} onClose={() => setShowEmailMenu(false)}/>
                </Modal>
            </View>
        </SafeAreaView>
    );
};