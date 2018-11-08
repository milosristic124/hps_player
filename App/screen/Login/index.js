

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../redux/action';
import { logo, background } from '../../lib/image';
import { get, dySize, getFontSize } from '../../lib/responsive';
import CustomInput from '../../component/textinput';
import * as Color from '../../lib/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
  },
  logoView: {
    flex: 1.5,
    paddingTop: dySize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    margin: 30,
    resizeMode: 'contain',
    width: get('width'),
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
    backgroundColor: Color.green,
    paddingVertical: 6,
    marginTop: 10,
    borderRadius: 8,
    width: 250,
    height: 40,
    alignItems: 'center',
  },
  loginText: {
    color: Color.white,
    fontSize: 20,
  },
  logoText: {
    margin: 15,
    textAlignVertical: 'bottom',
    fontSize: getFontSize(30),
    color: Color.white,
  },
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientID: '',
    };
  }

  componentDidMount() {
    // this.props.login(1002);
  }

  login() {
    const { clientID } = this.state;
    if (this.isValidate()) {
      this.props.login(clientID);
    }
  }

  isValidate() {
    const { clientID } = this.state;
    if (clientID < 0 || clientID.length === 0) {
      alert('Client ID is required');
      return false;
    }
    return true;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    const { clientID } = this.state;
    return (
        <ImageBackground
            style={styles.container}
            resizeMethod="resize"
            source={background}
        >
          <Content contentContainerStyle={styles.content}>
            <View style={styles.logoView}>
              <Image source={logo} style={styles.logo} />
              <Text style={styles.logoText}>House Point System</Text>
            </View>
            <View style={styles.inputView}>
              <CustomInput
                placeholder="Enter your School ID"
                text={clientID}
                onChange={(text) => this.setState({ clientID: text })}
                keyboardType="numeric"
                width={250}
              />
              <TouchableOpacity style={styles.loginView} onPress={this.login.bind(this)}>
                <Text style={styles.loginText}>Go</Text>
              </TouchableOpacity>
            </View>
          </Content>
      </ImageBackground>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => ({
  isLoading: state.isLoading,
  tickerText: state.tickerText,
}), mapDispatchToProps)(LoginScreen);
