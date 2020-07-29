import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import api from '../../../utils/api'

const getSubDescr = description => description.substring(0,description.indexOf("<br>"))

const TourItem = ({ tour, selectedCallBack}) => (
    <TouchableOpacity style={styles.container} onPress={() => selectedCallBack(tour)}>
        <Text style={styles.title}>{tour.title}</Text>
        <Text>{tour.items.length} Locations - Curated by {tour.creator}</Text>
        <Text style={styles.description}>{getSubDescr(tour.description)}</Text>
    </TouchableOpacity>
)

const TourDisplay = ( { items, selectedCallBack } )  => {
    return (
      <FlatList data={items}
        renderItem={({item}) => <TourItem tour={item} selectedCallBack={selectedCallBack} />}
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