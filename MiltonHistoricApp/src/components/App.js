import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './NavigationBar'
import Header from './Header'
import { Common } from '../styles/index'

const App = () => {
  const [title, setTitle] = React.useState('Map')
  return (
      <NavigationContainer style={Common.container}>
        <Header title={title} />
        <View style={styles.mainContainer}>
          <NavigationBar setTitle={setTitle}/>
        </View>
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.93
  }
})
