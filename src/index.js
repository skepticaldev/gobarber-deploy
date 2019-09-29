import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import CodePush from 'react-native-code-push';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';
import { store, persistor } from './store';
import App from './App';

class Index extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('ae7a2545-3e23-4ac0-b999-e1718f0d0af9');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = data => {};

  // Called when click on a notification with app closed
  onOpened = notification => {};

  onIds = id => {};

  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <App />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
