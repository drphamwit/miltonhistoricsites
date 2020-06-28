import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LoadingIcon from '../../misc/LoadingIcon'
import BackButton from '../../misc/BackButton'
import api from '../../../utils/api'
import Tours from './Tours'

const width = Dimensions.get('window').width

const Circle = ({ number }) => <View style={styles.circle}><Text>{number}</Text></View>

const Line = () => <View style={styles.vertLine} />

const ConnectedLine = ({ number, length }) => {
    return (
        <View style={styles.container}>
            <Circle number={number} />
            {(number != length) ? <Line /> : null}
        </View>)
}

const Location = ({ item, length, index }) => (
    <View style={styles.story}>
        <ConnectedLine number={index+1} length={length}/>
        <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    </View> 
)

//  TODO Figure out the best way to aggregate full story descriptions from API
//  TODO Replace Image with a Geolocation Map
const SingleTour = ({ tour, backCallback }) => {
    const [stories, setStories] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        api.getAllStories().then(response => {
            setStories(response.items)
            setIsFetching(false)
        })
    })


    return (isFetching) ? <LoadingIcon />
    : (
        <ScrollView>
          <BackButton backCallBack={backCallback}/>
          <Image style={styles.image} source={{uri: tour.tour_img}} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{tour.title}</Text>
            <Text style={styles.creator}>Curated by {tour.creator}</Text>
          </View>
          <Text style={styles.description}>{tour.description.replace(/(<([^>]+)>)/ig, '')}</Text>
          <View style={styles.location}>
              <Text style={styles.header} >Locations for Tour</Text>
              <View style={styles.horizLine} />
              {stories.map((item, index) => <Location key={item.id} index={index} item={item} length={tour.items.length} />)}
          </View>  
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    location: {
        padding: 15
    },
    circle: {
        borderWidth: 6,
        borderColor: 'lightgray',
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        justifyContent: "center",
        alignItems: "center"

    },
    vertLine: {
        borderLeftWidth: 6,
        height: 100,
        borderColor: 'lightgray'
    },
    horizLine: {
        borderBottomColor: '#1EAEDB',
        marginBottom: 10,
        borderBottomWidth: 2
    },
    container: {
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        color: '#1EAEDB'
    },
    story: {
        flex: 1,
        flexDirection: 'row'
    },
    content: {
        paddingTop: 20,
        paddingLeft: 30
    },
    description: {
        margin: 20
    },
    header: {
        fontSize: 16,
        paddingBottom: 10,
    },
    titleContainer: {
        paddingTop: 15,
        alignItems: "center"
    },
    image: {
        padding: 70,
        width: width,
        aspectRatio: 1.5
    },
    creator: {
        paddingTop: 15
    }
})

export default SingleTour