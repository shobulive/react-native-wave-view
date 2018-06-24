import React from 'react';
import { View, Animated } from 'react-native';
import PropTypes from 'prop-types';
export default class WaveView extends React.Component {
  waveFactor =
    this.props.wavePosition === 'top' // top wave
      ? 3
      : this.props.wavePosition === 'bottom' // bottom wave
        ? -2
        : 1; // both wave
  speed =
    typeof waveSpeed === 'number'
      ? this.props.waveSpeed
      : this.props.waveSpeed === 'fast'
        ? 500
        : 1000;
  _renderWaves(_val, index) {
    const { height, width, waveColor, waveAmplitude, noOfWaves } = this.props;
    const sineIndex = Math.sin(index);
    const transDistance = new Animated.Value(sineIndex * waveAmplitude);
    const anim = () =>
      Animated.sequence([
        Animated.timing(transDistance, {
          toValue: waveAmplitude,
          duration: this.speed,
          useNativeDriver: true
        }),
        Animated.timing(transDistance, {
          toValue: -waveAmplitude,
          duration: this.speed,
          useNativeDriver: true
        })
      ]).start(() => anim());
    Animated.timing(transDistance, {
      toValue: -waveAmplitude,
      duration: ((sineIndex * waveAmplitude + waveAmplitude) * this.speed) / 10,
      useNativeDriver: true
    }).start(anim);
    return (
      <Animated.View
        key={index}
        style={{
          height: height,
          width: width / noOfWaves,
          top: this.waveFactor * waveAmplitude,
          borderRadius: 50,
          backgroundColor: waveColor,
          transform: [{ translateY: transDistance }]
        }}
      />
    );
  }
  _renderWaves = this._renderWaves.bind(this);
  render() {
    const {
      height,
      width,
      waveColor,
      waveAmplitude,
      noOfWaves,
      wavePosition,
      style
    } = this.props;
    const wave = new Array(noOfWaves).fill(0);
    return (
      <View
        style={{
          height: height + waveAmplitude * 2,
          overflow: 'hidden',
          flexDirection: 'row'
        }}
      >
        {wave.map(this._renderWaves)}
        <View
          style={{
            backgroundColor: waveColor,
            ...style,
            height:
              height -
              waveAmplitude *
                (wavePosition === 'top'
                  ? 2
                  : wavePosition === 'bottom'
                    ? 3
                    : 2),
            width,
            ...(wavePosition === 'top'
              ? { bottom: 0 }
              : wavePosition === 'bottom'
                ? { top: 0 }
                : { top: waveAmplitude * 2 }),
            position: 'absolute'
          }}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}
WaveView.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  waveColor: PropTypes.string,
  waveSpeed: PropTypes.oneOfType([
    PropTypes.oneOf(['fast', 'slow']),
    PropTypes.number
  ]),
  waveAmplitude: PropTypes.number,
  noOfWaves: PropTypes.number,
  wavePosition: PropTypes.oneOf(['top', 'bottom', 'both']),
  style: PropTypes.any
};
WaveView.defaultProps = {
  height: 200,
  width: 376,
  waveColor: 'blue',
  waveSpeed: 'slow',
  waveAmplitude: 10,
  noOfWaves: 100,
  wavePosition: 'both',
  style: {}
};
