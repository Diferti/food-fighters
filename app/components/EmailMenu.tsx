import {Pressable, View, Text, TouchableOpacity, Animated, Easing, Alert} from 'react-native';
import React, { useEffect, useRef } from 'react';
import {Link, router} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import { sendGoogleAuthRequest } from '../routes/api';

export default function EmailMenu({ visible, onClose }: { visible: boolean; onClose: () => void }) {
    const slideAnim = useRef(new Animated.Value(400)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        WebBrowser.maybeCompleteAuthSession();
    }, []);

    const clientId = Constants.expoConfig?.extra?.GOOGLE_CLIENT_ID;
    const redirectUri = Constants.expoConfig?.extra?.GOOGLE_REDIRECT_URI;

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId,
        redirectUri,
    });

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 450,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 450,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 450,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 400,
                    duration: 450,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true,
                })
            ]).start(() => {
                slideAnim.setValue(400);
                fadeAnim.setValue(0);
            });
        }
    }, [visible]);

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            const fetchUserInfo = async () => {
                try {
                    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                        headers: { Authorization: `Bearer ${authentication?.accessToken}` },
                    });
                    const userInfo = await userInfoResponse.json();
                    const result = await sendGoogleAuthRequest(authentication?.idToken, userInfo.picture);
                    if (result.error) {
                        Alert.alert('Error', result.error);
                        return;
                    }

                    await AsyncStorage.setItem('token', result.token);
                    router.push('/(tabs)/main');
                } catch (error) {
                    console.error('Error fetching user info:', error);
                } finally {
                    // Explicitly dismiss the browser tab
                    AuthSession.dismiss();
                }
            };

            fetchUserInfo();
        } else if (response?.type === 'error') {
            console.error('Authentication error:', response.error);
            Alert.alert('Authentication Error', 'Failed to authenticate with Google.');
            // Dismiss the browser tab in case of an error
            AuthSession.dismiss();
        }
    }, [response]);

    return (
        <Animated.View
            style={{
                flex: 1,
                opacity: fadeAnim,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}>
            <Pressable className="flex-1 justify-end">
                <Animated.View className="bg-dark-blue min-h-[500px] rounded-t-[30px] p-[20px]"
                    style={{
                        transform: [{ translateY: slideAnim }]
                    }}>

                    <View className="flex-row justify-between items-center mb-[50px]">
                        <View className="flex-1 items-center">
                            <Text className="text-secondary text-[32px] font-fontHeader mt-[20px]">
                                SIGN IN
                            </Text>
                        </View>

                        <TouchableOpacity onPress={onClose} className="absolute right-0 top-0 w-[24px] h-[24px] rounded-full flex items-center justify-center bg-[#666F7F]">
                            <Ionicons name="close" size={20} color="#182335" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-1 items-center">
                        <Link href="/(auth)/sign-in" asChild>
                            <Pressable onPress={onClose} className="flex-row items-center h-[50px] bg-highlight rounded-[15px] active:opacity-50 justify-center w-[300px] mb-[20px]">
                                <Ionicons name="mail" size={26} className="mr-3 mt-1" />
                                <Text className="font-fontMain-medium text-primary text-[22px]">
                                    Continue with Email
                                </Text>
                            </Pressable>
                        </Link>

                        <Text className="font-fontMain-medium text-tertiary text-[22px] m-0 p-0 mb-[20px]">
                            or
                        </Text>

                        <Pressable
                            onPress={() => {
                                promptAsync();
                                onClose();
                            }}
                            className="flex-row items-center h-[50px] bg-blue-600 rounded-[15px] active:opacity-50 justify-center w-[300px] mb-[20px]"
                        >
                            <FontAwesome name="google-plus-square" size={26} color="white" className="mr-3 mt-[3px]" />
                            <Text className="font-fontMain-medium text-secondary text-[22px]">
                                Continue with Google
                            </Text>
                        </Pressable>

                        <Pressable className="flex-row items-center h-[50px] bg-blue-800 rounded-[15px] active:opacity-50 justify-center w-[300px] mb-[20px]">
                            <Entypo name="facebook" size={24} color="#ECEFF3" className="mr-3 mt-0.5"/>
                            <Text className="font-fontMain-medium text-secondary text-[22px]">
                                Continue with Facebook
                            </Text>
                        </Pressable>

                        <Pressable className="flex-row items-center">
                            <Text className="font-fontMain-medium text-tertiary text-[22px]">
                                Others
                            </Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </Pressable>
        </Animated.View>
    );
}