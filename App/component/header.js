

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, Icon } from 'native-base';

import { ActionCreators } from '../redux/action';
import { dySize, getFontSize } from '../lib/responsive';
import * as Color from '../lib/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  icon: {
    padding: dySize(15),
    fontSize: getFontSize(20),
  },
  topText: {
    fontSize: getFontSize(18),
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  header: {
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 0,
    elevation: 0,
    height: dySize(70),
  },
});

export class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static propTypes = {
    onPressLeft: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
  }

  static defaultProps = {
    backgroundColor: Color.white,
    color: Color.text,
  }

  componentDidMount() {

  }

  render() {
    const { backgroundColor, color } = this.props;
    return (
      <Header style={[styles.header, { backgroundColor }]}>
        <TouchableOpacity onPress={() => this.props.onPressLeft()}>
          <Icon name={this.props.icon} style={[styles.icon, { color }]} />
        </TouchableOpacity>
        <Text style={[styles.topText, { color }]}>{this.props.title}</Text>
      </Header>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => ({
  userInfo: state.userInfo,
}), mapDispatchToProps)(CustomHeader);
