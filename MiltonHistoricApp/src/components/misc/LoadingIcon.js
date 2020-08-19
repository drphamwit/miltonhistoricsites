import React from 'react'
import { View, StyleSheet } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Common } from '../../styles'

const LoadingIcon = () => (
    <View style={styles.loading}>
        <FontAwesome5Icon name="spinner"/>
    </View>
)

const styles = StyleSheet.create({
    loading: {
        ...Common.container,
        alignItems: "center", 
        justifyContent: "center"
    }
})

export default LoadingIcon