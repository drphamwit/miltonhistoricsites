import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import LoadingIcon from '../../misc/LoadingIcon'
import BackButton from '../../misc/BackButton'
import TourMarker from './TourMarker'
import api from '../../../utils/api'
import { getUserLocation } from '../../../utils/utils'
import { Typography, Common, Colors } from '../../../styles'

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
                getUserLocation(setCurrentPosition)
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
            style={Common.displayContainer}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: tour.items[0].latitude,
              longitude: tour.items[0].longitude,
              latitudeDelta: 0.3,
              longitudeDelta: 0.035
            }}
            showsUserLocation={true}
          >
             {stories.map(story => <TourMarker key={story.id} story={story} navigation={navigation}/>)} 
          </MapView>
          <View style={Common.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{tour.title}</Text>
            <Text style={styles.creator}>Curated by {tour.creator}</Text>
          </View>
          <Text>{tour.description.replace(/(<([^>]+)>)/ig, '')}</Text>
          <View>
              <Text style={styles.header} >Locations for Tour</Text>
              <View style={styles.horizLine} />
              {stories.map((item, index) => <Location navigation={navigation} key={item.id} index={index} item={item} length={tour.items.length} />)}
          </View>  
          </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    circle: {
        ...Common.circle,
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
    },
    vertLine: {
        borderLeftWidth: 6,
        height: 100,
        borderColor: 'lightgray'
    },
    horizLine: {
        ...Common.horizontalLine,
        borderBottomColor: Colors.LINK_COLOR,
    },
    container: {
        alignItems: "center",
    },
    title: {
        ...Common.title,
        color: Colors.LINK_COLOR,
    },
    story: {
        flex: 1,
		flexDirection: 'row',
    },
    content: {
        paddingTop: 20,
        paddingLeft: 30
    },
    header: {
        fontSize: Typography.REGULAR,
        paddingTop: 10,
        ...Common.horizontalSpacing
    },
    titleContainer: {
        paddingTop: 10,
        ...Common.horizontalSpacing,
        alignItems: "center"
    },
    map: {
        width: width,
        aspectRatio: 1.5
    },
	storyDescription: {
		flex: 1,
		flexWrap: 'wrap',
		paddingTop: 5,
		maxWidth: 250
		}
})

export default SingleTour