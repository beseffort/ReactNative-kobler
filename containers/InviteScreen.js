import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, DeviceEventEmitter, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Share, {ShareSheet, Button} from 'react-native-share';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Communications from 'react-native-communications';

var { height, width } = Dimensions.get('window');

class InviteScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      selectedIndex: 0,
      email: '',
    }
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
      'roboto-thin': require('../assets/fonts/Roboto-Thin.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  _onInviteButton = () => {
    var subject = '', message = '';
    if (this.state.selectedIndex == 1) {
      subject = "Make money today by joining my Kobler's Tribe";
      message = 'Signup to the Kobler’s program by using my code ' + this.props.user.user.code + ' and make $5 for each signup and an extra $85 for each annual pro-upgrade.\nDownload the app now!\nApp Store:\n\nGoogle Play Store:\n';
    }
    else {
      subject = 'Meet your next business on Koble';
      message = 'Meet your next business on Koble and save an extra 17% on Koble’s annual pro-plan by using my invitation coupon code ' + this.props.user.user.code + '.\nSignup here now at http://app.koble.com!';
    }

    if(this.state.email!='') {
      //console.log(message);
      // Share.open({message: message, subject: subject})
      // .catch((err) => {
      //   err && console.log(err);
      // })
      Communications.email([this.state.email],null,null,subject,message);
    }
  }

  _onCloseButton = () => {
    DeviceEventEmitter.emit('goBackListener', {})
    this.props.navigation.goBack();
  }

  options = [
    {
      label: 'New user',
      value: 'user'
    },
    {
      label: 'Kobler',
      value: 'kobler'
    }
  ]

  render() {
    const { user } = this.props;
    const { email } = this.state;

    return (
      <KeyboardAwareScrollView contentContainerStyle={{position:'absolute', left:0, top:0, right:0, bottom:0}}>
      <View style={styles.container}>
        <View style={{flex:4}}>
            <View style={{flex:2, flexDirection:'row'}}>
              <TouchableOpacity style={styles.closeButton} onPress={this._onCloseButton}>
                <Image style={{width:18, height:18}} source={require('../assets/close_icon.png')} />
              </TouchableOpacity>
            </View>
            <View style={{flex:8, justifyContent:'center', alignItems:'center'}}>
            {
              this.state.fontLoaded ? (
                <View>
                  <Text style={styles.label1}>{user.user.name}</Text>
                  <Text style={[styles.amount, {fontSize: (width>320 ? 50 : 40)}]}>{user.user.code}</Text>
                  <Text style={styles.label2}>Your koble code</Text>
                </View>
              ) : null
            }
            </View>
        </View>
        <View style={{flex:6, flexDirection:'column', alignItems:'center'}}>
          <SegmentedControlTab
            values={['New user', 'Kobler']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
            tabsContainerStyle={{marginLeft:60, marginRight:60, borderColor:'rgba(255,255,255,0.13)', borderWidth:1, borderRadius:9, height:48}}
            tabStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
            activeTabStyle={{backgroundColor:'rgba(114,82,189,1)', borderColor:'transparent'}}
            tabTextStyle={{fontFamily: 'roboto', fontSize:16, fontWeight:'300', color:'rgba(155,155,155,1)'}}
            activeTabTextStyle={{fontFamily: 'roboto', fontSize:16, fontWeight:'300', color:'white'}}
          />
          
            <View style={styles.inputContainer}>              
              <TextInput
                style={{flex:1, textAlign:'center', height:64}}
                placeholder='Enter email'
                keyboardType='email-address'
                onChangeText={(email) => this.setState({email})}
                value={email}
                underlineColorAndroid='rgba(0,0,0,0)'
              />            
            </View>          
          <TouchableOpacity style={styles.button} onPress={this._onInviteButton}>
            <Text style={{fontFamily: 'roboto', fontSize:16, color:'rgba(74,74,74,1)', backgroundColor:'transparent'}}>Send invite</Text>           
          </TouchableOpacity>
        </View>        
      </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(46, 46, 46, 1)',
  },

  amount: {
    color: 'white',
    fontFamily: 'roboto-thin',
    fontWeight: '100',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },

  label2: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    fontFamily: 'roboto',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },

  closeButton: {
    position: 'absolute',
    right: 20,
    padding: 5,
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
    marginTop: 40,
  },

  label1: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'roboto',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },

  button: {
    marginTop: 100,
    alignItems: 'center',
	  justifyContent: 'center',
    backgroundColor: 'white',
    width: 240,
	  height: 64,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 100,
  }
});

function mapStateToProps(state) {
  const { user } = state;

  return {
    user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteScreen);