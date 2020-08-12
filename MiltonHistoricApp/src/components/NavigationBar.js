import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Map from './tabs/Map'
import Stories from './tabs/Story/Stories'
import Discover from './tabs/Discover'
import Tours from './tabs/Tour/Tours'
import Search from './tabs/search/Search'

const Tab = createBottomTabNavigator()

//  TODO    Uncomment when working on Discover Tab
const NavigationBar = ({ setTitle }) => {
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
                        /*
                        case "Discover":
                            iconName = 'compass'
                            break
                        */
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
            <Tab.Screen name="Map" component={Map} listeners={{
                focus: e => {
                    setTitle('Map')
                }
            }}/>
            <Tab.Screen name="Stories" component={Stories} listeners={{
                focus: e => {
                    setTitle('Stories')
                }
            }}/>
            {/*<Tab.Screen name="Discover" component={Discover} />*/}
            <Tab.Screen name="Tours" component={Tours} listeners={{
                focus: e => {
                    setTitle('Tours')
                }
            }}/>
            <Tab.Screen name="Search" component={Search} listeners={{
                focus: e => {
                    setTitle('Search')
                }
            }}/>
        </Tab.Navigator>
    )
}
        
export default NavigationBar