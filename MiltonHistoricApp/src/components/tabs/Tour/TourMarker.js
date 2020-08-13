import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import { Common } from '../../../styles'

const TourMarker = ({ story, navigation }) => {
  return (
		<Marker
			coordinate={{ latitude: story.latitude, longitude: story.longitude}}
    >
      <Callout onPress={() => navigation.navigate('Stories', { screen: 'SingleStory', params: { id: story.id }})}>
        <View style={styles.container}>
        <View style={styles.circle}>
          <Text>
            {story.id}
          </Text>
        </View>
        <View style={styles.calloutInfo}>
            <Text>{story.title}</Text>   
            <Text style={styles.address}>{story.address}</Text> 
        </View>
        </View>
      </Callout>
    </Marker>
  )
}

export default TourMarker

const styles = StyleSheet.create({
    circle: {
        ...Common.circle,
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        
		},
		calloutInfo: {
			marginTop: 10,
			marginLeft: 4
		},
		address: {
			marginTop: 5
		},
		container: {
			flexDirection: 'row'
		}
})