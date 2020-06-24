import React from 'react'
import { Provider } from 'react-redux'
import Root from './components/Root'
import ReactGA from 'react-ga';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './redux/store';
const { persistor, store } = configureStore()

function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <Root />
       </PersistGate>
    </Provider>
  );
}

export default App;