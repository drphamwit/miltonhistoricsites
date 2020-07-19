import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Dimensions, Button } from 'react-native'
import api from '../../../utils/api'
import separateStoriesAndTours from '../../../utils/separateStoriesAndTours'
import { createStackNavigator } from '@react-navigation/stack'
import SearchResult from './SearchResult'

const width = Dimensions.get('window').width

const SearchBar = ({ searchCallBack }) => {
  const [text, setText] = useState('')

  return (
    <View>
      <TextInput
        style={{ height: 40, width: width,  borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button
        title="Search"
        onPress={() => searchCallBack('')}
      >

      </Button>
    </View>
  )
}
const SearchMain = ({ navigation }) => {

    const searchCallBack = (queryString) => {
        navigation.navigate('SearchResult', { stories: [], tour: []})
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <SearchBar searchCallBack={searchCallBack}/>
      </View>
    )
}

const Stack = createStackNavigator()

const Search = () => {

  return (
    <Stack.Navigator 
      initialRouteName="Search"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Search' component={SearchMain} />
      <Stack.Screen name='SearchResult' component={SearchResult} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({

})
  

export default Search