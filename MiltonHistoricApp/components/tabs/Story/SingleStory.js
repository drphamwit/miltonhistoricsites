import React, { useState, useEffect } from 'react'
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'

const width = Dimensions.get('window').width

const HEADERS = ['Title', 'Subtitle', 'Creator', 'Lede', 'Story']

const SingleStory = ({ item, backCallBack }) => {
    const [content, setContent] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        axios.get(`http://miltonhistoricsites.org/api/items/${item.id}`)
        .then(response => {
            const data = response.data.element_texts
            setContent(data.map (element => ({header: element.element.name, text: element.text})))
            setIsFetching(false)
        })
        .catch(error => console.log(error))
    }, [])
    console.log(content)
    return (isFetching) ? <Text>Loading</Text>
        : (<ScrollView>
            <View style={{backgroundColor: 'darkslateblue'}}>
            <TouchableOpacity onPress={() => {backCallBack('')}}>
                <FontAwesome5Icon style={{fontSize: 32}} name='arrow-alt-circle-left' color='white'/>
            </TouchableOpacity>
            </View>
            <Image style={styles.image} source={{uri: item.fullsize}} />
            <View style={styles.infoContainer}>
                <Text style={styles.titleText}>{content.find(x => x.header === HEADERS[0]).text}</Text>
                <Text style={styles.subText}>{content.find(x => x.header === HEADERS[1]).text}</Text>
                <Text style={styles.authorText}>By {content.find(x => x.header === HEADERS[2]).text}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.textLede}>{content.find(x => x.header === HEADERS[3]).text}</Text>
                <Text>{content.find(x => x.header === HEADERS[4]).text}</Text>
            </View>
        </ScrollView>)
}

const styles = StyleSheet.create({
    image : {
        padding: 70,
        width: width,
        aspectRatio: 1.5
    },
    infoContainer: {
        backgroundColor: 'black',
    },
    titleText: {
        paddingTop: 5,
        fontSize: 23,
        color: 'white',
        paddingBottom: 10
    },
    subText: {
        color: 'white',
        fontSize: 17,
        paddingBottom: 10

    },
    authorText: {
        color: 'white',
        fontSize: 12,
        paddingBottom: 10
        
    },
    descriptionContainer: {
        backgroundColor: 'white',
        padding: 15
    },
    textLede: {
        paddingBottom: 10,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
})
export default SingleStory