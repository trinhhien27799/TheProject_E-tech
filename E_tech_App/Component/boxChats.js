import React from "react";
import { StyleSheet, View, Text } from "react-native";

const BoxChats = ({ route }) => {
    const boolean = route.boolean;
  const containerStyle = [
    styles.container,
    {
      backgroundColor: boolean ?'#0099FF': 'white' ,
      alignSelf: boolean ? 'flex-end': 'flex-start' ,
      
    },
  ];

  return (
    <View style={containerStyle}>
      <Text style={{ flexWrap: 'wrap' }}>
        {route.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius:10
  },
});

export default BoxChats;
