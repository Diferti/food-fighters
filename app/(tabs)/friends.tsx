import React from 'react';
import { Alert, Text, TextInput, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabMenu from '../components/TabMenu';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, FontAwesome6, SimpleLineIcons} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { sendFriendRequestRequest, getFriendsRequest, getFriendRequestsRequest, addFriendRequest, declineFriendRequest } from '../routes/api';
import {Ionicons} from "@expo/vector-icons";

interface Friend {
    username: string;
    persistentPoints: number;
    isOnline: boolean;
    image?: string;
}

interface FriendRequest {
    username: string;
    image?: string;
}

const FriendsScreen: React.FC = () => {
    const [friendCode, setFriendCode] = React.useState('');
    const [friends, setFriends] = React.useState<Friend[]>([]);

    React.useEffect(() => {
        const fetchFriends = async () => {
            const friendCode = await AsyncStorage.getItem('friendCode');
            setFriendCode(friendCode ?? '');
            const data = await getFriendsRequest();
            if (!data.error) {
                setFriends(data);
            }
        };

        fetchFriends();
        const interval = setInterval(fetchFriends, 5000);
        return () => clearInterval(interval);
    }, []);

    const [friendUsername, setFriendUsername] = React.useState('');

    const handleSendFriendRequest = async () => {
        const data = await sendFriendRequestRequest(friendUsername);
        if (!data.error) {
            Alert.alert('Success', 'Friend request sent to ' + friendUsername);
            setFriendUsername('');
        } else {
            Alert.alert('Error', data.error);
        }
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(friendCode);
    };

    return (
        <View className="flex-1 px-[15px] pt-0 bg-primary">
            <View className='bg-dark-blue h-full border-highlight border-x-[1px] border-b-[1px] rounded-b-[30px] overflow-hidden'>
                <View className="flex-row justify-between border-b border-tertiary/50 bg-[#131C2A] py-[15px]">
                    <View className="flex-1 items-center">
                        <Text className="text-secondary text-[16px] font-fontMain-bold mb-[10px]">Your Friend Code</Text>
                        <View className="flex-row items-center bg-[#354D4D] p-2 mx-[25px] rounded-[10px] border border-highlight">
                            <Text className="flex-1 text-center text-secondary text-[14px] font-fontMain-bold" style={{ textAlignVertical: 'center' }}>{friendCode}</Text>
                            <TouchableOpacity onPress={() => copyToClipboard()}>
                                <AntDesign name="copy1" size={18} color="#ECEFF3" />
                            </TouchableOpacity>
                        </View>
                    </View>
                        <View className="flex-1 items-center">
                            <Text className="text-secondary text-[16px] font-fontMain-bold mb-[10px]">Add Friend</Text>
                            <View className="flex-row items-center bg-[#383A46] p-2 mx-[18px] rounded-[10px] border border-[#818493]">
                                <TextInput className="flex-1 text-secondary text-[14px] font-fontMain-regular mr-2"
                                    placeholder="Username or code"
                                    placeholderTextColor="#CED0DC"
                                    value={friendUsername}
                                    onChangeText={setFriendUsername}/>
                                <TouchableOpacity className="bg-[#354D4D] rounded-[5px] border border-highlight" onPress={handleSendFriendRequest}>
                                    <Ionicons name="add" size={18} color="#07BA4D"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                <View className="my-[10px] items-center">
                    <View className="flex-row items-center mb-2">
                        <View className="flex-1 h-px bg-highlight ml-[120px] mt-[2px]" />
                        <Text className="text-highlight text-[14px] font-fontMain-regular mx-2">Online: {friends.filter(friend => friend.isOnline).length}</Text>
                        <View className="flex-1 h-px bg-highlight mr-[120px] mt-[2px]" />
                    </View>

                    <ScrollView>
                        {friends.length === 0 ? (
                            <View className="flex-1 justify-center items-center h-full min-h-[350px]">
                                <View className="items-center">
                                    <SimpleLineIcons name="user-follow" size={80} color="#818795" />
                                    <Text className="text-[16px] font-fontMain-bold text-tertiary text-center mt-[10px]">You don't have any friends yet</Text>
                                </View>
                            </View>
                        ) : (
                            <View className="flex-wrap flex-row justify-between px-2">
                                {friends.map((friend, index) => (
                                    <View key={index} className="w-1/2 p-2">
                                        <View style={{
                                            shadowColor: 'rgba(7, 186, 77, 0.3)',
                                            shadowOffset: { width: 3, height: 3 },
                                            shadowOpacity: 1,
                                            shadowRadius: 4,
                                            elevation: 4,
                                            borderRadius: 10,
                                        }}>
                                            <LinearGradient
                                                colors={['#121A27', '#293953']}
                                                start={{ x: 0, y: 0.5 }}
                                                end={{ x: 1, y: 0.5 }}
                                                style={{
                                                    borderRadius: 10,
                                                    height: 70,
                                                }}>
                                                <View className="flex-row items-center h-full p-3">
                                                    <View className="mr-3">
                                                        {friend.image ? (
                                                            <Image source={{ uri: friend.image }} className="w-[50px] h-[50px] rounded-[5px] border border-highlight"/>
                                                        ) : (
                                                            <View className="w-[50px] h-[50px] rounded-[5px] border border-highlight bg-[#2D4263] justify-center items-center">
                                                                <Image source={require('../../assets/images/icons/user-image.png')} className="w-[30px] h-[30px]"/>
                                                            </View>
                                                        )}
                                                    </View>
                                                    <View className="flex-1">
                                                        <Text className="text-secondary text-[20px] font-fontMain-bold mb-[3px]">{friend.username}</Text>
                                                        <View className="flex-row items-center">
                                                            <Image source={require('../../assets/images/icons/gem.png')} className="w-[18px] h-[18px] mr-[5px] mt-[2px]"/>
                                                            <Text className="text-secondary text-[16px] font-fontMain-bold">{friend.persistentPoints}</Text>
                                                        </View>
                                                    </View>
                                                    <View className={`absolute top-1 right-1 rounded-full border-1 border-[#2A3341] w-3 h-3 ${friend.isOnline ? 'bg-highlight' : 'bg-[#666F80]'}`} />
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};


const RequestsScreen: React.FC = () => {
    const [friendRequests, setFriendRequests] = React.useState<FriendRequest[]>([]);

    React.useEffect(() => {
        const fetchFriendRequests = async () => {
            const data = await getFriendRequestsRequest();
            if (!data.error) {
                setFriendRequests(data);
            }
        };

        fetchFriendRequests();
        const interval = setInterval(fetchFriendRequests, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleAcceptRequest = async (username: string) => {
        const data = await addFriendRequest(username);
        if (!data.error) {
            Alert.alert('Success', 'Friend request accepted');
            setFriendRequests(friendRequests.filter(request => request.username !== username));
        } else {
            Alert.alert('Error', data.error);
        }
    };

    const handleDeclineRequest = async (username: string) => {
        const data = await declineFriendRequest(username);
        if (!data.error) {
            Alert.alert('Success', 'Friend request declined');
            setFriendRequests(friendRequests.filter(request => request.username !== username));
        } else {
            Alert.alert('Error', data.error);
        }
    };

    return (
        <View className="flex-1 px-[15px] pt-0 bg-primary">
            <View className='bg-dark-blue h-full border-highlight border-x-[1px] border-b-[1px] rounded-b-[30px] overflow-hidden'>
                <ScrollView className="p-4">
                    {friendRequests.length === 0 ? (
                        <View className="flex-1 justify-center items-center min-h-[475px]">
                            <FontAwesome6 name="people-pulling" size={80} color="#818795"/>
                            <Text className="text-[16px] font-fontMain-bold text-tertiary text-center mt-[10px]">No friend requests yet</Text>
                        </View>
                    ) : (
                        <View className="mb-5">
                            {friendRequests.map((request, index) => (
                                <View key={index} className="mb-3" style={{
                                    shadowColor: 'rgba(7, 186, 77, 0.3)',
                                    shadowOffset: { width: 3, height: 3 },
                                    shadowOpacity: 1,
                                    shadowRadius: 4,
                                    elevation: 4,
                                    borderRadius: 10,
                                }}>
                                    <LinearGradient
                                        colors={['#121A27', '#293953']}
                                        start={{ x: 0, y: 0.5 }}
                                        end={{ x: 1, y: 0.5 }}
                                        style={{
                                            borderRadius: 10,
                                            padding: 12,
                                        }}>
                                        <View className="flex-row items-center">
                                            {request.image ? (
                                                <Image source={{ uri: request.image }} className="w-[50px] h-[50px] rounded-[5px] border border-highlight mr-3"/>
                                            ) : (
                                                <View className="w-[50px] h-[50px] rounded-[5px] border border-highlight bg-[#2D4263] justify-center items-center mr-3">
                                                    <Image source={require('../../assets/images/icons/user-image.png')} className="w-[30px] h-[30px]"/>
                                                </View>
                                            )}

                                            <View className="flex-1">
                                                <Text className="text-secondary text-[20px] font-fontMain-bold">{request.username}</Text>
                                                <Text className="text-tertiary text-[14px] font-fontMain-regular">wants to be your friend!</Text>
                                            </View>

                                            <View className="flex-row">
                                                <TouchableOpacity className="border-2 border-highlight p-2 rounded-[10px] mr-2" onPress={() => handleAcceptRequest(request.username)}>
                                                    <Text className="text-highlight text-[16px] text-center font-fontMain-bold">Accept</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity className="border-2 border-[#C95858] p-2 rounded-[10px]" onPress={() => handleDeclineRequest(request.username)}>
                                                    <Text className="text-[#C95858] text-[16px] text-center font-fontMain-bold">Decline</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

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