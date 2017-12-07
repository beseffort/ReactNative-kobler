import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Font } from 'expo';

export default class ValidationScreen extends React.Component {
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

  _onPressButton() {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:2}}>
          <Image style={styles.titleContainer} source={require('../assets/bg-graphic.png')}>
            <Image style={{width:124, height:124}} source={require('../assets/validation.png')}/>
          </Image>
        </View>
        {
          this.state.fontLoaded ? (
            <View style={{flex:3, flexDirection:'column'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={{fontFamily:'roboto', fontSize:24, color:'white', marginBottom:15}}>Your profile has been validated!</Text>
                    <Text style={{fontFamily:'roboto', fontSize:16, color:'rgba(255, 255, 255, 0.62)', textAlign:'center'}}>You are now part of the Koblers. If you have any questions please contact support.</Text>
                </View>
                <View style={{flex:1, alignItems:'center'}}>              
                  <TouchableOpacity style={styles.button2} onPress={this._onPressButton}>
                    <Text style={{fontFamily:'roboto', fontSize:16, color:'#4A4A4A', backgroundColor:'transparent'}}>Continue</Text>           
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
    backgroundColor: 'white',
    width: 240,
		height: 64,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
		zIndex: 100,
  },
});
