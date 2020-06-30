import React from 'react'
import { Text, View, StyleSheet, Image, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const deg2rad = d => d * (Math.PI/180)

const getDistanceBetweenLatandLongInMiles = (lat1, lon1, lat2, lon2) => {
    var R = 3958.8
    var dLat = deg2rad(lat2 - lat1)
    var dLon = deg2rad(lon2 - lon1)
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c).toFixed(2)
}

const StoryItem = ( { item, selectedCallback, userLocation } ) => {
    return (
        <TouchableOpacity style={styles.listItemView} onPress={() => selectedCallback(item)}>
            <Image 
                style={styles.listImage}
                source={{uri: item.thumbnail}}
            />
            <View style={styles.text}>
                <Text style={styles.listItemText}>{item.title}</Text>
                <Text style={styles.distanceText}>
                    {getDistanceBetweenLatandLongInMiles(
                        item.latitude, 
                        item.longitude, 
                        userLocation.latitude,
                        userLocation.longitude
                    )} mi
                </Text>
            </View>
            
        </TouchableOpacity>
    )
}

const StoryDisplay = ( { items, selectedCallback, userLocation } )  => {

    return (
      <FlatList data={items}
        renderItem={({item}) => <StoryItem item={item} selectedCallback={selectedCallback} userLocation={userLocation} />}
        keyExtractor={item => item.id.toString()}
      />
    )
}

const styles = StyleSheet.create({
    listItemView: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderColor: '#eee',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemText: {
        fontSize: 12,
        fontWeight: "500"
    },
    distanceText: {
        fontSize: 12,
        paddingTop: 5,
        color: '#808080'
    },
    listImage: {
        width: 65,
        height: 65,
        marginRight: 10
    },
    text: {
        justifyContent: 'flex-start',
        flex: 1
    }
})
export default StoryDisplay