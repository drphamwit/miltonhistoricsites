import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Geolocation from '@react-native-community/geolocation'
import LoadingIcon from '../../misc/LoadingIcon'
import BackButton from '../../misc/BackButton'
import TourMarker from './TourMarker'
import api from '../../../utils/api'

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

const Location = ({ navigation, item, length, index }) => (
    <View style={styles.story}>
        <ConnectedLine number={index+1} length={length}/>
        <View style={styles.content}>
            <TouchableOpacity onPress={() => navigation.navigate('Stories', { screen: 'SingleStory', params: { id: item.id }})}>
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
            <Text style={styles.storyDescription}>{item.description.split(' ').slice(0,30).join(' ')} ...</Text>
        </View>
    </View> 
)

//  TODO Figure out the best way to aggregate full story descriptions from API
const SingleTour = ({ navigation, route }) => {
    const [tour, setTour] = useState({})
    const [stories, setStories] = useState([])
	const [isFetching, setIsFetching] = useState(true)
    const [currentPosition, setCurrentPosition] = useState({})
    
    useEffect(() => {
        if (route.params?.tour) {
					setTour(route.params?.tour)
				}
				if (tour.items) {
					multipleRequest()
				}
				Geolocation.getCurrentPosition(location => {
					setCurrentPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude})
				})
		}, [tour])
		
		const multipleRequest = () => {
			const items = tour.items.map(story => story.id)
			let promises = []
			for (let i = 0; i < items.length; i++) {
				promises.push(api.getStory(items[i]))
			}

			Promise.all(promises)
			.then(results => {
				setStories(results)
				setIsFetching(false)
			})
		}

    return (isFetching) ? <LoadingIcon />
    : (
        <ScrollView>
          <BackButton backCallBack={() => {navigation.navigate("tourList")}}/>
          <MapView 
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
              latitudeDelta: 0.3,
              longitudeDelta: 0.035
            }}
            showsUserLocation={true}
          >
             {stories.map(story => <TourMarker key={story.id} story={story} navigation={navigation}/>)} 
          </MapView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{tour.title}</Text>
            <Text style={styles.creator}>Curated by {tour.creator}</Text>
          </View>
          <Text style={styles.description}>{tour.description.replace(/(<([^>]+)>)/ig, '')}</Text>
          <View style={styles.location}>
              <Text style={styles.header} >Locations for Tour</Text>
              <View style={styles.horizLine} />
              {stories.map((item, index) => <Location navigation={navigation} key={item.id} index={index} item={item} length={tour.items.length} />)}
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
				flexDirection: 'row',
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
    map: {
        padding: 70,
        width: width,
        aspectRatio: 1.5
    },
    creator: {
        paddingTop: 15
		},
		storyDescription: {
			flex: 1,
			flexWrap: 'wrap',
			paddingTop: 5,
			maxWidth: 250
			
		}
})

export default SingleTour