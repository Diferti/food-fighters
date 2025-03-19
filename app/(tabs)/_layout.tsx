import { useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import CameraMenu from "@/app/components/camera/CameraMenu";
import { TouchableOpacity, View, StyleSheet } from "react-native";

export default function TabLayout() {
    const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Tabs
                screenOptions={({ navigation, route,}) => ({
                    tabBarActiveTintColor: '#07BA4D',
                    tabBarInactiveTintColor: '#818795',
                    tabBarStyle: styles.tabBar,
                    tabBarLabelStyle: styles.tabBarLabel,
                    headerShown: false,
                    tabBarButton: (props) => {
                        const isDietTab = route.name === 'diet';
                        const isLeaderboardTab = route.name === 'leaderboard';
                        return (
                            <TouchableOpacity
                                {...props}
                                delayLongPress={undefined}
                                style={[
                                    styles.tabBarButton,
                                    isDietTab && { marginRight: 30 },
                                    isLeaderboardTab && { marginLeft: 30 },
                                ]}>
                                {props.children}
                            </TouchableOpacity>
                        );
                    },
                })}>

                <Tabs.Screen
                    name="main"
                    options={{
                        title: 'Main',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home" size={24} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="diet"
                    options={{
                        title: 'Diet',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="food-apple" size={26} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="leaderboard"
                    options={{
                        title: 'Top',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="trophy" size={19} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="friends"
                    options={{
                        title: 'Friends',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="people" size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>

            <TouchableOpacity style={styles.cameraButton} onPress={() => setIsCameraModalVisible(true)}>
                <Ionicons name="camera" size={30} color="black" />
            </TouchableOpacity>

            <CameraMenu isVisible={isCameraModalVisible} onClose={() => setIsCameraModalVisible(false)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    tabBar: {
        backgroundColor: '#182335',
        borderTopWidth: 1,
        borderTopColor: '#818795',
        height: 90,
        justifyContent: 'space-around',
    },
    tabBarLabel: {
        fontSize: 14,
        marginBottom: 4,
    },
    tabBarButton: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#07BA4D',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});