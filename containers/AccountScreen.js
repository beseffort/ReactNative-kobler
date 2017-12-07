import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, DeviceEventEmitter, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as logoutActions from '../actions/logoutActions';
import * as getProfileActions from '../actions/getProfileActions';

var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

var { height, width } = Dimensions.get('window');

class AccountScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    // if((this.props.profile.errorMessage !== nextProps.profile.errorMessage) && (nextProps.profile.errorMessage!=='')) {
    //   MessageBarManager.showAlert({
    //     title: nextProps.profile.errorMessage,
    //     message: '',
    //     alertType: 'error',
    //   });
    // }
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('renderListener', (e)=>{
      console.log('renderListener');
      const { user } = this.props;
      this.props.actions.getProfileRequest(user.token);
    })
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
      'roboto-thin': require('../assets/fonts/Roboto-Thin.ttf'),
    });
    this.setState({ fontLoaded: true });
    //MessageBarManager.registerMessageBar(this.refs.alert11);

    const { user } = this.props;
    this.props.actions.getProfileRequest(user.token);
  }

  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    //MessageBarManager.unregisterMessageBar();
  }

  shouldComponentUpdate() {
    return true;
  }

  _onAccountInfoButton = () => {
    const { navigate } = this.props.navigation;
    if(!this.props.profile.isFetching)
      navigate('AccountInfo');
  }

  _onPaymentInfoButton = () => {
    const { navigate } = this.props.navigation;
    if(!this.props.profile.isFetching)
      navigate('PaymentInfo');
  }

  _onTermsButton = () => {

  }

  _onLogOutButton = (user_token) => {
    console.log('onLogOut: ', user_token);
    this.props.actions.logoutRequest(user_token);
  }

  _onCloseButton = () => {
    DeviceEventEmitter.emit('goBackListener', {})
    this.props.navigation.goBack();
    //const { navigate } = this.props.navigation;
    //navigate('Dashboard');
  }

  render() {
    const { user, profile } = this.props;
    var now = new Date(), current;
    if (now.getMonth() == 11) {
        current = new Date(now.getFullYear() + 1, 0, 1);
    } else {
        current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
    var month_str = '';
    if(current.getMonth()==0)
      month_str = 'Jan';
    else if(current.getMonth()==1)
      month_str = 'Feb';  
    else if(current.getMonth()==2)
      month_str = 'Mar';
    else if(current.getMonth()==3)
      month_str = 'Apr';
    else if(current.getMonth()==4)
      month_str = 'May';
    else if(current.getMonth()==5)
      month_str = 'Jun';
    else if(current.getMonth()==6)
      month_str = 'Jul';
    else if(current.getMonth()==7)
      month_str = 'Aug';
    else if(current.getMonth()==8)
      month_str = 'Sept';
    else if(current.getMonth()==9)
      month_str = 'Oct';
    else if(current.getMonth()==10)
      month_str = 'Nov';
    else if(current.getMonth()==11)
      month_str = 'Dec';

    return (
      <View style={styles.container}>
        <View style={{flex:3}}>
          <View style={{flex:2, flexDirection:'row'}}>
            <TouchableOpacity style={styles.closeButton} onPress={this._onCloseButton}>
              <Image style={{width:18, height:18}} source={require('../assets/close_icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex:8, justifyContent:'center', alignItems:'center'}}>
          {
            this.state.fontLoaded ? (
              <View>
                {
                  (profile.profile.openBalance==0) ? (
                    <Text style={styles.label1}>No payment pending</Text>
                  ) : (
                    <Text style={styles.label1}>Next payment {month_str} 1st, {current.getFullYear()}</Text>
                  )
                }                  
                <Text style={[styles.amount, {fontSize: (width>320 ? 60 : 40)}]}>${profile.profile.openBalance}</Text>
              </View>
            ) : null
          }              
          </View>
        </View>
        <View style={{flex:7, flexDirection:'column', alignItems:'center'}}>
          <View style={styles.inputContainer}>
            <TextInput            
              style={{flex:1}}
              editable = {false}
              placeholder={'Kobler code: ' + user.user.code}
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', marginTop:10}}>
            <TouchableOpacity style = {styles.inputContainer1} onPress={this._onAccountInfoButton}>
              <Text style={{fontFamily:'roboto', fontSize:16, color:'rgba(77,77,77,1)', textAlign:'left'}}>Account information</Text>
              <Image style={{width:11, height:18, position:'absolute', right:14}} source={require('../assets/arrow.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', marginTop:10}}>
            <TouchableOpacity style = {styles.inputContainer1} onPress={this._onPaymentInfoButton}>
              <Text style={{fontFamily:'roboto', fontSize:16, color:'rgba(77,77,77,1)', textAlign:'left'}}>Payment information</Text>
              <Image style={{width:11, height:18, position:'absolute', right:14}} source={require('../assets/arrow.png')} />
            </TouchableOpacity>
          </View>
          {
            this.state.fontLoaded ? (
              <TouchableOpacity onPress={this._onTermsButton}>
                <Text style={styles.message}>Terms and Conditions</Text>
              </TouchableOpacity>  
            ) : null
          }          
          <TouchableOpacity style={styles.button} onPress={() => this._onLogOutButton(user.token)}>
            <Text style={{fontFamily: 'roboto', fontSize:16, color:'white', backgroundColor:'transparent'}}>Log out</Text>           
          </TouchableOpacity>
        </View>
        <ActivityIndicator animating={profile.isFetching} size='large' style={profile.isFetching && {position:'absolute', top:height/2-50, left:width/2-50, borderRadius:10, backgroundColor: 'rgba(0,0,0,0.8)', width:100, height:100}}/>
      </View>
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

  message: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 16,
    fontFamily: 'roboto',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginTop: 25,
    marginBottom: 10,
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
    padding: 10,
    height: 64,
    borderRadius: 9,
    marginLeft: 10,
    marginRight: 10,
  },

  inputContainer1: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    height: 64,
    borderRadius: 9,
    marginLeft: 10,
    marginRight: 10,
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
    alignItems: 'center',
	  justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 240,
	  height: 64,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 100,
  }
});

function mapStateToProps(state) {
  const { user, profile } = state;

  return {
    user,
    profile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...logoutActions, ...getProfileActions}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);