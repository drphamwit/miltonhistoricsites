import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import api from '../../utils/api'
import { getUserLocation } from '../../utils/utils'
import LoadingIcon from '../misc/LoadingIcon'
import StoryMarker from './Story/StoryMarker'

const Map = ({ navigation }) => {
  const [loading, setLoading] = useState(true)
  const [stories, setStories] = useState([])
  const [currentPosition, setCurrentPosition] = useState({})
  useEffect(() => {
    api.getAllStories().then(response => {
      setStories(response.items)
      setLoading(false)
    })
    getUserLocation(setCurrentPosition)
  }, [])


  if (loading) {
    return <LoadingIcon />
  }

  return (
    <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.035
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {stories.map(story => <StoryMarker key={story.title} story={story} navigation={navigation} />)}
      </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height:'100%'
  }
})
      
  
export default Map