import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

const StoryItem = ( { item } ) => {
    return (
        <View style={styles.listItemView}>
            <Image 
                style={styles.listImage}
                source={require('./fc60ccf6832d141384f6ebe31bf1c43c.jpg')}
            />
            <View style={styles.text}>
                <Text style={styles.listItemText}>{item.name}</Text>
                <Text style={styles.distanceText}>{item.distance}</Text>
            </View>
            
        </View>
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
export default StoryItem