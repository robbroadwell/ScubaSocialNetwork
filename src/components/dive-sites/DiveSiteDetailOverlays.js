import React, {Component} from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import AddReview from './AddReview';
import BaseURL from '../../utility/BaseURL';
import { connect } from "react-redux";
import { getUser } from "../../redux/selectors";

import ReactGA from 'react-ga';
const axios = require('axios')

class DiveSiteDetailOverlays extends Component {

  componentWillMount() {
    if (process.env.NODE_ENV !== "development") {
      if (this.props.isLogDive) {
        ReactGA.pageview('/log-dive/123');
      }
      if (this.props.isAddReview) {
        ReactGA.pageview('/convert-to-event/123');
      }
    }
  }

  addReview = (review) => {
    console.log(review)
    if (this.props.user.token) {
      axios({
        method: 'put',
        url: BaseURL() + '/api/dive-sites/reviews/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + this.props.user.token
        },
        data: {
          id: this.props.diveSite._id,
          review: review
        }
  
      }).then(function (response) {
        this.props.close()
        this.props.reload()
      }.bind(this));
    }
  }
  
  render() {
    const { isLogDive, isAddReview} = this.props

    if (!isLogDive && !isAddReview) {
      return <View />
    }

    document.body.style.overflow = "hidden"

    return (
      <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', top: 0}}>
        <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.8}} />
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <View style={{backgroundColor: 'black', padding: 30, paddingTop: 0, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.props.close()} activeOpacity={1.0} style={{position: 'absolute', top: 0, right: 0}} >
              <Image style={{width: 30, height: 30, tintColor: 'white'}} source={require('../../assets/close.png')} />
            </TouchableOpacity>
            {!isLogDive ? <View/> : 
              <View>
              </View>
            }
            {!isAddReview ? <View/> : 
              <View>
                <AddReview addReview={this.addReview} />
              </View>
            }
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  {  }
)(DiveSiteDetailOverlays);