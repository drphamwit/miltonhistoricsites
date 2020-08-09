import React from 'react';
import {SafeAreaView, Text, StyleSheet, StatusBar, Platform, View } from 'react-native';

const Header = ({title}) => {
  if (Platform.OS == 'android') {
    StatusBar.currentHeight
    console.log(StatusBar.currentHeight)
    
  }

  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 0,
    backgroundColor: 'darkslateblue',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    marginTop: 24,
    paddingLeft: 50,
    fontSize: 23,
    textAlign: 'left',
  },
});

export default Header;