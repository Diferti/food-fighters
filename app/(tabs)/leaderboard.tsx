import { Text, View, Image, ScrollView } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import {SafeAreaView} from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import TabMenu from '../components/TabMenu';
import React from "react";

const leaderboardData = [
    { id: 1, name: 'Diferti', persistentPoints: 1999999, rank: 1 },
    { id: 2, name: 'Diferti', persistentPoints: 5000, rank: 5 },
    { id: 3, name: 'Diferti', persistentPoints: 2000, rank: 6 },
    { id: 4, name: 'Diferti', persistentPoints: 10000, rank: 4 },
    { id: 5, name: 'Diferti', persistentPoints: 1000, rank: 7 },
    { id: 6, name: 'Diferti', persistentPoints: 20000, rank: 3 },
    { id: 7, name: 'Diferti', persistentPoints: 50000, rank: 2 },
];

interface LeaderboardItemProps {
    item: {
        id: number;
        name: string;
        persistentPoints: number;
        rank: number;
    };
}

const LeaderboardItem = ({ item }: LeaderboardItemProps) => (
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
                padding: 8,
                borderRadius: 10,
                marginBottom: 12,
                height: 70,
            }}>
            <Image source={{ uri: 'https://fastly.picsum.photos/id/227/200/200.jpg?hmac=_HAD3ZQuIUMd1tjQfU5i21RCLHRDH_r_Xuq0q6iRN-o' }}
                   className="w-[50px] h-[50px] border border-highlight rounded-[5px]" />
            <View className="flex-1 ml-[15px] justify-center">
                <Text className="text-secondary text-[20px] font-fontMain-bold mb-[3px]">{item.name}</Text>
                <View className="flex-row items-center">
                    <Image source={require('../../assets/images/icons/gem.png')}  className="w-[18px] h-[18px] mr-[5px] mt-[2px]" />
                    <Text className="text-secondary text-[16px] font-fontMain-bold">{item.persistentPoints}</Text>
                </View>
            </View>
            <View className="flex-row border border-highlight/30 p-1 pr-10 pl-10 rounded-br-[15px] rounded-tl-[15px] bg-[#202D43]">
                <Text className="text-highlight text-lg text-center font-bold"># {item.rank}</Text>
            </View>
        </LinearGradient>
    </View>
);

const GlobalLeaderboard: React.FC = () => (
    <View className="flex-1 px-[15px] pt-0 bg-primary">
        <View className='bg-dark-blue h-full border-highlight border-x-[1px] border-b-[1px] rounded-b-[30px]'>
            <View className="border-b border-tertiary/50 bg-[#131C2A] py-[10px]">
                <Text className="text-highlight text-[20px] font-fontMain-bold my-2 text-center"
                      style={{textShadowColor: 'rgba(7, 186, 77, 0.3)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 2}}>
                    Leaderboard
                </Text>
            </View>
            <ScrollView className="p-4">
                {leaderboardData.sort((a, b) => a.rank - b.rank).map(item => (
                    <LeaderboardItem key={item.id} item={item} />
                ))}
            </ScrollView>
        </View>
    </View>
);

const FriendsLeaderboard: React.FC = () => (
    <View className="flex-1 px-[15px] pt-0 bg-primary">
        <View className='bg-dark-blue h-full border-highlight border-x-[1px] border-b-[1px] rounded-b-[30px]'>
            <View className="border-b border-tertiary/50 bg-[#131C2A] py-[10px]">
                <Text className="text-highlight text-[20px] font-fontMain-bold my-2 text-center"
                      style={{textShadowColor: 'rgba(7, 186, 77, 0.3)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 2}}>
                    Leaderboard
                </Text>
            </View>
            <ScrollView className="p-4">
                {leaderboardData.filter(item => item.rank <= 5).map(item => (
                    <LeaderboardItem key={item.id} item={item} />
                ))}
            </ScrollView>
        </View>
    </View>
);

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