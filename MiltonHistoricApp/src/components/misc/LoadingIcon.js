import React from 'react'
import { View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const LoadingIcon = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <FontAwesome5Icon name="spinner"/>
    </View>
)

export default LoadingIcon