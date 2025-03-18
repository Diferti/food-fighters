import { View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <View className="flex-1 relative">
            <Image
                source={require('@/assets/images/background.png')}
                className="w-full h-full absolute"
                resizeMode="cover"
                onLoadEnd={() => setImageLoaded(true)}
                fadeDuration={0}/>

            {!imageLoaded && (
                <View className="absolute inset-0 bg-primary justify-center items-center">
                    <ActivityIndicator size="large" color="#07BA4D" />
                </View>
            )}

            <View className={`flex-1 relative z-10 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {children}
            </View>
        </View>
    );
}