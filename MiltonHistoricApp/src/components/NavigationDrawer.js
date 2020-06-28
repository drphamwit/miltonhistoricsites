import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Map from './tabs/Map'
import Stories from './tabs/Stories'
import Discover from './tabs/Discover'
import Tours from './tabs/Tour/Tours'
import Search from './tabs/Search'
import { NavigationContainer } from '@react-navigation/native'

const Drawer = createDrawerNavigator()

const NavigationDrawer = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Map" component={Map} />
                <Drawer.Screen name="Stories" component={Stories} />
                <Drawer.Screen name="Discover" component={Discover} />
                <Drawer.Screen name="Tours" component={Tours} />
                <Drawer.Screen name="Search" component={Search} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default NavigationDrawer
