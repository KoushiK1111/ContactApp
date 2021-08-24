import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/Store'
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />    
    </Provider>
  );
}

export default App;