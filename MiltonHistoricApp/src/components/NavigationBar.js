import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Map from './tabs/Map'
import Stories from './tabs/Story/Stories'
import Discover from './tabs/Discover'
import Tours from './tabs/Tour/Tours'
import Search from './tabs/search/Search'

const Tab = createBottomTabNavigator()

function NavigationBar() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size}) => {
                    let iconName
                    switch (route.name) {
                        case "Map":
                            iconName = 'map'
                            break
                        case "Stories":
                            iconName = 'book-open'
                            break
                        case "Tours":
                            iconName = 'walking'
                            break
                        case "Search":
                            iconName = 'search'
                            break
                    }
                    return <FontAwesome5 name={iconName} color={color}/>
                }
            })}
            unmountInactiveRoutes={true}
        >
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Stories" component={Stories} />
            <Tab.Screen name="Tours" component={Tours} />
            <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
    )
}
        
export default NavigationBar