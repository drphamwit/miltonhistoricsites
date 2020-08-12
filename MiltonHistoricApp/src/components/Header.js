import React from 'react';
import {SafeAreaView, Text, StyleSheet, Platform } from 'react-native';

const Header = ({title}) => {

  const flexStyle = (Platform.OS === 'android') ? styles.AndroidHeader : styles.IosHeader

  const headerStyle = StyleSheet.flatten([styles.header,flexStyle])

  return (
    <SafeAreaView style={headerStyle}>
      <Text style={styles.text}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'darkslateblue',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginLeft: '5%',
    fontSize: 23,
  },
  AndroidHeader: {
    flex: 0.1,
  },
  IosHeader: {
    flex: 0.07
  }
});

export default Header;