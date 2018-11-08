// import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import * as Color from '../lib/color';
import { dySize } from '../lib/responsive';

const styles = StyleSheet.create({
  input: {
    height: 40,
    color: Color.text,
    backgroundColor: Color.white,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginVertical: 10,
    borderRadius: 4,
    borderColor: Color.text,
  },
});

export default class CustomInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    multiline: PropTypes.bool,
    width: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    border: PropTypes.bool,
  }

  static defaultProps = {
    multiline: false,
    width: dySize(250),
    keyboardType: 'default',
    secureTextEntry: false,
    autoCapitalize: 'none',
    border: true,
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      placeholder, text, multiline, width, secureTextEntry, autoCapitalize, keyboardType, border,
    } = this.props;

    if (multiline) {
      return (
        <TextInput
          style={[styles.input, {
              height: 150,
              textAlignVertical: 'top',
              width,
              borderWidth: border ? 0.5 : 0,
          }]}
          autoCapitalize="sentences"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          value={text}
          multiline
          maxLength={1024}
          autoCorrect
          underlineColorAndroid="transparent"
          onChangeText={txt => this.props.onChange(txt)}
        />
      );
    }
    return (
      <TextInput
        style={[styles.input, { width, borderWidth: border ? 0.5 : 0 }]}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={text}
        maxLength={40}
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onChangeText={txt => this.props.onChange(txt)}
      />
    );
  }
}
