import React, { useState, useEffect } from 'react'
import { View, TextInput } from 'react-native'
import api from '../../utils/api'


const SearchBar = ({ searchCallBack }) => {
  const [text, setText] = useState('')

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setText(text)}
        value={text}
        onSubmit={console.log('submitted')}
      />
    </View>
  )
}
const Search = () => {

    const [searchResult, setSearchResult] = useState('')

    const searchCallBack = (queryString) => {
      api.search(queryString)
      .then(response => {
        setSearchResult(response.items)
      })
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SearchBar searchCallBack={searchCallBack}/>
      </View>
    )
}
  

export default Search