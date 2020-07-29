import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import TourDisplay from './TourDisplay'
import SingleTour from './SingleTour'
import api from '../../../utils/api'
import LoadingIcon from '../../misc/LoadingIcon'

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const TourMain = ({ navigation }) => {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAllTours().then(response => {
      setTours(response.tours)
      setLoading(false)
    })
  }, [])

  const selectedCallBack = (tour) => {
    navigation.push('tourSingle', { tour: tour })
  }

  if (loading) {
    return <LoadingIcon />
  }

  return (
  <View style={{ flex: 1 }}>
    <TourDisplay items={tours} selectedCallBack={selectedCallBack} />
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