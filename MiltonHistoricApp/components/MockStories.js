
import React, { useState, useEffect } from 'react';
import { View } from 'react-native'
import StoryDisplay from './tabs/Story/StoryDisplay';

const MockStories = () => {
    const [items, setItems] = useState([])
  
    useEffect(() => {
      axios
      .get('http://miltonhistoricsites.org/items/browse?output=mobile-json')
      .then(response => {
        setItems(response.data)
      })
      .catch(error => console.log(error))
    }, [])

    return (
        <View>
            <StoryDisplay items={items} />
        </View>
        
    )
}

export default MockStories