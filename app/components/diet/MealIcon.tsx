import {Text} from 'react-native'
import React from 'react'

const MealIcon = ({ type }: any) => {
    const icons: { [key: string]: string } = {
        Breakfast: '🥞',
        Brunch: '🥐',
        Lunch: '🥗',
        Snack: '🍎',
        Dinner: '🍽️',
        Supper: '🍵'
    };
    return <Text className="text-2xl">{icons[type] || '🍴'}</Text>;
};

export default MealIcon
