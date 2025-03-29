import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Pressable, Modal, Image, Text } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

interface CameraMenuProps {
    isVisible: boolean;
    onClose: () => void;
}

const CameraMenu: React.FC<CameraMenuProps> = ({ isVisible, onClose }) => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;

    const requestPermissions = async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(
            cameraPermission.status === 'granted' &&
            galleryPermission.status === 'granted'
        );
    };

    useEffect(() => {
        if (isVisible) {
            requestPermissions();
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    speed: 10,
                    bounciness: 5,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 0.8,
                    speed: 10,
                    bounciness: 5,
                    useNativeDriver: true,
                }),
            ]).start();
            setSelectedImage(null);
        }
    }, [isVisible]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    if (!hasPermission) {
        return <View />;
    }

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <Pressable className="flex-1 bg-primary/80">
                <Animated.View className="w-full h-full absolute"
                    style={{
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }}>

                    <View className="flex-1 items-center justify-center py-4 px-[25px]">
                        <View className="bg-primary rounded-[10px] overflow-hidden w-full max-w-md mb-[125px]">
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage }} className="w-full h-[525px] object-contain"/>
                            ) : (
                                <CameraView facing="back" style={{ width: '100%', height: 525 }}/>
                            )}
                        </View>
                    </View>

                    <View className="absolute bottom-20 w-full px-8">
                        <View className="flex-row justify-between mb-[50px]">
                            {!selectedImage ? (
                                <>
                                    <View className="items-center ml-[40px]">
                                        <TouchableOpacity className="border-[2px] border-highlight w-[45px] h-[45px] rounded-full items-center justify-center">
                                            <Ionicons name="camera" size={24} color="#07BA4D" />
                                        </TouchableOpacity>
                                        <Text className="text-secondary text-[12px] mt-2">Take Photo</Text>
                                    </View>

                                    <View className="items-center mr-[33px]">
                                        <TouchableOpacity className="border-[2px] border-highlight w-[45px] h-[45px] rounded-full items-center justify-center"
                                            onPress={pickImage}>
                                            <Ionicons name="image" size={24} color="#07BA4D" />
                                        </TouchableOpacity>
                                        <Text className="text-secondary text-[12px] mt-2">Choose Photo</Text>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View className="items-center ml-[47px]">
                                        <TouchableOpacity className="border-[2px] border-highlight w-[45px] h-[45px] rounded-full items-center justify-center"
                                            onPress={() => setSelectedImage(null)}>
                                            <MaterialCommunityIcons name="camera-retake" size={24} color="#07BA4D" />
                                        </TouchableOpacity>
                                        <Text className="text-secondary text-[12px] mt-2">Retake</Text>
                                    </View>

                                    <View className="items-center mr-[50px]">
                                        <Link href={{ pathname: '/(img)/analysis', params: { photoUri: selectedImage } }} asChild>
                                            <TouchableOpacity className="bg-highlight w-[45px] h-[45px] rounded-full items-center justify-center" onPress={onClose}>
                                                <MaterialIcons name="query-stats" size={30} color="#121A27" />
                                            </TouchableOpacity>
                                        </Link>
                                        <Text className="text-secondary text-[12px] mt-2">Analyze</Text>
                                    </View>
                                </>
                            )}
                        </View>

                        <TouchableOpacity className="absolute -bottom-[30px] self-center bg-highlight w-[60px] h-[60px] rounded-full items-center justify-center"
                            onPress={onClose}>
                            <Ionicons name="close" size={38} color="#121A27" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

export default CameraMenu;