import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import * as resetUserActions from '../actions/resetUserActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var { height, width } = Dimensions.get('window');

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { 
      email: '', 
      password: '',
      deviceToken: 'test-device-token',
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  _onLoginButton = () => {
    const { email, password, deviceToken } = this.state;
    this.props.actions.loginRequest(email, password, deviceToken);
  }

  _onForgotPassword = () => {
    const { navigate } = this.props.navigation;
    navigate('ResetPassword', {email: this.state.email});
  }

  _onBackButton = () => {
    this.props.actions.resetUserRequest();
    this.props.navigation.goBack();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { email, password } = this.state;
    const { user } = this.props;
    
    return (
      <KeyboardAwareScrollView contentContainerStyle={{position:'absolute', left:0, top:0, right:0, bottom:0}}>
      <View style={styles.container}>
        <View style={{flex:2}}>
          <Image style={styles.titleContainer} source={require('../assets/bg-graphic.png')}>
            <View style={{flex:27}}>
              <TouchableOpacity style={styles.closeButton} onPress={this._onBackButton}>
                <Image style={{width:11, height:18}} source={require('../assets/back-arrow.png')} />
              </TouchableOpacity>
            </View>
            <View style={{flex:13}}>
              {
                this.state.fontLoaded ? (
                  <Text style={styles.title}>Welcome to Kobler!</Text>
                ) : null
              }
            </View>            
            <View style={{flex:10}}/>
          </Image>
        </View>
        <View style={{flex:3, flexDirection:'column'}}>
            <View style={{flex:1}}>              
              <View style={styles.inputContainer}>
                <Image
                  style={styles.icon}
                  source={require('../assets/mail_icon.png')}
                />
                <TextInput
                  style={{flex:1, marginLeft:15, height:64}}
                  onChangeText={(email) => this.setState({email})}
                  value={email}
                  keyboardType='email-address'
                  placeholder='Email'
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Image
                  style={styles.icon}
                  source={require('../assets/lock_icon.png')}
                />
                <TextInput
                  style={{flex:1, marginLeft:15, height:64}}
                  onChangeText={(password) => this.setState({password})}
                  value={password}
                  secureTextEntry={true}
                  placeholder='Password'
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
              </View>
            </View>
            {
              (user.errorMessage != '') ? (
                <Text style={{marginTop:15, color:'#FF9EAA', fontSize:18, textAlign:'center'}}>{user.errorMessage}</Text>
              ) : null
            }
            {
              this.state.fontLoaded ? (
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <TouchableOpacity style={styles.button1} onPress={this._onLoginButton}>
                    <Text style={{fontFamily: 'roboto', fontSize:16, color:'#4A4A4A', backgroundColor:'transparent'}}>Login</Text>              
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._onForgotPassword}>
                    <Text style={{fontFamily: 'roboto', fontSize:16, color:'rgba(255, 255, 255, 0.62)', backgroundColor:'transparent'}}>Forgot password?</Text>              
                  </TouchableOpacity>
                </View>
              ) : null
            }
        </View>
        <ActivityIndicator animating={user.isFetching} size='large' style={user.isFetching && {position:'absolute', top:height/2-50, left:width/2-50, borderRadius:10, backgroundColor: 'rgba(0,0,0,0.8)', width:100, height:100}}/>
      </View>
      </KeyboardAwareScrollView>
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
    paddingTop: 20,
  },

  title: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'roboto',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },

  inputContainer: {
    width: width-20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    height: 64,
    borderRadius: 9,
    marginBottom: 20,
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
  
  closeButton: {
    //position:'absolute',
    marginLeft: (width>320) ? 20 : 35,
    padding: 5,
    width: 30,
  },
});

function mapStateToProps(state) {
  const { user } = state;

  return {
    user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...loginActions, ...resetUserActions}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);