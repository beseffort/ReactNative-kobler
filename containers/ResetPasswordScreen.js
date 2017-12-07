import React from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resetPasswordActions from '../actions/resetPasswordActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var { height, width } = Dimensions.get('window');

class ResetPasswordScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: props.navigation.state.params.email,
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  _onResetButton = () => {
    const { email } = this.state;
    this.props.actions.resetPasswordRequest(email);
  }

  _onCloseButton = () => {
    this.props.actions.initPasswordRequest();
    this.props.navigation.goBack();
  }

  render() {
    const { email } = this.state;
    const { password } = this.props;
    
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{flex:2, flexDirection:'column'}}>
          <View style={{flex:1, flexDirection:'row'}}>
            <TouchableOpacity style={styles.closeButton} onPress={this._onCloseButton}>
              <Image style={{width:18, height:18}} source={require('../assets/close_icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex:9, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontFamily: 'roboto', fontSize:32, color:'white', textAlign:'center', backgroundColor:'transparent'}}>Reset password</Text>
          </View>
        </View>
        <View style={{flex:3, flexDirection:'column'}}>  
          <View style={{flex:3, alignItems:'center'}}>
          {
            !(password.emailSent) ? (             
              <View style={styles.inputContainer}>
                <TextInput
                  style={{flex:1, height:64}}
                  onChangeText={(email) => this.setState({email})}
                  value={email}
                  keyboardType='email-address'
                  placeholder='Enter your email'
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
              </View>
            ) : (
              <Text style={{fontFamily: 'roboto', fontSize:16, textAlign:'center', color:'rgba(255, 255, 255, 0.62)', backgroundColor:'transparent'}}>An email has been sent to you.{"\n"}Follow the steps to reset your password.</Text>
            )
          }
          {
            (password.errorMessage != '') ? (
              <Text style={{marginTop:15, color:'#FF9EAA', fontSize:18, textAlign:'center'}}>{password.errorMessage}</Text>
            ) : null
          }
          </View>
          <View style={{flex:2}}>
            {
              this.state.fontLoaded && !(password.emailSent) ? (
                <View style={{alignItems:'center', justifyContent:'center'}}>
                  <TouchableOpacity style={styles.button1} onPress={this._onResetButton}>
                    <Text style={{fontFamily: 'roboto', fontSize:16, color:'#4A4A4A', backgroundColor:'transparent'}}>Get new password</Text>              
                  </TouchableOpacity>           
                </View>
              ) : null
            }
          </View>
        </View>
        <ActivityIndicator animating={password.isFetching} size='large' style={password.isFetching && {position:'absolute', top:height/2-50, left:width/2-50, borderRadius:10, backgroundColor: 'rgba(0,0,0,0.8)', width:100, height:100}}/>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30, 
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(47, 47, 47, 0.82)',
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
    marginLeft: 10,
    marginRight: 10,
  },

  closeButton: {
    position: 'absolute',
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
  },
});

function mapStateToProps(state) {
  const { password } = state;

  return {
    password,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resetPasswordActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);