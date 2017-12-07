import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, ListView, ScrollView, DeviceEventEmitter, ActivityIndicator } from 'react-native';
import { List } from 'react-native-elements';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getTotalActions from '../actions/getTotalActions';
import * as getEventsCountActions from '../actions/getEventsCountActions';
import * as getEventsActions from '../actions/getEventsActions';

var { height, width } = Dimensions.get('window');

var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class DashboardScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };  

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      timeIndex: 0,
      timeLabel: 'This month total',
    };
  }
  
  componentWillReceiveProps(nextProps) {   
    if((this.props.total.errorMessage !== nextProps.total.errorMessage) && (nextProps.total.errorMessage!=='')) {
      MessageBarManager.showAlert({
        title: nextProps.total.errorMessage,
        message: '',
        alertType: 'error',
      });
    }
    else if((this.props.events.errorMessage !== nextProps.events.errorMessage) && (nextProps.events.errorMessage!=='')) {
      console.log('event: ', nextProps.events.errorMessage);
      MessageBarManager.showAlert({
        title: nextProps.events.errorMessage,
        message: '',
        alertType: 'error',
      });
    }
  }

  componentWillMount() {
    StatusBar.setHidden(true);
    DeviceEventEmitter.addListener('goBackListener', (e)=>{

      /* Calls API for getting total_value of user */
      const { user } = this.props;
      this.props.actions.getTotalRequest(user.token, 'month');
  
      /* Calls API for getting events list of user */
      this.props.actions.getEventsCountRequest('', user.token);
  
      this.props.actions.getEventsRequest(50, 1, '', 'created', -1, user.token);
    })
  }

  shouldComponentUpdate() {
    return true;
  }

  async componentDidMount() {
    /* Load fonts assets */
    await Font.loadAsync({
      'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
      'roboto-thin': require('../assets/fonts/Roboto-Thin.ttf'),
    });
    this.setState({ fontLoaded: true });

    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }

  _onAddButton = () => {
    const { navigate } = this.props.navigation;
    navigate('Invite');
  }

  _onAccountButton = () => {
    DeviceEventEmitter.emit('renderListener', {})
    const { navigate } = this.props.navigation;
    navigate('Account');
  }

  _onToggleTime = () => {
    const { timeIndex } = this.state;
    const { user } = this.props;

    if(timeIndex==0) {
      this.setState({timeIndex:1, timeLabel:'This year total'});
      this.props.actions.getTotalRequest(user.token, 'year');
    }
    else if(timeIndex==1) {
      this.setState({timeIndex:2, timeLabel:'All time total'});
      this.props.actions.getTotalRequest(user.token, 'all');
    }
    else {
      this.setState({timeIndex:0, timeLabel:'This month total'});
      this.props.actions.getTotalRequest(user.token, 'month');
    }
  }

  renderRow (rowData, sectionID) {
      var { height, width } = Dimensions.get('window');
      return (
        <View style={{flexDirection:'row', alignItems:'center', height:95, justifyContent:'center', borderBottomWidth:1, borderBottomColor:'rgba(225,225,225,1)'}}>
          <View style={{flex:6, flexDirection:'row'}}>
            {
              rowData.avatar_url ? (
                <Image source={{uri: rowData.avatar_url}} style={{marginLeft:10, width:56, height:56, borderRadius:28}} />
              ) : (
                <View style={{backgroundColor:'grey', width:56, height:56, borderRadius:28, marginLeft:10, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:25, fontFamily:'roboto', color:'white', backgroundColor:'transparent'}}>{rowData.name.substring(0,1).toUpperCase()}</Text>
                </View>
              )
            }
            <View style={{marginLeft:10, flexDirection:'column', justifyContent:'center'}}>
              <Text style={{color:'rgba(56,51,60,1)', fontSize:16, fontFamily:'roboto', fontWeight:'300'}}>{rowData.name}</Text>
              <Text style={{marginTop:8, color:'gray', fontSize:13, fontFamily:'roboto'}}>{rowData.subtitle}</Text>
            </View>
          </View>
          <View style={{flex:4, alignItems:'flex-end'}}>
            {
              rowData.seen ? (
                <Text style={{ marginRight:11, color:'rgba(56,51,60,1)', fontSize:(width>320 ? 24 : 18), fontFamily:'roboto', fontWeight:'300'}}>{rowData.right_title}</Text>
              ) : (
                <Text style={{ marginRight:11, color:'rgba(125,212,33,1)', fontSize:(width>320 ? 24 : 18), fontFamily:'roboto', fontWeight:'300'}}>{rowData.right_title}</Text>
              )
            }
          </View>
        </View>
      )
  }

  configureEventList() {
    var oldList = [];

    if(this.props.events.events.length>0) {
      this.props.events.events.map(function(item, index) {
        const item_data = {
          name: item.user.name.full,
          avatar_url: item.user.avatar ? ("https://res.cloudinary.com/spendlead-ga/image/private/t_avatar-xl/" + item.user.avatar.publicId + ".jpg") : "",
          subtitle: item.eventType==='signup' ? ("Signed up " + item.created.split('T')[0]) : ("Upgraded " + item.created.split('T')[0]),
          right_title: "+$" + item.amount,
          seen: item.seen
        }
        oldList.push(item_data);
      });
    }
    
    return oldList;
  }

  render() {
    const { user, total, events, profile } = this.props;
    
    var loading = (events.isFetching || total.isFetching) ? true : false;
    var oldActivity = this.configureEventList();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(oldActivity);

    return (
      <ScrollView contentContainerStyle={[styles.contentContainer, {height: ((oldActivity.length>3) ? (height + (oldActivity.length-3) * 95) : height)}]}>
        <Image style={styles.titleContainer} source={require('../assets/bg-graphic.png')}>
          <View style={{height:35, flexDirection:'row'}}>
            <View style={{flex:(width>320 ? 0.9 : 0.8), flexDirection:'row', justifyContent:'space-between'}}>
              <TouchableOpacity style={styles.button1} onPress={this._onAddButton}>
                <Image style={{width:18, height:18}} source={require('../assets/add.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={this._onAccountButton}>
                <Image style={{width:24, height:24}} source={require('../assets/account.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop:21, height:152, alignItems:'center'}}>
            {
              this.state.fontLoaded ? (
                <View>
                  <Text style={styles.label1}>Available: ${profile.profile.openBalance ? profile.profile.openBalance : user.user.openBalance}</Text>
                  <Text style={[styles.amount, {fontSize: (width>320 ? 60 : 40)}]}>${total.total}</Text>
                  <TouchableOpacity onPress={this._onToggleTime}>
                    <Text style={styles.label2}>{this.state.timeLabel}</Text>
                  </TouchableOpacity>  
                </View>
              ) : null
            }            
          </View>          
        </Image>
        {
          this.state.fontLoaded && (events.count==0) ? (
            <View style={{marginTop:60}}>
              <Text style={styles.message}>There is no activity recorded in this time period</Text>
            </View>
          ) : null
        }
        <View style={{marginTop:-20}}>          
          {
            (events.count>0) && this.state.fontLoaded ? (
              <List style={[styles.activityItemContainer, {width:width-20, height:95*oldActivity.length+2}]}>
                <ListView
                  style={{flex:1, paddingLeft:5, paddingRight:5}}
                  scrollEnabled={false}
                  enableEmptySections={true}
                  renderRow={this.renderRow}
                  dataSource={dataSource}
                />
              </List>
            ) : null
          }
        </View>
        <ActivityIndicator animating={loading} size='large' style={loading && {position:'absolute', top:height/2-50, left:width/2-50, borderRadius:10, backgroundColor: 'rgba(0,0,0,0.8)', width:100, height:100}}/>
        <MessageBarAlert ref="alert" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'rgba(82, 46, 168, 1)',
    alignItems: 'center',
  },

  titleContainer: {
    height: 270,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 18,
  },

  button1: {
    padding: 5,
  },

  amount: {
    fontFamily: 'roboto-thin',
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },

  label1: {
    fontFamily: 'roboto',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },

  label2: {
    fontFamily: 'roboto',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    marginTop: 4,
    backgroundColor: 'transparent',
  },

  message: {
    color: 'rgba(255, 255, 255, 0.62)',
    fontSize: 16,
    fontFamily: 'roboto',
    textAlign: 'center',
    width: 242,
    backgroundColor: 'transparent',
  },

  activityItemContainer: {
    flexDirection:'column',
    backgroundColor: 'white',
    borderRadius: 9
  },
});

function mapStateToProps(state) {
  const { user, total, events, profile } = state;

  return {
    user,
    total,
    events,
    profile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...getTotalActions, ...getEventsCountActions, ...getEventsActions}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);