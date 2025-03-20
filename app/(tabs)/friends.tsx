// Friends.tsx
import React from 'react';
import { Text, TextInput, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabMenu from '../components/TabMenu';
import * as Clipboard from 'expo-clipboard';

// Friends Screen Component
const FriendsScreen: React.FC = () => {
    const friends = [
        { name: 'Diferti', persistentPoints: 1999999 },
        { name: 'Diferti', persistentPoints: 1999999 },
        { name: 'Diferti', persistentPoints: 1999999 },
        { name: 'Diferti', persistentPoints: 1999999 },
        { name: 'Diferti', persistentPoints: 1999999 },
        { name: 'Diferti', persistentPoints: 1999999 },
        { name: 'Diferti', persistentPoints: 1999999 },
    ];

    const [copiedText, setCopiedText] = React.useState('');

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync('hello world');
    };

    return (
        <ScrollView className="p-4 bg-primary">
        {/* Your Friend Code Section */}
        
        <View className="flex-row justify-between pb-2 mb-2 bg-primary border-b border-tertiary">
            <View className="flex-1 mr-2 items-center">
            <Text className="text-secondary text-xl font-bold mb-2">Your Friend Code</Text>
            <View className="flex-row items-center bg-primary p-2 rounded">
                <Text className="text-secondary text-lg mr-2">578438952</Text>
                <TouchableOpacity onPress={() => {
                    copyToClipboard();
                }}>
                <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/copy.png' }} className="w-5 h-5" />
                </TouchableOpacity>
            </View>
            </View>
            <View className="flex-1 ml-2 items-center">
            <Text className="text-secondary text-xl font-bold mb-2">Add Friend</Text>
            <View className="flex-row items-center bg-gray-800 p-2 rounded">
                <TextInput
                    className="text-secondary text-lg mr-2 bg-gray-700 p-1 rounded"
                    placeholder="Username or code"
                    placeholderTextColor="#888"
                />
                <TouchableOpacity>
                <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/plus-math.png' }} className="w-5 h-5" />
                </TouchableOpacity>
            </View>
            </View>
        </View>

        {/* Online Friends Section */}
        <View className="mb-5 items-center">
        <View className="flex-row items-center mb-2">
            <View className="flex-1 h-px bg-highlight ml-24" />
            <Text className="text-highlight text-md mx-2">Online: 2</Text>
            <View className="flex-1 h-px bg-highlight mr-24" />
        </View>
        <View className="flex-wrap flex-row justify-between">
            {friends.map((friend, index) => (
            <View key={index} className="w-1/2 p-2">
            <View className="bg-gray-800 p-3 rounded mb-2 relative">
                <View className="flex-row items-center">
                    <View className="mr-3">
                        <Image source={{ uri: 'https://fastly.picsum.photos/id/227/200/200.jpg?hmac=_HAD3ZQuIUMd1tjQfU5i21RCLHRDH_r_Xuq0q6iRN-o' }} className="w-14 h-14 rounded-md border border-green-500" />
                    </View>
                    <View>
                        <Text className="text-secondary text-lg">{friend.name}</Text>
                        <View className="flex-row items-center">
                            <Image source={{ uri: 'https://img.icons8.com/emoji/48/gem-stone.png' }} className="w-3 h-3 mr-2" />
                            <Text className="text-secondary text-sm">{friend.persistentPoints}</Text>
                        </View>
                    </View>
                    <View className="absolute top-0 right-0 w-3 h-3 bg-highlight rounded-full border-2 border-gray-800" />
                </View>
            </View>
            </View>
            ))}
        </View>
        </View>
        </ScrollView>
    );
    };

// Requests Screen Component
const RequestsScreen: React.FC = () => {
    return (
        <ScrollView className="p-4 bg-primary">
        {/* Friend Requests Section */}
        <View className="mb-5 p-1">
            <View className="bg-gray-800 p-3 rounded mb-3 flex-row items-center">
                <Image source={{ uri: 'https://fastly.picsum.photos/id/227/200/200.jpg?hmac=_HAD3ZQuIUMd1tjQfU5i21RCLHRDH_r_Xuq0q6iRN-o' }} className="w-12 h-12 border border-highlight rounded-md mr-3" />
                <View className="flex-1">
                    <Text className="text-secondary text-lg font-bold">Diferti</Text>
                    <Text className="text-tertiary text-xs">wants to be your friend!</Text>
                </View>
                <View className="flex-row">
                    <TouchableOpacity className="border-2 border-highlight p-1 rounded-md mr-2">
                        <Text className="text-green-500 text-center font-bold">Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border-2 border-red-500 p-1 rounded-md">
                        <Text className="text-red-500 text-center font-bold">Decline</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ScrollView>
    );
    };

// Main Friends Component
const Friends: React.FC = () => {
    const tabs = [
        { name: 'FRIENDS', component: FriendsScreen },
        { name: 'REQUESTS', component: RequestsScreen },
    ];

    return (
        <BackgroundWrapper>
            <SafeAreaView className="flex-1">
                <TabMenu tabs={tabs} />
            </SafeAreaView>
        </BackgroundWrapper>
    );
};

export default Friends;