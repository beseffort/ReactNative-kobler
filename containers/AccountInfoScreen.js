import React from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, TextInput, DeviceEventEmitter, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as updateProfileActions from '../actions/updateProfileActions';
import DatePicker from 'react-native-datepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var { height, width } = Dimensions.get('window');

class AccountInfoScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { 
      name: props.profile.profile.name ? props.profile.profile.name : '',
      email: props.profile.profile.email ? props.profile.profile.email : '',
      birthDate: props.profile.profile.birthDate ? (props.profile.profile.birthDate.month + '/' + props.profile.profile.birthDate.day + '/' + props.profile.profile.birthDate.year) : "01/01/1980",
      address_line1: (props.profile.profile.address && props.profile.profile.address.line1) ? props.profile.profile.address.line1 : '',
      address_line2: (props.profile.profile.address && props.profile.profile.address.line2) ? props.profile.profile.address.line2 : '',
      city: (props.profile.profile.address && props.profile.profile.address.city) ? props.profile.profile.address.city : '',
      state: (props.profile.profile.address && props.profile.profile.address.state) ? props.profile.profile.address.state : '',
      zipcode: (props.profile.profile.address && props.profile.profile.address.zipcode) ? props.profile.profile.address.zipcode : '',
      phone: props.profile.profile.phone ? props.profile.profile.phone : '',
      fontLoaded: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('updated props: ', nextProps);
    if((this.props.profile.updateSuccess !== nextProps.profile.updateSuccess) && nextProps.profile.updateSuccess) {
      this._onBackButton();
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  _onSaveButton = () => {
    const { name, email, phone, address_line1, address_line2, city, state, zipcode, birthDate } = this.state;
    const user_token = this.props.user.token;
    const countryInfo = this.props.user.user.address.country ? this.props.user.user.address.country : '';
    const address = {
      line1: address_line1,
      line2: address_line2,
      city: city,
      state: state,
      zipcode: zipcode,
      country: countryInfo
    };
    var birthday_fields = birthDate.split('/');
    var birthDateObject = {
      day: birthday_fields[1],
      month: birthday_fields[0],
      year: birthday_fields[2]
    };
    this.props.actions.updateProfileRequest(name, email, phone, address, birthDateObject, user_token );
  }

  _onBackButton = () => {
    DeviceEventEmitter.emit('renderListener', {});
    this.props.navigation.goBack();
  }

  render() {
    const { user, profile } = this.props;
    const { name, email, birthDate, address_line1, address_line2, city, state, zipcode, phone } = this.state;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <TouchableOpacity style={styles.closeButton} onPress={this._onBackButton}>
            <Image style={{width:11, height:18}} source={require('../assets/back-arrow.png')} />
          </TouchableOpacity>
          {
            this.state.fontLoaded ? (
              <Text style={styles.title}>Account information</Text>
            ) : null            
          }
        </View>
        <View style={{backgroundColor:'white', borderRadius:9, flexDirection:'column', marginLeft:10, marginRight:10, height:504, marginBottom:10, paddingLeft:2}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Name:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(name) => this.setState({name})}
                value={name}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.inputContainer}>
            <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Email:       {email}</Text>
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Phone:</Text>
              <TextInput
                  style={styles.textInput}
                  keyboardType='phone-pad'
                  onChangeText={(phone) => this.setState({phone})}
                  value={phone}
                  underlineColorAndroid='rgba(0,0,0,0)'
                />                       
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.inputContainer}>
            <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Birthday:</Text>
            <DatePicker
              style={{flex:1, paddingLeft:30}}
              date={this.state.birthDate}
              mode="date"
              format="MM/DD/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  alignItems: 'flex-start',
                  borderWidth: 0,
                }
              }}
              onDateChange={(date) => {this.setState({birthDate: date})}}
            />
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Address line1:</Text>            
              <TextInput
                style={styles.textInput}
                onChangeText={(address_line1) => this.setState({address_line1})}
                value={address_line1}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Address line2:</Text>            
              <TextInput
                style={styles.textInput}
                onChangeText={(address_line2) => this.setState({address_line2})}
                value={address_line2}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>City:</Text>            
              <TextInput
                style={styles.textInput}
                onChangeText={(city) => this.setState({city})}
                value={city}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>State Code:</Text>            
              <TextInput
                style={styles.textInput}
                maxLength={2}
                onChangeText={(state) => this.setState({state})}
                value={state}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Zip Code:</Text>            
              <TextInput
                style={styles.textInput}
                onChangeText={(zipcode) => this.setState({zipcode})}
                value={zipcode}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={{width: width-30, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, height: 50,}}>
            <Text style={{color:'rgba(155,155,155,1)', fontFamily:'roboto', fontSize:16, fontWeight:'300'}}>Country:  United States</Text>
          </View>
        </View>
        {
          (profile.errorMessage != '') ? (
            <Text style={{marginTop:10, color:'#FF9EAA', fontSize:18, textAlign:'center'}}>{profile.errorMessage}</Text>
          ) : null
        }
        {
          this.state.fontLoaded ? (
            <View style={{flex:1, alignItems:'center', justifyContent:'center', marginTop:15,}}>
              <TouchableOpacity style={styles.button1} onPress={this._onSaveButton}>
                <Text style={{fontFamily: 'roboto', fontSize:16, color:'#4A4A4A', backgroundColor:'transparent'}}>Save</Text>              
              </TouchableOpacity>
            </View>
          ) : null
        }
        <ActivityIndicator animating={profile.isFetching} size='large' style={profile.isFetching && {position:'absolute', top:height/2-50, left:width/2-50, borderRadius:10, backgroundColor: 'rgba(0,0,0,0.8)', width:100, height:100}}/>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    height: 750,
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
    marginBottom:30,
  },
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
    actions: bindActionCreators(updateProfileActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoScreen);