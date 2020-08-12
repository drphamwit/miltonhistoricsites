import React from 'react'
import { View, StyleSheet } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const LoadingIcon = () => (
    <View style={styles.loading}>
        <FontAwesome5Icon name="spinner"/>
    </View>
)

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: "center", 
        justifyContent: "center"
    }
})

export default LoadingIcon