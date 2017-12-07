import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Font } from 'expo';
//import * as DeviceInfo from 'react-native-device-info';
//var DeviceInfo = require('react-native-device-info');

// import { Permissions, Notifications } from 'expo';

// async function registerForPushNotificationsAsync() {
  
//   // Get the token that uniquely identifies this device
//   let token = await Notifications.getExpoPushTokenAsync();
//   console.log('TOKEN: ', token);

//   alert(token);
// }

export default class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  componentWillMount() {
    StatusBar.setHidden(true);
    //console.log(DeviceInfo.isEmulator());
    // DeviceInfo.isEmulator() (uuid => {
    //   alert(uuid);
    // });
  }

  async componentDidMount() {
    //registerForPushNotificationsAsync();
    await Font.loadAsync({
      'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });    
  }

  _onPressButton = () => {
    const { navigate } = this.props.navigation;
    navigate('Signup');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{flex:2}}>
          <Image  style={styles.titleContainer} source={require('../assets/bg-graphic.png')} >
            <View style={{flex:12}}/>
            <View style={{flex:11}}>
              <Image style={{width:236}} source={require('../assets/koble-logo.png')}/>
            </View>
          </Image>
        </View>
        <View style={{flex:3, flexDirection:'column'}}>
            <View style={{flex:1}}/>
            {
              this.state.fontLoaded ? (
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <TouchableOpacity style={styles.button1} onPress={this._onPressButton}>
                    <Text style={{fontFamily: 'roboto', fontSize:16, color:'#4A4A4A', backgroundColor:'transparent'}}>Become a Kobler</Text>              
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button2} onPress={() => navigate('LogIn')}>
                    <Text style={{fontFamily: 'roboto', fontSize:16, color:'white', backgroundColor:'transparent'}}>Login</Text>           
                  </TouchableOpacity>
                </View>
              ) : null
            }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(82, 46, 168, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  button1: {
    alignItems: 'center',
	  justifyContent: 'center',
    backgroundColor: 'white',
    width: 240,
	  height: 64,
	  borderRadius: 100,
    zIndex: 100,
    marginBottom:30
  },

  button2: {
    alignItems: 'center',
	  justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 176,
	  height: 48,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
	  zIndex: 100,
  },
});
