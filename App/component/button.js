

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import * as Color from '../lib/color';
import { dySize } from '../lib/responsive';

export default class CustomButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  static defaultProps = {
    style: null,
  }

  render() {
    const buttonStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      width: dySize(300),
      height: dySize(40),
    };
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <LinearGradient
          style={[buttonStyle, this.props.style]}
          colors={[Color.buttonDarkBlue, Color.buttonLightBlue]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 0.0 }}
        >
          {this.props.children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
