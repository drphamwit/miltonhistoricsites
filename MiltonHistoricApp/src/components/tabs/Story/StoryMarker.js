import React from 'react'
import { Text, Image, View } from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler'

const StoryMarker = ({ story, navigation }) => (
    <Marker
      coordinate={{ latitude: story.latitude, longitude: story.longitude}}
    >
      <Callout onPress={() => navigation.navigate('Stories', { story: story, location: {latitude: story.latitude, longitude: story.longitude}})}>
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