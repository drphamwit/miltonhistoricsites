import geolocation from '@react-native-community/geolocation'
import moment from 'moment'
/*
 *  Function to compute the distance between two latitude and longitude points
 *  Source: https://en.wikipedia.org/wiki/Haversine_formula
 */ 

export const haversine = (lat1, lon1, lat2, lon2) => {
    var R = 3958.8
    var dLat = deg2rad(lat2 - lat1)
    var dLon = deg2rad(lon2 - lon1)
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c).toFixed(2)
}

//  Helper function to convert degrees to radians
const deg2rad = d => d * (Math.PI/180)

export const sortByDate = (items) => {

    const sorted = items.sort((a,b) => {
        const d1 = moment(a.modified)
        const d2 = moment(b.modified)

        return d2.diff(d1)
    })

    return sorted
}

export const sortByDistance = (items, location) => {
    const sorted = items.sort((a,b) => {
        const h1 = haversine(a.latitude, a.longitude, location.latitude, location.longitude)
        const h2 = haversine(b.latitude, b.longitude, location.latitude, location.longitude)

        return h1 - h2
    })

    return sorted
}

//  Function that determines whether the __DEV__ env variable is true. This
//  Flag will be disabled upon building the apps with --configuration Release
export const getUserLocation = (setLocation) => {
    if (__DEV__) {
      setLocation({ latitude: 42.2495, longitude: -71.0662})
    } else {
        geolocation.getCurrentPosition(location => {
            setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude})
        })
   }
}
