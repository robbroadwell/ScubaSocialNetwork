import React from 'react'
import { Provider } from 'react-redux'
import Root from './components/Root'
import ReactGA from 'react-ga';
import store from "./redux/store";

ReactGA.initialize('UA-88100612-2');

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;