import React from 'react'
import { View, Text} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const Map = () => {

  return (
    <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1, height: '100%'}}
        region={{
          latitude: 42.2495,
          longitude: -71.0662,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }}
      >
      </MapView>
  )
}
      
  
export default Map