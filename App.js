import React from 'react';
import { Navigator } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import MyApp from './MyApp';
import Expo from 'expo';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Expo.Asset.fromModule(image).downloadAsync();
    }
  });
}

// function cacheFonts(fonts) {
//   return fonts.map(font => Expo.Font.loadAsync(font));
// }


export default class App extends React.Component {
  
  constructor() {
    super();    
    this.state = {
      isLoading: true,
      storeLoading: true,
      store: configureStore(() => { console.log("Store Loaded!"); this.setState({ storeLoading: false }) }),
    }
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/koble-logo.png'),
      require('./assets/bg-graphic.png'),
      require('./assets/account.png'),
      require('./assets/arrow.png'),
      require('./assets/add.png'),
      require('./assets/back-arrow.png'),
      require('./assets/close_icon.png'),
      require('./assets/hourglass.png'),
      require('./assets/lock_icon.png'),
      require('./assets/mail_icon.png'),
      require('./assets/validation.png'),
      require('./assets/camera_icon.png'),
    ]);

    // const fontAssets = cacheFonts([
    //   require('./assets/fonts/Roboto-Regular.ttf'),
    // ]);

    await Promise.all([
      ...imageAssets,
    ]);

    this.setState({isLoading: false});
  }

  render() {
    if (this.state.isLoading || this.state.storeLoading) {
      return <Expo.AppLoading />;
    }

    return (
      <Provider store={this.state.store}>
        <MyApp />
      </Provider>
    );
  }
}
