import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Dimensions, Button, Text } from 'react-native'
import api from '../../../utils/api'
import separateStoriesAndTours from '../../../utils/separateStoriesAndTours'
import { createStackNavigator } from '@react-navigation/stack'
import SearchResult from './SearchResult'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'

const width = Dimensions.get('window').width

const SearchBar = ({ searchCallBack }) => {
  const [text, setText] = useState('')
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View style={{ flex: 0 }}>
      <View
      style={{
        height: 60,
        backgroundColor: 'darkslateblue',
        justifyContent: 'center',
        paddingHorizontal: 5,
      }}>
      <View
      style={{
        height: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
      }}>
        <FontAwesome5Icon name="search" style={{ fontSize: 20, color: '#a1a1a1' }} />
        <TextInput 
          placeholder="Search"  
          style={{ fontSize:20,paddingLeft:15 }} 
          onChangeText={value => setText(value)}
          onSubmitEditing={keypress => searchCallBack(api.keywordSearch,text)}
        />
        <FontAwesome5Icon name={isHidden ? 'chevron-down' : 'chevron-up'} style={{ fontSize: 20, position: 'absolute', right: 10, color: '#a1a1a1' }} onPress={() => setIsHidden(!isHidden)}/>
      </View>
      </View>
      {isHidden ?
      <View style={{}}>
        <View style={styles.submit}>
          <Button
            title='search'
            color='#fff'
            onPress={() => searchCallBack(api.extendedSearch, text)}
          />
        </View>
      </View>
      : null}
    </View>
  )
}
const Search = ({ navigation }) => {
  const [featured, setFeatured] = useState('')
  const [tours, setTours] = useState([]);
  const [stories, setStories] = useState([])

  const constructAdvancedQueryString = () => {
    let url = 'items/browse?search=&advanced%5B0%5D%5B'
    if (featured) {
      url += `&featured=${featured === 'featured' ? '1' : '0'}`
    }
    return url + '&submit_search=Search+for+items'
  }

  const searchCallBack = (searchFun, text) => { 
    searchFun(text).then(response => {
      const result = separateStoriesAndTours(response.items.map(item => {
        console.log(item)
        return { id: item.result_id, thumbnail: item.result_thumbnail, title: item.result_title, result_type: item.result_type }
      }))
      setStories(result.stories);
      setTours(result.tours);
    })
  }

    return (
      <View style={{flex: 1}}>
        <SearchBar searchCallBack={searchCallBack} />
        <SearchResult tours={tours} stories={stories} navigation={navigation} />
      </View>
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