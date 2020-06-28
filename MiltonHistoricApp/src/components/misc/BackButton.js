import React from 'react'
import { View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BackButton = ({ backCallBack }) => (
    <View style={{backgroundColor: 'darkslateblue'}}>
        <TouchableOpacity onPress={() => {backCallBack('')}}>
            <FontAwesome5Icon style={{fontSize: 32}} name='arrow-alt-circle-left' color='white'/>
        </TouchableOpacity>
    </View>
)   

export default BackButton