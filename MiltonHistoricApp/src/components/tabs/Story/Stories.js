import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import StoryDisplay from './StoryDisplay'
import SingleStory from './SingleStory'
import api from '../../../utils/api'


const Tab = createMaterialTopTabNavigator();

const Stories = () => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState('')

  const selectedCallback = item => {
    setSelectedItem(item)
  }

  useEffect(() => {
    api.getAllStories().then(response => {
      setItems(response.items)
    })
  }, [])

  return (selectedItem) ? <SingleStory item={selectedItem} backCallBack={selectedCallback}/> 
    : (<View style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen name="Recent">
            {() => <StoryDisplay items={items} selectedCallback={selectedCallback} />}
          </Tab.Screen>
          <Tab.Screen name="Nearby" >
            {() => <StoryDisplay items={items} selectedCallback={selectedCallback} />}
          </Tab.Screen>
          <Tab.Screen name="Featured">
            {() => <StoryDisplay items={items.filter(item => item.featured == 1)} selectedCallback={selectedCallback} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>)  
}
  

export default Stories