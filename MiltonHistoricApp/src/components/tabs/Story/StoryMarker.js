import React from 'react'
import { Text, Image } from 'react-native'
import { Marker, Callout } from 'react-native-maps'

const StoryMarker = ({ story }) => (
    <Marker
      coordinate={{ latitude: story.latitude, longitude: story.longitude}}
    >
      <Callout>
        <Text style={{marginTop: 5}}>
            <Image 
                source={{uri: story.thumbnail}} 
                style={{width: 200, height: 100, padding: 10}} 
            />
        </Text>
        <Text>{story.title}</Text>
      </Callout>
    </Marker>
)

export default StoryMarker