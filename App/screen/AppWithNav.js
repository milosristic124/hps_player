import React from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { ActionCreators } from '../redux/action';
import MainNavigator from './AppNavigator';
import NavigatorService from '../service/navigator';
import * as Color from '../lib/color';

class AppWithNavigationState extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}
          onNavigationStateChange={(prevState, currentState, action) => {
            console.log(action);
            const routeName = currentState.routes[currentState.index].routeName;
            this.props.setRouteName(routeName);
          }}
        />
        <Spinner visible={this.props.isLoading} color={Color.gray} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ isLoading: state.isLoading });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
