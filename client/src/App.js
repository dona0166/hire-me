import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './pages/home'
import Layout from './UI/Layout'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
