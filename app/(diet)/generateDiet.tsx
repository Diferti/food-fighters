import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MEAL_OPTIONS = ['Breakfast', 'Brunch', 'Lunch', 'Snack', 'Dinner', 'Supper'];
const MEAL_ORDER = ['Breakfast', 'Brunch', 'Lunch', 'Snack', 'Dinner', 'Supper'];

const getMealIcon = (meal: string) => {
    switch (meal) {
        case 'Breakfast': return '🥞';
        case 'Brunch': return '🥐';
        case 'Lunch': return '🥗';
        case 'Snack': return '🍎';
        case 'Dinner': return '🍽️';
        case 'Supper': return '🍵';
        default: return '🍴';
    }
};

const DaysInput = ({ onDaysChange }: { onDaysChange: (days: number) => void }) => {
    const [days, setDays] = useState(1);

    const handleIncrement = () => {
        const newValue = days < 90 ? days + 1 : days;
        setDays(newValue);
        onDaysChange(newValue);
    };

    const handleDecrement = () => {
        const newValue = days > 1 ? days - 1 : days;
        setDays(newValue);
        onDaysChange(newValue);
    };

    const handleInputChange = (text: string) => {
        const value = Math.min(90, Math.max(1, parseInt(text) || 1));
        setDays(value);
        onDaysChange(value);
    };

    return (
        <View className="bg-dark-blue p-4 mb-6 border border-highlight/30 rounded-[15px]">
            <Text className="text-[20px] font-fontMain-bold text-highlight mb-4">Diet Duration</Text>

            <View className="flex-row items-center justify-center space-x-4">
                <TouchableOpacity onPress={handleDecrement} disabled={days <= 1}
                                  className="p-3 bg-[#354D4D] rounded-[10px] border-[1px] border-highlight" >
                    <Ionicons name="remove" size={24} color={days > 1 ? "#07BA4D" : "#818795"}/>
                </TouchableOpacity>

                <View className="items-center">
                    <TextInput className="text-highlight text-[34px] font-fontHeader text-center w-20 mt-[5px]"
                        value={String(days)} onChangeText={handleInputChange} keyboardType="numeric" selectTextOnFocus/>
                    <Text className="text-secondary text-sm mt-[-8px]">Days</Text>
                </View>

                <TouchableOpacity onPress={handleIncrement} disabled={days >= 90}
                                  className="p-3 bg-[#354D4D] rounded-[10px] border-[1px] border-highlight" >
                    <Ionicons name="add" size={24} color={days < 90 ? "#07BA4D" : "#818795"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const StyledCheckbox = ({ label, emoji, checked, onChange }: {
    label: string;
    emoji: string;
    checked: boolean;
    onChange: (checked: boolean) => void
}) => (
    <TouchableOpacity onPress={() => onChange(!checked)} className={`w-[48%] p-3 rounded-[10px] border-[1px] ${
            checked ? 'bg-[#354D4D] border-highlight border-[2px]' : 'border-highlight'}`} style={{ position: 'relative' }}>
        <View className="flex-row items-center gap-2">
            <Text className={`text-lg`}>{emoji}</Text>
            <Text className={`text-[16px] font-fontMain-bold ${checked ? 'text-highlight font-fontMain-extrabold' : 'text-secondary'}`}>{label}</Text>
        </View>
        {checked && (
            <Text className="absolute top-0 right-0 -mt-1 -mr-1 bg-highlight text-secondary rounded-full w-5 h-5 text-center">✓</Text>
        )}
    </TouchableOpacity>
);

const TagInput = ({ label, values, setValues, colorClass }: {
    label: string;
    values: string[];
    setValues: (values: string[]) => void;
    colorClass: string;
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTags = () => {
        if (inputValue.trim()) {
            const newTags = inputValue.split(',').map(tag => tag.trim());
            setValues([...new Set([...values, ...newTags])]);
            setInputValue('');
        }
    };

    return (
        <View>
            <Text className="text-[16px] font-fontMain-regular text-secondary mb-2 mt-[10px]">{label}</Text>
            <TextInput className="w-full p-3 border border-highlight rounded-[10px] mb-[10px]" value={inputValue}
                       onChangeText={setInputValue} onSubmitEditing={handleAddTags} onBlur={handleAddTags} placeholder="Enter food (comma separated)"/>
            <View className="flex-row flex-wrap gap-2">
                {values.map((value, index) => (
                    <TouchableOpacity key={index} onPress={() => setValues(values.filter((_, i) => i !== index))}
                                      className={`${colorClass} px-2 py-1 rounded-[5px] flex-row items-center`}>
                        <Text className="text-[14px] font-fontMain-bold text-primary">{value}</Text>
                        <Text className="text-[14px] text-red-900 font-bold ml-1">×</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const GenerateDiet = () => {
    const [selectedDays, setSelectedDays] = useState(1);
    const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
    const [restrictions, setRestrictions] = useState<string[]>([]);
    const [loveProducts, setLoveProducts] = useState<string[]>([]);
    const [unlovedProducts, setUnlovedProducts] = useState<string[]>([]);

    const handleMealSelect = (meal: string) => {
        setSelectedMeals(prev => {
            const updated = prev.includes(meal)
                ? prev.filter(m => m !== meal)
                : [...prev, meal];
            return updated.sort((a, b) => MEAL_ORDER.indexOf(a) - MEAL_ORDER.indexOf(b));
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-primary p-5">
            <Link href="../" asChild>
                <TouchableOpacity className="mb-[20px]">
                    <Ionicons name="chevron-back" size={30} color="#07BA4D" />
                </TouchableOpacity>
            </Link>

            <Text className="text-highlight text-[26px] font-fontHeader mb-[20px] text-center">
                GENERATE DIET
            </Text>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <DaysInput onDaysChange={setSelectedDays} />

                <View className="bg-dark-blue p-4 mb-6 border border-highlight/30 rounded-[15px]">
                    <Text className="text-[20px] font-fontMain-bold text-highlight mb-4">Meals Configuration</Text>

                    <View className="flex-row flex-wrap gap-3">
                        {MEAL_OPTIONS.map((meal) => {
                            const isSelected = selectedMeals.includes(meal);
                            return (
                                <TouchableOpacity key={meal} onPress={() => handleMealSelect(meal)} className={`w-[48%] p-3 rounded-[10px] border-[1px] ${
                                        isSelected
                                            ? 'bg-[#354D4D] border-highlight border-inner border-[2px]'
                                            : 'border-highlight'
                                    }`} style={{ position: 'relative' }}>
                                    <View className="flex-row items-center gap-2">
                                        <Text className={`text-lg`}>{getMealIcon(meal)}</Text>
                                        <Text className={`text-[16px] font-fontMain-bold ${isSelected ? 'text-highlight font-fontMain-extrabold' : 'text-secondary'}`}>{meal}</Text>
                                    </View>
                                    {isSelected && (
                                        <Text className="absolute top-0 right-0 -mt-1 -mr-1 bg-highlight text-secondary rounded-full w-5 h-5 text-center">✓</Text>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View className="bg-dark-blue p-4 mb-6 border border-highlight/30 rounded-[15px]">
                    <Text className="text-[20px] font-fontMain-bold text-highlight mb-4">Dietary Restrictions</Text>
                    <View className="flex-row flex-wrap gap-3">
                        {[
                            { label: 'Vegetarian', emoji: '🌱' },
                            { label: 'Vegan', emoji: '🥦' },
                            { label: 'Halal', emoji: '☪️' },
                            { label: 'Kosher', emoji: '✡️' },
                            { label: 'Pork-free', emoji: '🐖🚫' },
                            { label: 'Dairy-free', emoji: '🥛🚫' }
                        ].map(({ label, emoji }) => (
                            <StyledCheckbox key={label} label={label} emoji={emoji} checked={restrictions.includes(label.toLowerCase())} onChange={(checked: boolean) =>
                                    setRestrictions(checked ?
                                        [...restrictions, label.toLowerCase()] :
                                        restrictions.filter(r => r !== label.toLowerCase())
                                    )
                            }/>
                        ))}
                    </View>
                </View>

                <View className="bg-dark-blue p-4 border border-highlight/30 rounded-[15px]">
                    <Text className="text-[20px] font-fontMain-bold text-highlight">Food Preferences</Text>
                    <View className="space-y-6">
                        <TagInput label="Favorite Foods" values={loveProducts} setValues={setLoveProducts} colorClass="bg-highlight/90"/>
                        <TagInput label="Avoid Foods" values={unlovedProducts} setValues={setUnlovedProducts} colorClass="bg-[#F87171]"/>
                    </View>
                </View>

                <View className="items-center mt-[20px]">
                    <TouchableOpacity className="bg-highlight h-[70px] w-[280px] justify-center rounded-[15px] active:opacity-50">
                        <Text className="text-primary text-[24px] font-fontHeader text-center pt-[7px]">GENERATE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GenerateDiet;