import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PersonScreen from '../screens/PersonScreen';
import ChartsScreen from '../screens/ChartsScreen';
import LinksScreen from '../screens/LinksScreen';
import Colors from '../constants/Colors';

import styles from '../styles/styles'

const INITIAL_ROUTE_NAME = 'Home';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route),
                          headerStyle:{ backgroundColor: '#043862'},
                          headerTitleStyle:{ color: '#ffffff'}
                        });

  return (

    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={ {style: styles.navigator,
                                                                                activeTintColor: Colors.tabIconSelected,
                                                                                inactiveTintColor: Colors.tabIconDefault } }>
      <BottomTab.Screen      
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Daily Tracking',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-clock" />,
        }}
      />
      <BottomTab.Screen      
        name="You"
        component={PersonScreen}
        options={{
          title: 'About You',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-person" />,
        }}
      />
      <BottomTab.Screen      
        name="Charts"
        component={ChartsScreen}
        options={{
          title: 'Charts',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-stats" />,
        }}
      />

      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>

  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Your daily check';
    case 'You':
        return 'Your details';
    case 'Charts':
      return 'Your charts';
    case 'Links':
      return 'Links';
  }
}
