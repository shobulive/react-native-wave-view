import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');
import WaveView from './WaveView';
export default class Example extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WaveView
          height={200}
          width={width}
          waveColor={'red'}
          waveSpeed={'slow'}
          waveAmplitude={20}
          noOfWaves={80}
          wavePosition={'both'}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>My text goes here</Text>
        </WaveView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
