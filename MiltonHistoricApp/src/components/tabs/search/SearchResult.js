import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import StoryDisplay from '../Story/StoryDisplay'
import TourDisplay from '../Tour/TourDisplay'
import LoadingIcon from '../../misc/LoadingIcon'
import api from '../../../utils/api'
import BackButton from '../../misc/BackButton'

const Tab = createMaterialTopTabNavigator()

const TourDisplayWrapper = ({ items, selectedCallBack, userLocation }) => {
    const [loading, setLoading] = useState(false)
    const [tours, setTours] = useState([])

    useEffect(() => {
        multipleRequest()
    }, [items])

    const multipleRequest = () => {
        const itemId = items.map(tour => tour.id)
        let promises = []
        for (let i = 0; i < itemId.length; i++) {
            promises.push(api.getTour(itemId[i]))
        }

        Promise.all(promises)
        .then(results => {
            setTours(results)
            setLoading(false)
        })
    }

    if (loading) {
        return <LoadingIcon />
    }

    return (
        <TourDisplay items={tours} selectedCallBack={selectedCallBack} userLocation={userLocation} />
    )
}

const StoryDisplayWrapper = ({ items, selectedCallBack, userLocation }) => {
    const [loading, setLoading] = useState(false)
    const [stories, setStories] = useState([])
    
    useEffect(() => {
        multipleRequest()
    }, [items])

    const multipleRequest = () => {
        const itemId = items.map(story => story.id)
        let promises = []
        for (let i = 0; i < itemId.length; i++) {
            promises.push(api.getStory(itemId[i]))
        }

        Promise.all(promises)
        .then(results => {
            setStories(results)
            setLoading(false)
        })
    }

    if (loading) {
        return <LoadingIcon />
    }

    return (
        <StoryDisplay items={stories} selectedCallback={selectedCallBack} userLocation={userLocation}/>
    )
}
const SearchResult = ({ navigation,route }) => {
    const [stories,setStories] = useState([])
    const [tours, setTours] = useState([])
    const [location,setLocation] = useState([])

    useEffect(() => {
        if (route.params?.stories) {
            setStories(route.params?.stories)
        }
        if (route.params?.tours) {
            setTours(route.params?.tours)
        }
        setLocation({ latitude: 0, longitude: 0})
    }, [route.params])

    const storySelectedCallBack = (story) => {
        navigation.navigate('Stories', { screen: 'SingleStory', params: { id: story.id}})
    }

    const tourSelectedCallBack = (tour) => {
        navigation.navigate('Tours', { screen: 'tourSingle', params: { tour: tour}})
    }
    
    return (
        <View style={{flex: 1}}>
            <BackButton backCallBack={() => navigation.pop()}/>
            <Tab.Navigator>
            <Tab.Screen name="Stories">
                {() => <StoryDisplayWrapper items={stories} selectedCallBack={storySelectedCallBack} userLocation={location} />}
            </Tab.Screen>
            <Tab.Screen name="Tours">
                {() => <TourDisplayWrapper items={tours} selectedCallBack={tourSelectedCallBack} userLocation={location} />}
            </Tab.Screen>
            </Tab.Navigator>
        </View>
    )
}

export default SearchResult