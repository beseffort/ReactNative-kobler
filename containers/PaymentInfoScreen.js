import React from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, TextInput, DeviceEventEmitter, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stripeAccountActions from '../actions/stripeAccountActions';
import * as resetStripeActions from '../actions/resetStripeActions';
import * as initStripeActions from '../actions/initStripeActions';
import * as updateStripeActions from '../actions/updateStripeActions';
import * as uploadPhotoActions from '../actions/uploadPhotoActions';
import ActionSheet from 'react-native-actionsheet';
import { ImagePicker } from 'expo';

var { height, width } = Dimensions.get('window');

class PaymentInfoScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      accountNo: '',
      routingNo: (props.profile.profile.account && props.profile.profile.account.routingNumber) ? props.profile.profile.account.routingNumber : '',
      ssn: '',
      isAutoComplete: props.profile.profile.isAccountComplete ? props.profile.profile.isAccountComplete : false,
      verifyStatus: (props.profile.profile.account && props.profile.profile.account.status) ? props.profile.profile.account.status : '',
      verifyDetail: (props.profile.profile.account && props.profile.profile.account.details) ? props.profile.profile.account.details : '',
      bankName: (props.profile.profile.account && props.profile.profile.account.bankName) ? props.profile.profile.account.bankName : '',
      lastDigits: (props.profile.profile.account && props.profile.profile.account.last4) ? '**** **** **** '+props.profile.profile.account.last4 : '',
      fontLoaded: false,
      reset: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  _onSaveButton = () => {
    const { accountNo, routingNo, ssn, reset } = this.state;
    const user_token = this.props.user.token;
    
    this.props.actions.clearUploadingErrorRequest();

    if(reset) {
      this.props.actions.updateStripeRequest( accountNo, routingNo, ssn, user_token );
    }
    else {
      this.props.actions.createStripeRequest( accountNo, routingNo, ssn, user_token );
    }
  }

  _onAddNewButton = () => {
    this.setState({ reset: true });
    this.props.actions.resetStripeRequest();
  }

  _onBackButton = () => {
    this.setState({ reset: false });
    DeviceEventEmitter.emit('renderListener', {});
    this.props.actions.initStripeRequest();
    this.props.actions.initUploadingRequest();
    this.props.navigation.goBack();
  }

  _onUploadButton = () => {
    if(this.props.stripe.resetSuccess || (this.state.verifyStatus!='verified' && !this.props.stripe.createSuccess && !this.props.stripe.updateSuccess))
      this.ActionSheet.show();
  }

  _handlePress = (i) => {
    if(i==0) {
      this._pickImage().then((result) => {
        if(!result.cancelled && result.uri) {
          const user_token = this.props.user.token;
          this.props.actions.uploadPhotoRequest(user_token, result.uri);
        }
      }).catch(err => {
        console.log(err);
      });
    }
    else if(i==1) {
      this._takePhoto().then((result) => {
        if(!result.cancelled && result.uri) {
          const user_token = this.props.user.token;
          this.props.actions.uploadPhotoRequest(user_token, result.uri);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    console.log(result);

    return result;
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    console.log(result);

    return result;
  };

  render() {
    const { user, profile, stripe, upload } = this.props;
    const { accountNo, routingNo, ssn, isAutoComplete, verifyStatus, bankName, lastDigits, verifyDetail } = this.state;
    const CANCEL_INDEX = 2;
    const options = [ 'Choose a photo', 'Take a photo', 'Cancel' ];

    var loading = (upload.isUploading || stripe.isFetching) ? true : false;

    return (
      <View style={styles.contentContainer}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <TouchableOpacity style={styles.closeButton} onPress={this._onBackButton}>
            <Image style={{width:11, height:18}} source={require('../assets/back-arrow.png')} />
          </TouchableOpacity>
          {
            this.state.fontLoaded ? (
              <Text style={styles.title}>Payment information</Text>
            ) : null            
          }
        </View>
        {
          (isAutoComplete) ? (
            <View>
              <View style={{flexDirection:'row', justifyContent:'center', marginTop:20, marginBottom:10,}}>
                <TouchableOpacity style = {styles.inputContainer1} onPress={this._onUploadButton} >
                  {
                    !stripe.resetSuccess && (verifyStatus==='verified' || stripe.createSuccess || stripe.updateSuccess) ? (
                      <Text style={{fontFamily:'roboto', fontSize:16, color:'rgba(65,117,5,1)', textAlign:'left'}}>ID verified!</Text>
                    ) : (
                      upload.success || (profile.profile.account && profile.profile.account.fileId) ? (
                        <Text style={{fontFamily:'roboto', fontSize:16, color:'rgba(77,77,77,1)', textAlign:'left'}}>File submitted</Text>
                      ) : (
                        <Text style={{fontFamily:'roboto', fontSize:16, color:'rgba(77,77,77,1)', textAlign:'left'}}>Upload your ID or Passport</Text>
                      )
                    )
                  }
                  <Image style={{width:30, height:28, position:'absolute', right:14}} source={require('../assets/camera_icon.png')} />
                </TouchableOpacity>
                <ActionSheet
                  ref={o => this.ActionSheet = o}
                  options={options}
                  cancelButtonIndex={CANCEL_INDEX}
                  onPress={this._handlePress}
                />
              </View>
              {
                !stripe.resetSuccess && (verifyStatus==='verified' || stripe.createSuccess || stripe.updateSuccess) ? (
                  <View style={{backgroundColor:'white', borderRadius:9, flexDirection:'column', marginLeft:10, marginRight:10, height:154, marginBottom:10, paddingLeft:2}}>
                    <View style={styles.inputContainer}>
                      <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Bank name:</Text>
                      <TextInput
                        editable={false}
                        style={styles.textInput}
                        value={stripe.createSuccess ? stripe.account.bankName : bankName}
                        underlineColorAndroid='rgba(0,0,0,0)'
                      />
                    </View>          
                    <View style={styles.inputContainer}>
                      <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Account number:</Text>
                      <TextInput
                        editable={false}
                        style={styles.textInput}
                        value={stripe.createSuccess ? '**** **** **** '+stripe.account.last4 : lastDigits}
                        underlineColorAndroid='rgba(0,0,0,0)'
                      />                       
                    </View>
                    <View style={{width: width-30, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, height: 50,}}>
                      <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Routing number:</Text>            
                      <TextInput
                        editable={false}
                        style={styles.textInput}
                        value={stripe.createSuccess ? stripe.account.routingNumber : routingNo}
                        underlineColorAndroid='rgba(0,0,0,0)'
                      />
                    </View>
                  </View>
                ) : (
                  <View style={{backgroundColor:'white', borderRadius:9, flexDirection:'column', marginLeft:10, marginRight:10, height:154, marginBottom:10, paddingLeft:2}}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View style={styles.inputContainer}>
                        <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Account number:</Text>
                        <TextInput
                          style={styles.textInput}
                          keyboardType='numeric'
                          onChangeText={(accountNo) => this.setState({accountNo})}
                          value={accountNo}
                          underlineColorAndroid='rgba(0,0,0,0)'
                        />
                      </View>     
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>     
                      <View style={styles.inputContainer}>
                        <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Routing number:</Text>
                        <TextInput
                          style={styles.textInput}
                          keyboardType='numeric'
                          onChangeText={(routingNo) => this.setState({routingNo})}
                          value={routingNo}
                          underlineColorAndroid='rgba(0,0,0,0)'
                        />                       
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View style={{width: width-30, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, height: 50,}}>
                        <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>SSN:</Text>            
                        <TextInput
                          style={styles.textInput}
                          keyboardType='numeric'
                          onChangeText={(ssn) => this.setState({ssn})}
                          value={ssn}
                          underlineColorAndroid='rgba(0,0,0,0)'
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                )
              }
              {
                (stripe.errorMessage != '') ? (
                  <Text style={{marginTop:10, color:'#FF9EAA', fontSize:18, textAlign:'center'}}>{stripe.errorMessage}</Text>
                ) : (
                  (upload.errorMessage != '') ? (
                    <Text style={{marginTop:10, color:'#FF9EAA', fontSize:18, textAlign:'center'}}>{upload.errorMessage}</Text>
                  ) : (
                    (verifyDetail != '') ? (
                      <Text style={{marginTop:10, color:'#FF9EAA', fontSize:18, textAlign:'center'}}>{verifyDetail}</Text>
                    ) : null
                  )
                )
              }
              {
                this.state.fontLoaded ? (
                  <View style={{flex:1, alignItems:'center', marginTop:15,}}>
                  {
                    !stripe.resetSuccess && (verifyStatus==='verified' || stripe.createSuccess || stripe.updateSuccess) ? (
                      <TouchableOpacity style={styles.button1} onPress={this._onAddNewButton}>
                        <Text style={{fontFamily: 'roboto', fontSize:16, color:'#4A4A4A', backgroundColor:'transparent'}}>Update information</Text>              
                      </TouchableOpacity>
                    ) : (                        
                      <TouchableOpacity style={styles.button1} onPress={this._onSaveButton}>
                        <Text style={{fontFamily: 'roboto', fontSize:16, color:'#4A4A4A', backgroundColor:'transparent'}}>Save</Text>              
                      </TouchableOpacity>
                    )
                  }
                  </View>
                ) : null
              }
            </View>
          ) : (
            <View style={{flex:1, flexDirection:'column'}}>
              <View style={{flex:7, flexDirection:'column', alignItems:'center'}}>
                <Text style={{fontFamily: 'roboto', fontSize:32, color:'white', textAlign:'center', backgroundColor:'transparent', paddingTop:30}}>Complete your account</Text>
                <Text style={{fontFamily: 'roboto', fontSize:16, textAlign:'center', color:'rgba(255, 255, 255, 0.62)', backgroundColor:'transparent', marginTop:10}}>To add payment information please fill all your details on the Account information page.</Text>
              </View>
              <View style={{flex:3, alignItems:'center',}}>
                <TouchableOpacity style={styles.button1} onPress={this._onBackButton}>
                  <Text style={{fontFamily: 'roboto', fontSize:16, color:'#4A4A4A', backgroundColor:'transparent'}}>Complete account</Text>              
                </TouchableOpacity>
              </View>
            </View>
          )
        }    
        <ActivityIndicator animating={loading} size='large' style={loading && {position:'absolute', top:height/2-50, left:width/2-50, borderRadius:10, backgroundColor: 'rgba(0,0,0,0.8)', width:100, height:100}}/>    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
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
    marginBottom: 20,
    marginTop: 5,
  },

  inputContainer: {
    width: width-20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
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

  textInput: {
    flex: 1,
    height: 50,
    marginLeft: 30,
    fontSize: (width>320) ? 15 : 12
  },

  closeButton: {
    position:'absolute',
    left: 20,
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
  const { user, profile, stripe, upload } = state;

  return {
    user,
    profile,
    stripe,
    upload,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...stripeAccountActions, ...uploadPhotoActions, ...resetStripeActions, ...initStripeActions, ...updateStripeActions}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfoScreen);