import React, { useEffect, useState }   from 'react';
import { AsyncStorage, Platform, StatusBar, ScrollView,
        StyleSheet, View , Text, TouchableHighlight} from 'react-native';

import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import * as AppAuth from 'expo-app-auth';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import styles from './styles/styles'

const Stack = createStackNavigator();


// Login with microsoft

const configMS = {
  issuer: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`,
  clientId: process.env.MS_CLIENT_ID,
  redirectUrl: 'com.myapp://oauth/redirect',
  // scopes: ['openid', 'profile', 'email', 'offline_access']
};

// add other logon types here

// Google
const configGoogle = {
  issuer: 'https://login.microsoftonline.com/8ca09082-aa44-41c9-bd4e-7a6b59c90ba0',
  clientId: 'xx',
  redirectUrl: 'com.myapp://oauth/redirect',
  // scopes: ['openid', 'profile', 'email', 'offline_access']
};

// Facebook


export async function signInAsync(myConfig) {
  let authState = await AppAuth.authAsync(myConfig);
  await cacheAuthAsync(authState);
  console.log('signInAsync', authState);
  return authState;
}


export default function App(props) {

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  let [authState, setAuthState] = useState(null);
  let [isLoggedOn,setLoggedOn] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        SplashScreen.hide();
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);


  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
        isLoggedOn 
        ?
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
              <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
        </View>
        :
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.form}>         
              <TouchableHighlight 
                style={styles.button} 
                onPress={async () => {
                  // const authState = await signInAsync(configMS);
                  // setAuthState(_authState);

                  setLoggedOn(true)
                }} 
                underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Sign In with Microsoft</Text>
              </TouchableHighlight>

              <TouchableHighlight 
                style={styles.button} 
                onPress={async () => {
                  // const authState = await signInAsync(configGoogle);
                  // setAuthState(_authState);
                
                  setLoggedOn(true)
                }} 
                underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Sign In with Google</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
    )
  }
    
}


