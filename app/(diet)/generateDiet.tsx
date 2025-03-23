import { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MEAL_OPTIONS = ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Snack', 'Supper'];
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

const StyledCheckbox = ({ label, emoji, checked, onChange }: {
    label: string;
    emoji: string;
    checked: boolean;
    onChange: (checked: boolean) => void
}) => (
    <TouchableOpacity
        onPress={() => onChange(!checked)}
        className={`p-3 rounded-xl border ${checked ? 'border-primary bg-primary/20 border-2' : 'border-primary/50'}`}
    >
        <View className="flex-row items-center gap-2">
            <Text className={`text-lg ${checked ? 'text-primary' : 'text-secondary'}`}>
                {emoji}
            </Text>
            <Text className={`font-bold ${checked ? 'text-primary' : 'text-secondary'}`}>
                {label}
            </Text>
        </View>
        {checked && (
            <Text className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-white rounded-full w-5 h-5 text-center">
                ✓
            </Text>
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
        <View className="space-y-2">
            <Text className="text-sm font-bold text-secondary">{label}</Text>
            <TextInput
                className="w-full p-3 border border-gray-300 rounded"
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={handleAddTags}
                onBlur={handleAddTags}
                placeholder="Enter comma separated values"
            />
            <View className="flex-row flex-wrap gap-2">
                {values.map((value, index) => (
                    <View key={index} className={`${colorClass} px-2 py-1 rounded-lg flex-row items-center`}>
                        <Text className="text-sm font-bold text-gray-600">{value}</Text>
                        <TouchableOpacity
                            onPress={() => setValues(values.filter((_, i) => i !== index))}
                            className="ml-1"
                        >
                            <Text className="text-red-700 font-bold">×</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

const GenerateDiet = () => {
    const [selectedMeals, setSelectedMeals] = useState(['Breakfast', 'Lunch', 'Dinner']);
    const [restrictions, setRestrictions] = useState<string[]>([]);
    const [loveProducts, setLoveProducts] = useState<string[]>([]);
    const [unloveProducts, setUnloveProducts] = useState<string[]>([]);

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
                <TouchableOpacity className="mb-4">
                    <Ionicons name="chevron-back" size={30} color="#07BA4D" />
                </TouchableOpacity>
            </Link>

            <Text className="text-highlight text-2xl font-bold mb-8 text-center">
                GENERATE DIET
            </Text>

            <ScrollView className="flex-1">
                {/* Meals Selection */}
                <View className="bg-pageColor p-4 mb-6 border border-primary rounded-xl">
                    <Text className="text-xl font-bold text-primary mb-4">Daily Meals</Text>
                    <View className="flex-row flex-wrap gap-3">
                        {MEAL_OPTIONS.map((meal) => {
                            const isSelected = selectedMeals.includes(meal);
                            return (
                                <TouchableOpacity
                                    key={meal}
                                    onPress={() => handleMealSelect(meal)}
                                    className={`w-[48%] p-3 rounded-xl border ${
                                        isSelected
                                            ? 'border-primary bg-primary/20 border-2'
                                            : 'border-primary/50'
                                    }`}
                                >
                                    <View className="flex-row items-center gap-2">
                                        <Text className={`text-lg ${isSelected ? 'text-primary' : 'text-secondary'}`}>
                                            {getMealIcon(meal)}
                                        </Text>
                                        <Text className={`font-bold ${isSelected ? 'text-primary' : 'text-secondary'}`}>
                                            {meal}
                                        </Text>
                                    </View>
                                    {isSelected && (
                                        <Text className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-white rounded-full w-5 h-5 text-center">
                                            ✓
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Dietary Restrictions */}
                <View className="bg-pageColor p-4 mb-6 border border-primary rounded-xl">
                    <Text className="text-xl font-bold text-primary mb-4">Dietary Restrictions</Text>
                    <View className="flex-row flex-wrap gap-3">
                        {[
                            { label: 'Vegetarian', emoji: '🌱' },
                            { label: 'Vegan', emoji: '🥦' },
                            { label: 'Halal', emoji: '☪️' },
                            { label: 'Kosher', emoji: '✡️' },
                            { label: 'Pork-free', emoji: '🐖🚫' },
                            { label: 'Dairy-free', emoji: '🥛🚫' }
                        ].map(({ label, emoji }) => (
                            <StyledCheckbox
                                key={label}
                                label={label}
                                emoji={emoji}
                                checked={restrictions.includes(label.toLowerCase())}
                                onChange={(checked: boolean) =>
                                    setRestrictions(checked ?
                                        [...restrictions, label.toLowerCase()] :
                                        restrictions.filter(r => r !== label.toLowerCase())
                                    )}
                            />
                        ))}
                    </View>
                </View>

                {/* Food Preferences */}
                <View className="bg-pageColor p-4 border border-primary rounded-xl">
                    <Text className="text-xl font-bold text-primary mb-4">Food Preferences</Text>
                    <View className="space-y-4">
                        <TagInput
                            label="Favorite Foods"
                            values={loveProducts}
                            setValues={setLoveProducts}
                            colorClass="bg-green-100"
                        />
                        <TagInput
                            label="Avoid Foods"
                            values={unloveProducts}
                            setValues={setUnloveProducts}
                            colorClass="bg-red-100"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GenerateDiet;