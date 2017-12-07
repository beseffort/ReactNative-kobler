import React from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signupActions from '../actions/signupActions';
import * as resetUserActions from '../actions/resetUserActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import RNDeviceToken from 'react-native-device-token';

var { height, width } = Dimensions.get('window');

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Signup',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      email: '', 
      password: '',
      password1: '',
      phone: '',
      inviteCode: '',
      zipcode: '',
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

  _onSignupButton = () => {
    const { name, email, password, phone, inviteCode, zipcode, deviceToken } = this.state;
    if(password != this.state.password1) {
      this.setState({password:'', password1:''});
    }
    else {
      this.props.actions.signupRequest(name, email, password, phone, zipcode, inviteCode, deviceToken);
    }
  }

  _onCloseButton = () => {
    this.props.actions.resetUserRequest();
    this.props.navigation.goBack();
  }

  render() {
    const { name, email, password, password1, phone, inviteCode, zipcode } = this.state;
    const { user } = this.props;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          {
            this.state.fontLoaded ? (
              <Text style={styles.title}>Apply to Koblers</Text>
            ) : null            
          }
          <TouchableOpacity style={styles.closeButton} onPress={this._onCloseButton}>
            <Image style={{width:18, height:18}} source={require('../assets/close_icon.png')} />
          </TouchableOpacity>
        </View>
        
          <View style={styles.inputContainer}>
            <TextInput
              style={{flex:1, height:64}}
              onChangeText={(name) => this.setState({name})}
              value={name}
              placeholder='Full name'
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={{flex:1, height:64}}
              onChangeText={(zipcode) => this.setState({zipcode})}
              value={zipcode}
              placeholder='Zip Code'
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>
        
          <View style={styles.inputContainer}>
            <TextInput
              style={{flex:1, height:64}}
              onChangeText={(email) => this.setState({email})}
              value={email}
              keyboardType='email-address'
              placeholder='Email address'
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>
        
          <View style={styles.inputContainer}>
            <TextInput
              style={{flex:1, height:64}}
              onChangeText={(password) => this.setState({password})}
              value={password}
              secureTextEntry={true}
              placeholder='Password'
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>
        
          <View style={styles.inputContainer}>
            <TextInput
              style={{flex:1, height:64}}
              onChangeText={(password1) => this.setState({password1})}
              value={password1}
              secureTextEntry={true}
              placeholder='Repeat password'
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>        
        
          <View style={styles.inputContainer}>
            <TextInput
              style={{flex:1, height:64}}
              onChangeText={(inviteCode) => this.setState({inviteCode})}
              value={inviteCode}
              placeholder='Invite code (optional)'
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>
        
          <View style={styles.inputContainer}>
            <TextInput
              style={{flex:1, height:64}}
              onChangeText={(phone) => this.setState({phone})}
              value={phone}
              keyboardType='numbers-and-punctuation'
              placeholder='Phone number'
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>       
        {
          this.state.fontLoaded ? (
            <Text style={{fontFamily:'roboto', textAlign:'center', marginTop:15, fontSize:12, color:'white', backgroundColor:'transparent'}}>By signing up I agree to Koble's terms of doing business</Text>
          ) : null
        }
        {
          (user.errorMessage != '') ? (
            <Text style={{marginTop:15, color:'#FF9EAA', fontSize:18, textAlign:'center'}}>{user.errorMessage}</Text>
          ) : null
        }
        {
          this.state.fontLoaded ? (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity style={styles.button1} onPress={this._onSignupButton}>
                <Text style={{fontFamily: 'roboto', fontSize:16, color:'#4A4A4A', backgroundColor:'transparent'}}>Apply to Koblers</Text>              
              </TouchableOpacity>           
            </View>
          ) : null
        }
        <ActivityIndicator animating={user.isFetching} size='large' style={user.isFetching && {position:'absolute', top:height/2-50, left:width/2-50, borderRadius:10, backgroundColor: 'rgba(0,0,0,0.8)', width:100, height:100}}/>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    height: 800,
    flexDirection: 'column',
    paddingTop: 30,
    backgroundColor: 'rgba(46, 46, 46, 1)',
  },

  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'roboto',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    height: 64,
    borderRadius: 9,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  closeButton: {
    position:'absolute',
    right: 20,
    padding: 5,
  },

  button1: {
    alignItems: 'center',
	  justifyContent: 'center',
    backgroundColor: 'white',
    width: 240,
	  height: 64,
	  borderRadius: 100,
    zIndex: 100,
    marginTop: 30,
    marginBottom: 30,
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
    actions: bindActionCreators({...signupActions, ...resetUserActions}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);