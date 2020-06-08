import React, { useState } from 'react'
import { View, FlatList } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import StoryItem from './StoryItem'


const Tab = createMaterialTopTabNavigator();

const Recent = () => {
  const [items, setItems] = useState([
  {
    id: "site1",
    name: "Milton Historical Society",
    distance: "1.21 mi",
    img: "./744e025616ef4e390478c64900dbf7f0.jpg"
  },
  {
    key: "site2",
    name: "Milton Described",
    distance: "7.31 mi",
    img: "./fc60ccf6832d141384f6ebe31bf1c43c.jpg"
  },
])

 return (
    <FlatList data={items}
      renderItem={({item}) => <StoryItem item={item} />}
    />
  )
}


const Stories = () => {

  return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen name="Recent" component={Recent} />
          <Tab.Screen name="Nearby" component={Recent} />
          <Tab.Screen name="Featured" component={Recent} />
        </Tab.Navigator>
      </View>
  )
}
  

export default Stories