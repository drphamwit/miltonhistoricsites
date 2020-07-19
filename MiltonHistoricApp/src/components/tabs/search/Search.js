import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Dimensions, Button, Text } from 'react-native'
import api from '../../../utils/api'
import separateStoriesAndTours from '../../../utils/separateStoriesAndTours'
import { createStackNavigator } from '@react-navigation/stack'
import SearchResult from './SearchResult'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'

const width = Dimensions.get('window').width

const SearchBar = ({ searchCallBack, collapseCallBack }) => {
  const [text, setText] = useState('')
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View style={styles.searchSection}>
      <FontAwesome5Icon style={styles.searchIcon} name="search" />
      <TextInput
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
      />
      <TouchableOpacity style={{ marginLeft: 10}} onPress={() => {
        collapseCallBack()
        setIsHidden(!isHidden)
      }}>
        <FontAwesome5Icon name={isHidden ? 'angle-down' : 'angle-up'} />
      </TouchableOpacity>
    </View>
  )
}
const SearchMain = ({ navigation }) => {
  const [collapse, setCollapse] = useState(false)

  const searchCallBack = (queryString) => {
    navigation.navigate('SearchResult', { stories: [], tour: []})
  }

  const collapseCallBack = () => setCollapse(!collapse)

    return (
      <View style={{ flex: 1 }}>
        <SearchBar searchCallBack={searchCallBack} collapseCallBack={collapseCallBack}/>
        <View>
        {
          collapse ? 
          (
            <Text>UnCollapse</Text>
          ) : null
        }
        </View>
        <View style={styles.submit}>
          <Button
            title='search'
            color='#fff'
            style={styles.submit}
          />
        </View>
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
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 0,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  submit: {
    backgroundColor: '#0095FF',
    margin: 40

  }
})
  

export default Search