import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { Marker, Callout } from 'react-native-maps'

const TourMarker = ({ story, navigation }) => {
  return (
		<Marker
			coordinate={{ latitude: story.latitude, longitude: story.longitude}}
    >
      <Callout onPress={() => navigation.navigate('Stories', { screen: 'SingleStory', params: { id: story.id }})}>
        <View style={{flexDirection: 'row'}}>
        <View style={styles.circle}>
          <Text>
            {story.id}
          </Text>
        </View>
        <View style={styles.calloutInfo}>
            <Text>{story.title}</Text>   
            <Text style={{marginTop: 5}}>{story.address}</Text> 
        </View>
        </View>
      </Callout>
    </Marker>
  )
}

export default TourMarker

const styles = StyleSheet.create({
    circle: {
        borderWidth: 6,
        borderColor: 'lightgray',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        justifyContent: "center",
        alignItems: "center"
		},
		calloutInfo: {
			marginTop: 10,
			marginLeft: 4
		}
})