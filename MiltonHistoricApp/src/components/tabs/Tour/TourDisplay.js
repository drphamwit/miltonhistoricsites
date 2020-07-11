import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import api from '../../../utils/api'

const getSubDescr = description => description.substring(0,description.indexOf("<br>"))

const TourItem = ({ tour, navigation }) => (
    <TouchableOpacity style={styles.container} onPress={() => navigation.push("tourSingle", { tour: tour})}>
        <Text style={styles.title}>{tour.title}</Text>
        <Text>{tour.items.length} Locations - Curated by {tour.creator}</Text>
        <Text style={styles.description}>{getSubDescr(tour.description)}</Text>
    </TouchableOpacity>
)

const TourDisplay = ( { navigation } )  => {
    const [items, setItems] = useState([])

    useEffect(() => {
        api.getAllTours().then(response => {
            setItems(response.tours)
        })
    }, [])

    return (
      <FlatList data={items}
        renderItem={({item}) => <TourItem tour={item} navigation={navigation} />}
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