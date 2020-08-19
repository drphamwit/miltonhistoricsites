import React from 'react'
import { Text, Image, StyleSheet} from 'react-native'
import { Marker, Callout } from 'react-native-maps'

const StoryMarker = ({ story, navigation }) => (
    <Marker
      coordinate={{ latitude: story.latitude, longitude: story.longitude}}
    >
      <Callout onPress={() => navigation.navigate('Stories', { screen: 'SingleStory', params: { id: story.id }})}>
          <Text style={styles.text}>
            <Image 
                source={{uri: story.thumbnail}} 
                style={styles.image} 
            />
          </Text>
        <Text>{story.title}</Text>
      </Callout>
    </Marker>
)

const styles = StyleSheet.create({
  image: {
    width: 200, 
    height: 100, 
    padding: 10
  },
  text: {
    marginTop: 5
  }
})

export default StoryMarker