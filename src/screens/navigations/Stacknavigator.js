import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import Splash from '../Splash';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FullScreenChz from 'react-native-fullscreen-chz';

import Home from '../Home';



const Stacknavigator = () => {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    handleScreenTouch();
  }, []);

  function handleScreenTouch() {
    console.log('Screen was touched!');

    if (Platform.OS === 'android') {
      FullScreenChz.enable();
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        
        <Stack.Screen name="Home" component={Home} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacknavigator;

const styles = StyleSheet.create({});
