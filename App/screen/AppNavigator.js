import { StackNavigator } from 'react-navigation';

// import Splash from './Splash';
import LoginScreen from './Login';
import Home from './Home';

const MainNavigator = StackNavigator(
  {
    // splash: { screen: Splash },
    login: { screen: LoginScreen },
    home: { screen: Home },
  },
  {
    headerMode: 'none',
  },
);

export default MainNavigator;
