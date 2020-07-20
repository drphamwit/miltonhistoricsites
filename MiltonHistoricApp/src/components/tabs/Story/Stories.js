import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import StoryDisplay from './StoryDisplay'
import SingleStory from './SingleStory'
import api from '../../../utils/api'
import LoadingIcon from '../../misc/LoadingIcon'
import { getUserLocation, sortByDate, sortByDistance } from '../../../utils/utils'

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const StoryList = ({ navigation }) => {
  const [items, setItems ] = useState([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState({})

  const selectedCallback = id => {
    navigation.push('SingleStory', { id: id})
  }

  useEffect(() => {
    api.getAllStories().then(response => {
      setItems(response.items)
      setLoading(false)
    })
      getUserLocation(setLocation)
  }, [])

  if (loading) {
    return <LoadingIcon />
  }

  return (
  <View style={{ flex: 1 }}>
    <Tab.Navigator>
      <Tab.Screen name="Recent">
        {() => <StoryDisplay items={sortByDate(items)} selectedCallback={selectedCallback} userLocation={location}/>}
      </Tab.Screen>
      <Tab.Screen name="Nearby" >
        {() => <StoryDisplay items={sortByDistance(items, location)} selectedCallback={selectedCallback} userLocation={location}/>}
      </Tab.Screen>
      <Tab.Screen name="Featured">
        {() => <StoryDisplay items={items.filter(item => item.featured == 1)} selectedCallback={selectedCallback} userLocation={location}/>}
      </Tab.Screen>
    </Tab.Navigator>
  </View>
  ) 
}

const Stories = ({ navigation, route }) => {

  return (
    <Stack.Navigator
      initialRouteName='StoryMain'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="StoryMain" component={StoryList} />
      <Stack.Screen name="SingleStory" component={SingleStory} />
    </Stack.Navigator>
)
}

export default Stories