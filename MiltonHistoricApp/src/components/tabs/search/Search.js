import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Dimensions, Button, Text } from 'react-native'
import api from '../../../utils/api'
import separateStoriesAndTours from '../../../utils/separateStoriesAndTours'
import { createStackNavigator } from '@react-navigation/stack'
import SearchResult from './SearchResult'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'

const width = Dimensions.get('window').width

const SearchBar = ({ setParentText, collapseCallBack }) => {
  const [text, setText] = useState('')
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View style={styles.searchSection}>
      <FontAwesome5Icon style={styles.searchIcon} name="search" />
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setText(text)
          setParentText(text)
        }}
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
  const [searchText, setSearchText]= useState('')
  const [featured, setFeatured] = useState('')

  const constructKeywordQueryString = () => {
    const replacedSearch = searchText.replace(' ', '+')
    return `/search?query=${searchText}&query_type=keyword&record_types%5B%5D=Item&record_types%5B%5D=Tour&submit_search=Search`
  }

  const constructAdvancedQueryString = () => {
    let url = 'items/browse?search=&advanced%5B0%5D%5B'
    if (featured) {
      url += `&featured=${featured === 'featured' ? '1' : '0'}`
    }
    return url + '&submit_search=Search+for+items'
  }

  const searchCallBack = () => {
    const queryString = (collapse) ? constructAdvancedQueryString() : constructKeywordQueryString();
    api.search(queryString).then(response => {
      const result = separateStoriesAndTours(response.items.map(item => {
        return { id: item.result_id, thumbnail: item.result_thumbnail, title: item.result_title, result_type: item.result_type }
      }))
      navigation.push('SearchResult', { stories: result.stories, tours: result.tours })
    })
  }

  const collapseCallBack = () => setCollapse(!collapse)

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <SearchBar setParentText={setSearchText} collapseCallBack={collapseCallBack}/>
        {
          collapse ? 
          (
            <View style={{ backgroundColor: 'white', height: 300, marginTop: -200, justifyContent: 'center', alignItems: 'center', padding: 20}}>
              <View style={{ marginTop: -200, alignItems: 'center'}}>
              </View>
            </View>
          ) : null
        }
        <View style={styles.submit}>
          <Button
            title='search'
            color='#fff'
            onPress={() => {searchCallBack()}}
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