import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../styles/index'

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    padding: 15,
    backgroundColor: Colors.BACKGROUND,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    paddingTop: 40,
    paddingLeft: 50,
    fontSize: Typography.TITLE,
    textAlign: 'left',
  },
});

export default Header;