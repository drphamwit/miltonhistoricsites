import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import StoryDisplay from './StoryDisplay'
import SingleStory from './SingleStory'
import api from '../../../utils/api'
import Geolocation from '@react-native-community/geolocation'
import LoadingIcon from '../../misc/LoadingIcon'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { startClock } from 'react-native-reanimated'
import SingleTour from '../Tour/SingleTour'


const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const StoryList = ({ navigation, route }) => {
  const [items, setItems ] = useState([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState({})

  const selectedCallback = id => {
    navigation.push('storySingle', { id: id , location: location, shouldGoBack: false})
  }

  useEffect(() => {
    api.getAllStories().then(response => {
      setItems(response.items)
      setLoading(false)
    })
      Geolocation.getCurrentPosition(loc => setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude }))
  }, [route.params?.id])

  if (loading) {
    return <LoadingIcon />
  }

  return (
  <View style={{ flex: 1 }}>
    <Tab.Navigator>
      <Tab.Screen name="Recent">
        {() => <StoryDisplay items={items} selectedCallback={selectedCallback} userLocation={location}/>}
      </Tab.Screen>
      <Tab.Screen name="Nearby" >
        {() => <StoryDisplay items={items} selectedCallback={selectedCallback} userLocation={location} />}
      </Tab.Screen>
      <Tab.Screen name="Featured">
        {() => <StoryDisplay items={items.filter(item => item.featured == 1)} selectedCallback={selectedCallback} userLocation={location} />}
      </Tab.Screen>
    </Tab.Navigator>
  </View>
  ) 
}

const Stories = ({ navigation, route }) => {
  const [storyID, setStoryID] = useState()

  useEffect(() => {
    navigation.addListener('focus', () => {
      if (route.params?.id) {
        console.log('new story id', route.params?.id)
        setStoryID(route.params?.id)
      }
    })
  }, [route.params?.id])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="storyList" component={StoryList} initialParams={{ id: 1 }}/>
      <Stack.Screen name="storySingle" component={SingleStory} />
    </Stack.Navigator>
)
}

export default Stories