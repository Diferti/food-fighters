import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Pressable, Modal, Image, ScrollView, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface CameraMenuProps {
    isVisible: boolean;
    onClose: () => void;
}

const CameraMenu: React.FC<CameraMenuProps> = ({ isVisible, onClose }) => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const cameraRef = useRef<Camera>(null);

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

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setSelectedImage(photo.uri);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
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
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <Pressable className="flex-1 bg-black/50">
                <Animated.View
                    className="w-full h-full absolute"
                    style={{
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }}
                >
                    {/* Camera Preview Area */}
                    <View className="flex-1">
                        {selectedImage ? (
                            <Image
                                source={{ uri: selectedImage }}
                                className="flex-1 resize-contain"
                            />
                        ) : (
                            // <Camera
                            //     ref={cameraRef}
                            //     className="flex-1"
                            //     type={Camera.Constants.Type.back}
                            // />
                            null
                        )}
                    </View>

                    {/* Button Container */}
                    <View className="absolute bottom-20 w-full px-8">
                        {/* Action Buttons Row */}
                        <View className="flex-row justify-between mb-8">
                            {!selectedImage ? (
                                <>
                                    {/* Take Photo Button */}
                                    <View className="items-center">
                                        <TouchableOpacity
                                            className="bg-white/20 w-16 h-16 rounded-full items-center justify-center"
                                            onPress={takePicture}
                                        >
                                            <Ionicons name="camera" size={32} color="white" />
                                        </TouchableOpacity>
                                        <Text className="text-white text-xs mt-2">Take Photo</Text>
                                    </View>

                                    {/* Choose Photo Button */}
                                    <View className="items-center">
                                        <TouchableOpacity
                                            className="bg-white/20 w-16 h-16 rounded-full items-center justify-center"
                                            onPress={pickImage}
                                        >
                                            <Ionicons name="image" size={32} color="white" />
                                        </TouchableOpacity>
                                        <Text className="text-white text-xs mt-2">Choose Photo</Text>
                                    </View>
                                </>
                            ) : (
                                <>
                                    {/* Retake Button */}
                                    <View className="items-center">
                                        <TouchableOpacity
                                            className="bg-white/20 w-16 h-16 rounded-full items-center justify-center"
                                            onPress={() => setSelectedImage(null)}
                                        >
                                            <Ionicons name="refresh" size={32} color="white" />
                                        </TouchableOpacity>
                                        <Text className="text-white text-xs mt-2">Retake</Text>
                                    </View>

                                    {/* Analyze Button */}
                                    <View className="items-center">
                                        <Link href={{ pathname: '/(img)/analysis', params: { photoUri: selectedImage } }} asChild>
                                            <TouchableOpacity className="bg-green-500 w-16 h-16 rounded-full items-center justify-center" onPress={onClose}>
                                                <Ionicons name="analytics" size={32} color="white" />
                                            </TouchableOpacity>
                                        </Link>
                                        <Text className="text-white text-xs mt-2">Analyze</Text>
                                    </View>
                                </>
                            )}
                        </View>

                        {/* Close Button (Icon only) */}
                        <TouchableOpacity
                            className="absolute -bottom-4 self-center bg-red-500 w-12 h-12 rounded-full items-center justify-center"
                            onPress={onClose}
                        >
                            <Ionicons name="close" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

export default CameraMenu;