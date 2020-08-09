import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './NavigationBar'
import Header from './Header'

const App = () => {
  return (
      <NavigationContainer style={styles.container}>
        <Header title={"Milton Historic Sites"} />
        <View style={{flex: 10}}>
          <NavigationBar />
        </View>
        
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})