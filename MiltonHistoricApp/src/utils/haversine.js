
/*
 *  Function to compute the distance between two latitude and longitude points
 *  Source: https://en.wikipedia.org/wiki/Haversine_formula
 */ 

export default haversine = (lat1, lon1, lat2, lon2) => {
    var R = 3958.8
    var dLat = deg2rad(lat2 - lat1)
    var dLon = deg2rad(lon2 - lon1)
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c).toFixed(2)
}

//  Helper function to convert degrees to radians
const deg2rad = d => d * (Math.PI/180)
