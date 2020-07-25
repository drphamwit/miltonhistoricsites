import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Dimensions, Button, Text } from 'react-native'
import api from '../../../utils/api'
import separateStoriesAndTours from '../../../utils/separateStoriesAndTours'
import SearchResult from './SearchResult'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import NarrowBy from './NarrowBy'

const SearchBar = ({ setParentText, searchCallBack, extendedSearchCallBack }) => {
  const [text, setText] = useState('')
  const [visible, setVisible] = useState(false);

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
          onChangeText={value => {
            setText(value)
            setParentText(value)
          }}
          onSubmitEditing={keypress => searchCallBack()}
        />
        <FontAwesome5Icon name={visible ? 'chevron-down' : 'chevron-up'} style={{ fontSize: 20, position: 'absolute', right: 10, color: '#a1a1a1' }} onPress={() => setVisible(!visible)}/>
      </View>
      </View>
      {visible ?
      <View style={{ backgroundColor: 'darkslateblue'}}>
        <NarrowBy searchCallBack={extendedSearchCallBack}/>
      </View>
      : null}
    </View>
  )
}
const Search = ({ navigation }) => {
  const [tours, setTours] = useState([]);
  const [stories, setStories] = useState([])
  const [text, setText] = useState('')

  const extendedSearchCallBack = (query) => {
    api.executeExtendedSearch(text, query).then(response => {
      setStories(response.items)
    })
  }

  const searchCallBack = () => { 
    api.executeKeywordSearch(text).then(response => {
      const result = separateStoriesAndTours(response.items.map(item => {
        return { id: item.result_id, thumbnail: item.result_thumbnail, title: item.result_title, result_type: item.result_type, needsFill: true }
      }))
      setStories(result.stories)
      setTours(result.tours)
    })
  }

    return (
      <View style={{flex: 1}}>
        <SearchBar searchCallBack={searchCallBack} extendedSearchCallBack={extendedSearchCallBack} setParentText={setText} />
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
})
  

export default Search