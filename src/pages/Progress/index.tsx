import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Progress: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Progress</Text>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
