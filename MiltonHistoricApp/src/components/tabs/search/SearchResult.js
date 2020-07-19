import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import StoryDisplay from '../Story/StoryDisplay'
import TourDisplay from '../Tour/TourDisplay'

const Tab = createMaterialTopTabNavigator()

const SearchResult = ({ navigation,route }) => {
    const [stories,setStories] = useState([])
    const [tours, setTours] = useState([])
    const [location,setLocation] = useState([])

    useEffect(() => {
        if (route.params?.stories) {
            setStories(route.params?.stories)
        }
        if (route.params?.id) {
            setTours(route.params?.tours)
        }
        setLocation({ latitude: 0, longitude: 0})
    }, [route.params])

    const storySelectedCallBack = (story) => {
        //navigation.navigate('Stories', { screen: 'SingleStory', params: { id: story.id}})
    }

    const tourSelectedCallBack = (tour) => {
        //navigation.navigate('Tours', { screen: 'tourSingle', params: { tour: tour}})
    }
    
    return (
        <Tab.Navigator>
            <Tab.Screen name="Stories">
                {() => <StoryDisplay items={stories} selectedCallback={storySelectedCallBack}/>}
            </Tab.Screen>
            <Tab.Screen name="Tours">
                {() => <TourDisplay items={tours} selectedCallback={tourSelectedCallBack}/>}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default SearchResult