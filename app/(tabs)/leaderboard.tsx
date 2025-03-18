import { Text, View } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import {SafeAreaView} from "react-native-safe-area-context";

const Leaderboard = () => {
    return (
        <BackgroundWrapper>
            <SafeAreaView>
                <View className="p-4">
                    <Text className="text-white text-2xl">Leaderboard Content</Text>
                </View>
            </SafeAreaView>
        </BackgroundWrapper>
    );
};

export default Leaderboard;