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
    tabBarLabelStyle: {
        fontSize: 26,
        fontFamily: 'Luckiest Guy',
        alignContent: 'center'},
    tabBarStyle: {
        backgroundColor: '#182335',
        marginTop: 45,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        height: 70,
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 10,
        alignItems: 'center',
        borderColor: '#07BA4D',
        borderBottomWidth: 1,
    },
    tabBarActiveTintColor: '#ECEFF3',
    tabBarInactiveTintColor: '#818795',
    tabBarIndicatorStyle: {
        backgroundColor: '#1E4C40',
        height: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderColor: '#07BA4D',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
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