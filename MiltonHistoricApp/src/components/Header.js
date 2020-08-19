import React from 'react';
import { Colors, Typography } from '../styles/index'
import {SafeAreaView, Text, StyleSheet, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native'

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
    height: 100,
    padding: 15,
    backgroundColor: Colors.BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: Typography.TITLE,
    marginLeft: '5%',
  },
  AndroidHeader: {
    flex: 0.1,
  },
  IosHeader: {
    flex: 0.07
  }
});

export default Header;