import React from 'react'
import { View, StyleSheet } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../../styles/index'

const BackButton = ({ backCallBack }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => {backCallBack('')}}>
            <FontAwesome5Icon style={styles.icon} name='arrow-alt-circle-left' color='white'/>
        </TouchableOpacity>
    </View>
)   

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BACKGROUND
    },
    icon: {
        fontSize: 32
    }
})
export default BackButton