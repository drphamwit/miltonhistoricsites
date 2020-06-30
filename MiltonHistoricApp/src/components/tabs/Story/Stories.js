import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import StoryDisplay from './StoryDisplay'
import SingleStory from './SingleStory'
import api from '../../../utils/api'
import Geolocation from '@react-native-community/geolocation'
import LoadingIcon from '../../misc/LoadingIcon'


const Tab = createMaterialTopTabNavigator();

const Stories = () => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState('')
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState({ latitude: 42.2495, longitude: -71.0662})

  const selectedCallback = item => {
    setSelectedItem(item)
  }

  useEffect(() => {
    api.getAllStories().then(response => {
      setItems(response.items)
      setLoading(false)
    })
    Geolocation.getCurrentPosition(loc => setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude }))
  }, [])

  if (loading) {
    return <LoadingIcon />
  }

  return (selectedItem) ? <SingleStory item={selectedItem} backCallBack={selectedCallback}/> 
    : (<View style={{ flex: 1 }}>
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
      </View>)  
}
  

export default Stories