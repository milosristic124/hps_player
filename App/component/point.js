

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { points_bg } from '../lib/image';
import { dySize, getFontSize } from '../lib/responsive';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  text: {
    fontSize: getFontSize(20),
    fontWeight: 'bold',
    color: 'white',
  },
});

const timeDelay = 5500;
const countOfVideo2 = 20;
const duration = 6500 + countOfVideo2 * 3000;

export default class CustomPoint extends React.Component {
  static propTypes = {
    point: PropTypes.object.isRequired,
    videoWidth: PropTypes.number.isRequired,
    videoHeight: PropTypes.number.isRequired,
    videoMarginLeft: PropTypes.number.isRequired,
    videoMarginTop: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      fadeInValue: new Animated.Value(0),
    };
  }

  
  componentWillReceiveProps(props) {
    //console.log(props);
    const { point, currentTime } = this.props;
    if (currentTime > timeDelay && currentTime < timeDelay + duration) {
      Animated.timing( // Animate over time
        this.state.fadeInValue, // The animated value to drive
        {
          toValue: 1, // Animate to opacity: 1 (opaque)
          duration: 200, // Make it take a while
        },
      ).start();
    } else {
      Animated.timing( // Animate over time
        this.state.fadeInValue, // The animated value to drive
        {
          toValue: 0, // Animate to opacity: 1 (opaque)
          duration: 200, // Make it take a while
        },
      ).start();
    }
  }

  render() {
    const {
      point, videoWidth, videoHeight, videoMarginLeft, videoMarginTop,
    } = this.props;
    return (
      <Animated.View
        style={{
          position: 'absolute',
          left: point.x/(1920/width),
          top: point.y/(1080/height),
          // left: videoMarginLeft + videoWidth * point.left - dySize(point.height) * 2,
          // top: videoMarginTop + videoHeight * point.top,
          width: dySize(35) * 4,
          height: dySize(35),
          // left: videoMarginLeft + videoWidth * point.left - dySize(point.height) * 2,
          // top: videoMarginTop + videoHeight * point.top,
          // width: dySize(point.height) * 4,
          // height: dySize(point.height),
          zIndex: 50000,
          opacity: this.state.fadeInValue,
        }}
      >
        <View style={styles.content}>
          {/* <Image
            style={{
              position: 'absolute',
              width: dySize(point.height) * 3,
              height: dySize(point.height),
              resizeMode: 'stretch',
            }}
            source={points_bg}
          /> */}
          <Text style={styles.text}>{point.point}</Text>
        </View>
      </Animated.View>
    );
  }
}
