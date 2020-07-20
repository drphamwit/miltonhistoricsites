import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { haversine } from '../../../utils/utils'

const StoryItem = ( { item, selectedCallback, userLocation } ) => {
    return (
        <TouchableOpacity style={styles.listItemView} onPress={() => selectedCallback(item.id)}>
            <Image 
                style={styles.listImage}
                source={{uri: item.thumbnail}}
            />
            <View style={styles.text}>
                <Text style={styles.listItemText}>{item.title}</Text>
                <Text style={styles.distanceText}>
                    {haversine(
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