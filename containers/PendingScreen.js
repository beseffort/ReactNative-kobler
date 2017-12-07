import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resetUserActions from '../actions/resetUserActions';

class PendingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  _onPressButton = () => {
    this.props.actions.resetUserRequest();
    const { navigate } = this.props.navigation;
    navigate('Intro');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:2}}>
          <Image style={styles.titleContainer} source={require('../assets/bg-graphic.png')}>            
            <Image style={{width:124, height:124}} source={require('../assets/hourglass.png')}/>
          </Image>
        </View>
        {
          this.state.fontLoaded ? (
            <View style={{flex:3, flexDirection:'column'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={{fontFamily:'roboto', fontSize:24, color:'white', marginBottom:15}}>Signup request pending</Text>
                    <Text style={{maxWidth:310, fontFamily:'roboto', fontSize:16, color:'rgba(188, 175, 221, 1)', textAlign:'center'}}>We are reviewing your profile. You will receive an email confirmation within 24 hours. If you have any questions please contact <Text style={{color:'rgba(230,155,84,1)'}}>koblers@koble.com</Text>.</Text>
                </View>
                <View style={{flex:1, alignItems:'center'}}>              
                  <TouchableOpacity style={styles.button2} onPress={this._onPressButton}>
                    <Text style={{fontFamily:'roboto', fontSize:16, color:'white', backgroundColor:'transparent'}}>Got it!</Text>           
                  </TouchableOpacity>
                </View>
            </View>
          ) : null
        }
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
    justifyContent: 'center',
  },

  button2: {
    alignItems: 'center',
	  justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 240,
	  height: 64,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
	  zIndex: 100,
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
    actions: bindActionCreators(resetUserActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingScreen);