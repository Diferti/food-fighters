import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#07BA4D',
                tabBarInactiveTintColor: '#818795',
                tabBarStyle: {
                    backgroundColor: '#182335',
                    borderTopWidth: 1,
                    borderTopColor: '#818795',
                    width: '100%',
                    height: 85,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 4,
                },
                headerShown: false,
                headerBackgroundContainerStyle: {
                    backgroundColor: 'transparent',
                }}}>

            <Tabs.Screen
                name="main"
                options={{
                    title: 'Main',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}/>

            <Tabs.Screen
                name="diet"
                options={{
                    title: 'Diet',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="food-apple" size={24} color={color} />
                    ),
                }}/>

            <Tabs.Screen
                name="leaderboard"
                options={{
                    title: 'Top',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="trophy" size={20} color={color} />
                    ),
                }}/>

            <Tabs.Screen
                name="friends"
                options={{
                    title: 'Friends',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="people" size={24} color={color} />
                    ),
                }}/>
        </Tabs>
    );
}