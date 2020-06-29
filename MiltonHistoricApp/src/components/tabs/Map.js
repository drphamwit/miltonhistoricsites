import React, { useState, useEffect } from 'react'
import { Text, View, Image} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import api from '../../utils/api'
import LoadingIcon from '../misc/LoadingIcon'


const StoryMarker = ({ story }) => (
  <Marker
    coordinate={{ latitude: story.latitude, longitude: story.longitude}}
  >
    <Callout>
      <Text style={{marginTop: 5}}><Image source={{uri: story.thumbnail}} style={{width: 200, height: 100, padding: 10}} /></Text>
      <Text>{story.title}</Text>
    </Callout>
  </Marker>
)

const Map = () => {
  const [loading, setLoading] = useState(true)
  const [stories, setStories] = useState([])

  useEffect(() => {
    api.getAllStories().then(response => {
      console.log(response.items[1])
      setStories(response.items)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (<LoadingIcon />)
  }

  return (
    <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1, height: '100%'}}
        region={{
          latitude: 42.2495,
          longitude: -71.0662,
          latitudeDelta: 0.3,
          longitudeDelta: 0.035
        }}
      >
        {stories.map(story => <StoryMarker key={story.title} story={story} />)}
      </MapView>
  )
}
      
  
export default Map