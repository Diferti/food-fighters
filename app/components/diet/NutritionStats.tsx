import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

const NutritionStats = (props: any) => (
    <View className="space-y-1">
        <View className="flex flex-row justify-between items-center mb-1 mt-[10px]">
            <View className="flex flex-row items-center gap-1">
                <Text className="text-[16px]">{props.icon}</Text>
                <Text className="text-secondary text-[13px] font-fontMain-regular">{props.label}</Text>
            </View>
            <Text className="text-secondary text-[13px] font-fontMain-regular">
                {Number.isInteger(props.value) ? props.value : props.value.toFixed(1) || 0}g
            </Text>
        </View>
        <View className="h-2 rounded-full bg-secondary/50">
            <View className={`h-2 rounded-full ${props.color}`}
                  style={{ width: `${Math.min(((props.value || 0) / (props.max || 100)) * 100, 100)}%` }}/>
        </View>
    </View>
);

export default NutritionStats
