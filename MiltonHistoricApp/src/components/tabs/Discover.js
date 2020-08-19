import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Common } from '../../styles'

const Discover = () => (
      <View style={styles.container}>
        <Text>Discover</Text>
      </View>
)

const styles = StyleSheet.create({
  container: {
    ...Common.container,
    justifyContent: 'center', 
    alignItems: 'center'
  }
})
  
export default Discover
