import { Text, View, Image, ScrollView } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import {SafeAreaView} from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import TabMenu from '../components/TabMenu';
import React from "react";

import { getTierImage } from '../tiers';
import { getLeaderboardRequest } from '../routes/api';

interface LeaderboardEntry {
    id: number;
    username: string;
    persistentPoints: number;
    rank: number;
    avatar?: string;
}

const LeaderboardItem = ({ id, username, persistentPoints, rank, avatar }: LeaderboardEntry) => (
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
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                borderRadius: 10,
                marginBottom: 12,
                height: 70,
            }}>
            <View className="w-[50px] h-[50px] border border-highlight rounded-[5px] bg-[#2D4263] justify-center items-center overflow-hidden">
                {avatar ? (
                    <Image source={{ uri: avatar }} className="w-[50px] h-[50px]"/>
                ) : (
                    <Image source={require('../../assets/images/icons/user-image.png')} className="w-[30px] h-[30px]"/>
                )}
            </View>
            <View className="flex-1 ml-[15px] justify-center">
                <Text className="text-secondary text-[20px] font-fontMain-bold mb-[3px]">{username}</Text>
                <View className="flex-row items-center">
                    <Image source={require('../../assets/images/icons/gem.png')}  className="w-[18px] h-[18px] mr-[5px] mt-[2px]" />
                    <Text className="text-secondary text-[16px] font-fontMain-bold">{persistentPoints}</Text>
                </View>
            </View>

            <View className="flex-row mr-[15px]">
                <Image source={getTierImage(persistentPoints)} className="h-[50px] w-[65px]" />
            </View>

            <View className="flex-row border border-highlight/30 p-1 pr-[25px] pl-[25px] rounded-br-[15px] rounded-tl-[15px] bg-[#202D43]">
                <Text className="text-highlight text-lg text-center font-bold"># {rank}</Text>
            </View>
        </LinearGradient>
    </View>
);

const GlobalLeaderboard: React.FC = () => {
    const [leaderboardData, setLeaderboardData] = React.useState<LeaderboardEntry[]>([]);

    const fetchLeaderboard = async () => {
        const data = await getLeaderboardRequest(0, 100, false);
        if (data.error) {
            return;
        }
        setLeaderboardData(data);
    };

    React.useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View className="flex-1 px-[15px] pt-0 bg-primary">
            <View className='bg-dark-blue h-full border-highlight border-x-[1px] border-b-[1px] rounded-b-[30px] overflow-hidden'>
                <View className="border-b border-tertiary/50 bg-[#131C2A] py-[10px]">
                    <Text className="text-highlight text-[20px] font-fontMain-bold my-2 text-center"
                        style={{textShadowColor: 'rgba(7, 186, 77, 0.3)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 2}}>
                        Leaderboard
                    </Text>
                </View>
                <ScrollView className="p-4">
                    {leaderboardData.sort((a, b) => a.rank - b.rank).map(item => (
                        <LeaderboardItem key={item.id} {...item} />
                    ))}
                </ScrollView>
            </View>
        </View>
)};

const FriendsLeaderboard: React.FC = () => {
    const [leaderboardData, setLeaderboardData] = React.useState<LeaderboardEntry[]>([]);

    const fetchLeaderboard = async () => {
        const data = await getLeaderboardRequest(0, 100, true);
        if (data.error) {
            return;
        }
        setLeaderboardData(data);
    };

    React.useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View className="flex-1 px-[15px] pt-0 bg-primary">
            <View className='bg-dark-blue h-full border-highlight border-x-[1px] border-b-[1px] rounded-b-[30px] overflow-hidden'>
                <View className="border-b border-tertiary/50 bg-[#131C2A] py-[10px]">
                    <Text className="text-highlight text-[20px] font-fontMain-bold my-2 text-center"
                        style={{textShadowColor: 'rgba(7, 186, 77, 0.3)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 2}}>
                        Leaderboard
                    </Text>
                </View>
                <ScrollView className="p-4">
                    {leaderboardData.sort((a, b) => a.rank - b.rank).map(item => (
                        <LeaderboardItem key={item.id} {...item} />
                    ))}
                </ScrollView>
            </View>
        </View>
)};

const Leaderboard: React.FC = () => {
    const tabs = [
        { name: 'GLOBAL', component: GlobalLeaderboard },
        { name: 'FRIENDS', component: FriendsLeaderboard },
    ];

    return (
        <BackgroundWrapper>
            <SafeAreaView className="flex-1">
                <TabMenu tabs={tabs} />
            </SafeAreaView>
        </BackgroundWrapper>
    );
};

export default Leaderboard;