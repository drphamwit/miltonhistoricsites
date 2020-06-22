import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

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
    backgroundColor: 'darkslateblue',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    paddingTop: 40,
    paddingLeft: 50,
    fontSize: 23,
    textAlign: 'left',
  },
});

export default Header;