import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Typography, Colors } from '../../../styles'

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
        color: Colors.LINK_COLOR,
        padding: 3,
        fontSize: Typography.TITLE
    },
    description: {
        marginTop: 5,
        marginRight: 20,
        marginLeft: 20,
    }
})

export default TourDisplay