import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import api from '../../../utils/api'
import TourDisplay from './TourDisplay'
import SingleTour from './SingleTour'

const Tab = createMaterialTopTabNavigator();

const Tours = () => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState('')

  const selectedCallback = item => setSelectedItem(item)

  useEffect(() => {
    api.getAllTours().then(response => {
      setItems(response.tours)
    })
  }, [])

  return (selectedItem) ? <SingleTour tour={selectedItem} backCallback={selectedCallback}/> 
    : (<View style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen name="All">
            {() => <TourDisplay items={items} selectedCallback={selectedCallback} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>)
}
  

export default Tours