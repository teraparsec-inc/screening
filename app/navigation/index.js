


import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from '../screens/Splash';

const AppStack = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

},
  {
    
    initialRouteName: 'Splash',
  },
);





const Routes = createAppContainer(
  createSwitchNavigator({
    App: AppStack,

  }),
);
export default Routes;





















