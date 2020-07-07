import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Loading from '../misc/Loading';
import { connect } from "react-redux";
import { setUser, setAccountMode } from "../../redux/actions";
import { getUser, getLoginMode } from "../../redux/selectors";
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import BaseURL from '../../utility/BaseURL';
import PhotosContent from '../photos/PhotosContent';
import Ratings from 'react-ratings-declarative';
import StyledLinkNone from '../buttons/StyledLinkNone';
import StyledLink from '../buttons/StyledLink';
const axios = require('axios')

class Users extends Component {

  onPressLogout = () => {
    this.props.history.push(`/`)
    this.props.setUser([]);
  }

  render() {
    console.log(this.props.match.params.id)
    console.log(this.props.match.params.tab)

    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3, alignItems: 'center', paddingLeft: 20, marginBottom: 40}}>
          <View style={{position: 'absolute', top: 65, width: '100%', height: 1, backgroundColor: '#CCCCCC'}} />
          <View style={{width: 280, height: 280, marginTop: 40, overflow: 'hidden', borderRadius: 140, borderColor: 'black', borderWidth: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{height: '100%', width: '100%'}} source={require('../../assets/you.jpg')} />
          </View>
          <Text style={{marginTop: 10, fontWeight: '700', fontSize: 28}}>Rob Broadwell</Text>
          <Text style={{fontWeight: '400', fontSize: 18, color: '#333333'}}>@Rob</Text>
          <Text style={{marginTop: 10, fontSize: 16}}>Joined July 20, 2020</Text>
        </View>
        <View style={{flex: 8}}>
          <View style={{height: 66, borderBottomWidth: 1, borderBottomColor: "#CCCCCC", flexDirection: 'row', alignItems: 'flex-end'}}>
            {/* <MenuItem title={"Overview"} onPress={() => this.props.history.push(`/users/${this.props.match.params.id}`)} selected={!this.props.match.params.tab} icon={require('../../assets/account.svg')} /> */}
            <MenuItem title={"Dive Log"} id={this.props.match.params.id} selected={!this.props.match.params.tab} icon={require('../../assets/numbered.png')} />
            <MenuItem title={"Photos"} id={this.props.match.params.id} section={"photos"} selected={this.props.match.params.tab === "photos"} icon={require('../../assets/camera.png')} />
            <MenuItem title={"Reviews"} id={this.props.match.params.id} section={"reviews"} selected={this.props.match.params.tab === "reviews"} icon={require('../../assets/review.svg')} />
            <MenuItem title={"Dive Sites"} id={this.props.match.params.id} section={"dive-sites"} selected={this.props.match.params.tab === "dive-sites"} icon={require('../../assets/pin.png')} />
          </View>
          <View style={{flex: 1, margin: 10}}>
            {!this.props.match.params.tab ? <DiveLogContent /> : <View />}
            {this.props.match.params.tab === "photos" ? <PhotosContent count={12} onPress={() => this.props.history.push(`/photos/418596049`)} /> : <View />}
            {this.props.match.params.tab === "reviews" ? <UserReviewsContent /> : <View />}
          </View>
        </View>
      </View>
    )
  }
}

function DiveLogContent() {
  const number = 20

  var views = []
  for (var i = number; i > 0; i--) {
    views.push(
      <DiveLogRow i={i} />
    )
  }

  return (
    <View style={{margin: 5, borderBottomWidth: 2, borderBottomColor: '#EEEEEE'}}>
      {/* <DiveLogHeader /> */}
      {views}
    </View>
  )
}

function DiveLogHeader() {
  return (
    <View style={{flexDirection: 'row', backgroundColor: '#000000', alignItems: 'center', height: 30}}>
      <View style={{width: 200}} />
      <View style={{flex: 1}}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 15}}>Location</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 15}}>Depth</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 15}}>Water Temp</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 15}}>Visibility</Text>
      </View>
    </View>
  )
}

function DiveLogRow({ i }) {
  return (
    <View key={i} style={{flexDirection: 'row', backgroundColor: i % 2 === 0 ? '#EEEEEE' : '#FFFFFF', alignItems: 'center'}}>
      <View style={{minWidth: 30, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', padding: 5, margin: 10}}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 15}}>{i}</Text>
      </View>
      <View style={{width: 150, alignItems: 'center'}}>
        <Text style={{fontWeight: '500', fontSize: 15}}>July 20, 2020</Text>
      </View>
      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={{fontWeight: '300', fontSize: 15}}>Sail Rock, Thailand</Text>
      </View>
      {/* <View style={{flex: 1}}>
        <Text style={{fontWeight: '300', fontSize: 15}}>40-90 Meters</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: '300', fontSize: 15}}>81°F</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: '300', fontSize: 15}}>100+ Meters</Text>
      </View> */}
    </View>
  )
}

function UserReviewsContent() {
  const temporary = [{"rating":4,"title":"Beautiful!","comment":"Starting off of the Road C-6000 Spur, Little Larch winds its way up to a small kiosk before beginning on a flowy descent. Little Larch has a few optional routes spread throughout the trail, the first of which is an optional left onto a long log ride for a more challenging and faster bypass. A few turns later there is a road crossing marking the transition into the middle section of the trail.\n","user":{"name":"Rob"},"timestamp":1594056234395},{"rating":5,"title":"Stunning!","comment":"I dove with @rockbottomdivers and had a wonderful time! They showed the dive in such a spectacular way, and wow, did the caverns at the bottom of the dive","user":{"name":"Rob"},"timestamp":1593959627555},{"rating":5,"title":"The greatest","comment":"Atlas comes with MongoDB Atlas Search built in, making it easy to build fast, relevant, full-text search capabilities on top of your MongoDB data. No need to deploy a separate search platform: create search indexes directly in Atlas and use the MongoDB aggregation framework to build sophisticated queries.\n","user":{"name":"Rob"},"timestamp":1593910348152},{"rating":5,"title":"Atlas","comment":"Atlas comes with MongoDB Atlas Search built in, making it easy to build fast, relevant, full-text search capabilities on top of your MongoDB data. No need to deploy a separate search platform: create search indexes directly in Atlas and use the MongoDB aggregation framework to build sophisticated queries.\n","user":{"name":"Rob"},"timestamp":1593910341696},{"rating":4,"title":"Very good.","comment":"<Text style={{fontSize: 14, marginVertical: 20, maxWidth: 500}}>{review.comment}</Text> <Text style={{fontSize: 14, marginVertical: 20, maxWidth: 500}}>{review.comment}</Text>","user":{"name":"Rob"},"timestamp":1593910265467},{"rating":5,"title":"Excellent!","comment":"One of the best dive sites I've ever seen. Huge schools of amberjacks and grouper, lots of sharks, rays, turtles. Absolutely stunning!","user":{"name":"Rob"},"timestamp":1593908499749}]
  
  var views = []
  for (var i = 0; i < temporary.length; i++) {
    views.push(
      <UserReview review={temporary[i]} />
    )
  }
  
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {views}
    </View>
  )
}

function UserReview({ review }) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <View style={{ margin: 5, paddingVertical: 15, paddingHorizontal: 25, borderColor: '#DEDEDE', borderWidth: 1}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: '600', fontSize: 18, marginVertical: 5}}>{review.title}</Text>
        <Ratings
          rating={review.rating}
          widgetRatedColors={"#DD0000"}
          widgetDimensions="15px"
          widgetSpacings="1px">
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings>
      </View>
      
      <Text style={{fontSize: 14, marginVertical: 20, maxWidth: 400}}>{review.comment}</Text>
      {/* <Text style={{textAlign: 'right'}}>{new Date(review.timestamp).toLocaleDateString("en-US", options)}</Text>  */}
    </View>
  )
}

function MenuItem({ title, icon, selected, id, section }) {
  const url = `/users/${id}` + (section ? `/${section}` : "")

  return (
    <StyledLinkNone to={url} >
      <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: selected ? 12 : 14, paddingHorizontal: 15, borderBottomColor: '#A00000', borderBottomWidth: selected ? 2 : 0}}>
        <Image style={{height: 15, width: 15, marginRight: 7, tintColor: selected ? 'black' : '#333333'}} source={icon} />
        <Text style={{fontSize: 15, color: selected ? 'black' : '#333333', fontWeight: selected ? '700' : '400'}}>{title}</Text>
      </View>
    </StyledLinkNone>
  )
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

  export default connect(
    mapStateToProps,
    { setUser, setAccountMode }
  )(withRouter(Users));
