import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Dimensions, Button, Text } from 'react-native'
import api from '../../../utils/api'
import separateStoriesAndTours from '../../../utils/separateStoriesAndTours'
import SearchResult from './SearchResult'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import NarrowBy from './NarrowBy'
import { Colors } from '../../../styles/index'

const SearchBar = ({ setParentText, searchCallBack, extendedSearchCallBack }) => {
  const [text, setText] = useState('')
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarContainer2}>
          <FontAwesome5Icon name="search" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search"  
            style={styles.textinput} 
            onChangeText={value => {
              setText(value)
              setParentText(value)
            }}
            onSubmitEditing={keypress => searchCallBack()}
          />
          <FontAwesome5Icon 
            name={visible ? 'chevron-down' : 'chevron-up'} 
            style={styles.extendedSearchToggle} 
            onPress={() => setVisible(!visible)}
          />
        </View>
      </View>
      {visible ?
        <NarrowBy searchCallBack={extendedSearchCallBack}/>
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
      <View style={styles.container}>
        <SearchBar searchCallBack={searchCallBack} extendedSearchCallBack={extendedSearchCallBack} setParentText={setText} />
        <SearchResult tours={tours} stories={stories} navigation={navigation} />
      </View>
    )
}

const styles = StyleSheet.create({
  searchBarContainer: {
    height: 60,
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  searchBarContainer2: {
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20, 
    color: Colors.SEARCH_ICON_COLOR
  },
  extendedSearchToggle: {
    fontSize: 20, 
    position: 'absolute', 
    right: 10, 
    color: Colors.SEARCH_ICON_COLOR 
  },
  textinput: {
    fontSize:20,
    paddingLeft:15, 
    paddingTop: 0, 
    paddingBottom: 0
  },
  container: {
    flex: 1
  }
})
  

export default Search