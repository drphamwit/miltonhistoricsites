import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './NavigationBar'
import Header from './Header'
import { Common } from '../styles/index'

const App = () => {
  return (
      <NavigationContainer style={Common.container}>
        <Header title={"Milton Historic Sites"} />
        <NavigationBar />
      </NavigationContainer>
  )
}

export default App