

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeviceInfo from 'react-native-device-info';

import NavigatorService from '../../service/navigator';
import { ActionCreators } from '../../redux/action';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const param = {
      uuid: DeviceInfo.getUniqueID(),
      source: Platform.OS,
      version: '1.0',
    };
    NavigatorService.setContainer(this.props.navigation);
    this.props.login(param);
  }

  render() {
    if (this.state.isNew) {
      return (
        <View style={styles.container} />
      );
    }
    return null;
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => ({
  userInfo: state.userInfo,
}), mapDispatchToProps)(Splash);
