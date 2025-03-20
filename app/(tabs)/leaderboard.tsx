import { Text, View, Image, ScrollView } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import {SafeAreaView} from "react-native-safe-area-context";

import TabMenu from '../components/TabMenu';

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
    <View className="flex-row items-center p-2 bg-gray-800 rounded-lg mb-2">
        <Image source={{ uri: 'https://fastly.picsum.photos/id/227/200/200.jpg?hmac=_HAD3ZQuIUMd1tjQfU5i21RCLHRDH_r_Xuq0q6iRN-o' }} className="w-12 h-12 border border-highlight rounded-lg" />
        <View className="flex-1 ml-4">
            <Text className="text-secondary text-lg font-bold">{item.name}</Text>
            <View className="flex-row items-center">
                <Image source={{ uri: 'https://img.icons8.com/emoji/48/gem-stone.png' }} className="w-3 h-3 mr-2" />
                <Text className="text-secondary text-sm">{item.persistentPoints}</Text>
            </View>
        </View>
        <View className="flex-row border border-tertiary p-1 pr-10 pl-10 rounded-br-3xl rounded-tl-3xl">
            <Text className="text-highlight text-lg text-center font-bold"># {item.rank}</Text>
        </View>
    </View>
);

const GlobalLeaderboard: React.FC = () => (
    <View className="flex-1 p-4 bg-primary">
        <View className="p-2 border-b border-tertiary">
            <Text className="text-highlight text-xl font-bold mb-2 text-center">Leaderboard</Text>
        </View>
        <ScrollView className="flex-1 p-4">
            {leaderboardData.sort((a, b) => a.rank - b.rank).map(item => (
                <LeaderboardItem key={item.id} item={item} />
            ))}
        </ScrollView>
    </View>
);

const FriendsLeaderboard: React.FC = () => (
    <View className="flex-1 p-4 bg-primary">
        <View className="p-2 border-b border-tertiary">
            <Text className="text-highlight text-xl font-bold mb-2 text-center">Leaderboard</Text>
        </View>
        <ScrollView className="p-4">
            {leaderboardData.filter(item => item.rank <= 5).map(item => (
                <LeaderboardItem key={item.id} item={item} />
            ))}
        </ScrollView>
    </View>
);

const Leaderboard: React.FC = () => {
    const tabs = [
        { name: 'GLOBAL', component: GlobalLeaderboard },
        { name: 'FRIENDS', component: FriendsLeaderboard },
    ];

    return (
        <BackgroundWrapper>
            <SafeAreaView className="flex-1 bg-primary">
                <TabMenu tabs={tabs} />
            </SafeAreaView>
        </BackgroundWrapper>
    );
};

export default Leaderboard;