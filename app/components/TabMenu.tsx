// TabMenu.tsx
import React from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

type Tab = {
  name: string;
  component: React.ComponentType<any>;
};

type TabMenuProps = {
  tabs: Tab[];
};

const Tab = createMaterialTopTabNavigator();

const TabMenu: React.FC<TabMenuProps> = ({ tabs }) => {
const screenOptions: MaterialTopTabNavigationOptions = {
    tabBarLabelStyle: { fontSize: 24, fontWeight: 'bold' },
    tabBarStyle: { backgroundColor: '#1e1e1e' },
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'gray',
    tabBarIndicatorStyle: { 
        backgroundColor: 'green',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        margin: 2,
    },
};

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {tabs.map((tab, index) => (
        <Tab.Screen key={index} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default TabMenu;