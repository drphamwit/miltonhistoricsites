import React, { useState, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import api from '../../utils/api'
import LoadingIcon from '../misc/LoadingIcon'
import StoryMarker from './Story/StoryMarker'
import Geolocation from '@react-native-community/geolocation'

const Map = () => {
  const [loading, setLoading] = useState(true)
  const [stories, setStories] = useState([])
  const [currentPosition, setCurrentPosition] = useState({ latitude: 42.2495, longitude: -71.0662})

  useEffect(() => {
    api.getAllStories().then(response => {
      setStories(response.items)
      setLoading(false)
    })
    Geolocation.getCurrentPosition(location => {
      setCurrentPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude})
    },
    error => console.log(error)
    )
  }, [])


  if (loading) {
    return <LoadingIcon />
  }

  return (
    <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1, height: '100%'}}
        region={{
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.035
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {stories.map(story => <StoryMarker key={story.title} story={story} />)}
      </MapView>
  )
}
      
  
export default Map