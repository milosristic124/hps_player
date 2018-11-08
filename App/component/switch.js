

/* jshint esversion: 6 *//* jshint node: true */
import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-native-switch-pro';

import * as Color from '../lib/color';
import { dySize } from '../lib/responsive';

export default class CustomSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static propTypes = {
    onChangeValue: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Switch
        width={dySize(50)}
        height={dySize(30)}
        value={this.props.value}
        onSyncPress={(val) => this.props.onChangeValue(val)}
        circleColorActive={Color.white}
        circleColorInactive={Color.white}
        backgroundActive={Color.blue}
        backgroundInactive={Color.gray}
      />
    );
  }
}
