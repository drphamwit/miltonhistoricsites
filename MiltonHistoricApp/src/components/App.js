import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './NavigationBar'
import Header from './Header'

const App = () => {
  const [title, setTitle] = React.useState('Mao')
  return (
      <NavigationContainer style={styles.container}>
        <Header title={title} />
        <View style={styles.mainContainer}>
          <NavigationBar setTitle={setTitle}/>
        </View>
        
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  navContainer: {
    flex: 1
  },
  mainContainer: {
    flex: 0.93
  }

})