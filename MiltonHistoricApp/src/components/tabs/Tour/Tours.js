import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { stackNavigator, createStackNavigator } from '@react-navigation/stack'
import api from '../../../utils/api'
import TourDisplay from './TourDisplay'
import SingleTour from './SingleTour'

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const TourMain = ({ items, navigation }) => {
  return (
  <View style={{ flex: 1 }}>
        <TourDisplay items={items} navigation={navigation} />
  </View>
  )
}

const Tours = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="tourList" component={TourMain}>
      </Stack.Screen>
      <Stack.Screen name="tourSingle" component={SingleTour} >
      </Stack.Screen>
    </Stack.Navigator>
  )

    
}
  

export default Tours