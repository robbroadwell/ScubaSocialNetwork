import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from "react-redux";
import { getDiveSites } from '../redux/selectors';
import { Helmet } from "react-helmet";

import Alert from './header/Alert';
import Header from './header/Header';
import Register from './header/Register';
import List from './list/List';
import Map from './map/Map';
import Result from './result/Result';
import Conditions from './legal/Conditions';
import Contact from './legal/Contact';
import Privacy from './legal/Privacy';
import PrimaryButton from '../utility/buttons/PrimaryButton';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMode: false
    };
  }

  toggleList = () => {
    this.setState(prevState => ({
      listMode: !prevState.listMode
    }));
  }

  render() {
    const { mobile } = this.props;
    const title = this.state.listMode ? "Return to Map" : this.props.diveSites.length + " results"

    return (
      <Router>
        <Helmet>
            <meta charSet="utf-8" />
            <title>DivingCollective: Search for Dive Sites, Scuba Liveaboards, Dive Resorts, Hotels, Gear, Dive Shops & more</title>
        </Helmet>

        <View style={{height: '100vh', flexDirection: 'column-reverse'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>

            <Route path="/" exact={mobile}>
              <List mobile={mobile} listMode={this.state.listMode} />
            </Route>

            <View style={{flex: 1}}>
              <Route path="/" component={Map} />
              <Route
                path='/dive-sites'
                render={(props) => <Result {...props} mobile={mobile} />}
              />
              {/* <Route path="/dive-sites" component={Result} /> */}
              <Route path="/conditions" component={Conditions} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/register" component={Register} />
            </View>

            {!mobile ? <View></View> :
            <Route path="/" exact={true}>
              <MobileModeToggleButton action={this.toggleList} title={title} />
            </Route>
            }

          </View>
          <Route path="/" component={Header} />
          <Route path="/" component={Alert} />
        </View>
      </Router>
      
    );
  }
}

function MobileModeToggleButton({ action, title }) {
  return (
    <View style={{position: 'absolute', bottom: 80, width: '100%', pointerEvents:'box-none', justifyContent: 'center', flexDirection: 'row'}}>
      <PrimaryButton action={action} title={title} icon={require('../assets/search.svg')} />
    </View>
  )
}

const mapStateToProps = state => {
  const diveSites = getDiveSites(state);
  return { diveSites };
};

export default connect(
  mapStateToProps,
  {  }
)(RootComponent);
