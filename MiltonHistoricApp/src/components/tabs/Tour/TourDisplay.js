import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { TouchableOpaciy, TouchableOpacity } from 'react-native-gesture-handler'

const getSubDescr = description => description.substring(0,description.indexOf("<br>"))

const TourItem = ({ tour, selectedCallback }) => (
    <TouchableOpacity style={styles.container} onPress={() => selectedCallback(tour)}>
        <Text style={styles.title}>{tour.title}</Text>
        <Text>{tour.items.length} Locations - Curated by {tour.creator}</Text>
        <Text style={styles.description}>{getSubDescr(tour.description)}</Text>
    </TouchableOpacity>
)

const TourDisplay = ( { items, selectedCallback } )  => {
    return (
      <FlatList data={items}
        renderItem={({item}) => <TourItem tour={item} selectedCallback={selectedCallback} />}
        keyExtractor={item => item.id.toString()}
      />
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "white"
    },
    title: {
        color: '#1EAEDB',
        padding: 3,
        fontSize: 20
    },
    description: {
        marginTop: 5,
        marginRight: 20,
        marginLeft: 20,
    }
})

export default TourDisplay