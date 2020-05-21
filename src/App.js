import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import scubaApp from './redux/reducers'
import Root from './components/Root'

const store = createStore(scubaApp)

function App() {
  return (
    <Provider store={store}> 
      <Root />
    </Provider>
  );
}

export default App;