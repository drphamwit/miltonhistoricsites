
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

export const sortByDate = (items) => {

    const sorted = items.sort((a,b) => {
        const d1 = new Date(a.modified)
        const d2 = new Date(b.modified)
        
        return d2 - d1
    })

    return sorted
}

export const sortByDistance = (items, location) => (
    items.sort((a,b) => {
        const h1 = haversine(a.latitude, a.longitude, location.latitude, location.longitude)
        const h2 = haversine(b.latitude, b.longitude, location.latitude, location.latitude)

        return (h1 - h2)
    })
)

//  Helper function to convert degrees to radians
const deg2rad = d => d * (Math.PI/180)
