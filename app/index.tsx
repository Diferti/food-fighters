import { useState } from "react";
import { View, Text, Image, Pressable, Modal } from "react-native";
import { Link } from "expo-router";
import EmailMenu from "./components/EmailMenu";

export default function Index() {
    const [showEmailMenu, setShowEmailMenu] = useState(false);

    return (
        <View className="flex-1 relative bg-primary">
            <Image source={require('../assets/images/welcome-page/top-frame.png')} className="w-full h-[170px] absolute top-0 z-0" resizeMode="cover"/>

            <View className="flex-1 items-center justify-center pt-[100px] z-10">
                <Image source={require('../assets/images/welcome-page/logo.png')} className="w-[220px] h-[220px] mb-[110px] ml-[-13px]" resizeMode="contain"/>

                <Link href="/(registration)/sign-up" asChild>
                    <Pressable className="bg-highlight h-[70px] w-[280px] justify-center rounded-[15px] mb-[18px] active:opacity-50">
                        <Text className="text-primary text-[24px] font-fontHeader text-center pt-[7px]">
                            START NOW
                        </Text>
                    </Pressable>
                </Link>

                <Pressable className="active:opacity-50" onPress={() => setShowEmailMenu(true)}>
                    <Text className="text-highlight/70 text-[16px] font-fontMain-bold underline">
                        Already have an account?
                    </Text>
                </Pressable>
            </View>

            <Image source={require('../assets/images/welcome-page/bottom-frame.png')} className="w-full h-[185px] absolute bottom-0 z-0" resizeMode="cover"/>

            <Modal animationType="none" transparent={true} visible={showEmailMenu} onRequestClose={() => setShowEmailMenu(false)}>
                <EmailMenu visible={showEmailMenu} onClose={() => setShowEmailMenu(false)}/>
            </Modal>
        </View>
    );
}