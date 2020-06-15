import React, {Component} from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import qs from 'qs';
import { withRouter } from 'react-router-dom'
import {Helmet} from "react-helmet";

import { connect } from "react-redux";
import { getUser } from '../../../redux/selectors';
import { fetchDiveSites, setLoginMode } from '../../../redux/actions';

import Loading from '../../misc/Loading';
import ReviewsList from './ReviewsList'
import ResultDescription from './ResultDescription'
import ResultPhotos from './ResultPhotos'
import ResultEdit from './ResultEdit';
// import ResultTitle from './ResultTitle';
import ResultUserActions from './ResultUserActions'
import ReactGA from 'react-ga';

const axios = require('axios')

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        isAddPhoto: false,
        isEditing: false,
        isReview: false,
        photoSelectedIndex: 0,
        data: [],
    };
  }

  componentDidMount() {
    this.fetchDiveSite()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log("fetch")
      this.fetchDiveSite()
    }
  }

  fetchDiveSite = () => {
    fetch('https://www.divingcollective.com/api/dive-sites/details/'+`${qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
    })
  }

  rating = () => {
    const {diveSite} = this.state.data

    if (!diveSite.reviews || diveSite.reviews.length === 0) {
      return 0
    }

    var total = 0;
    var x;

    for (x in diveSite.reviews) {
      total = total + diveSite.reviews[x].rating
    }

    return total / diveSite.reviews.length
  }

  reviews = () => {
    const {diveSite} = this.state.data

    if (!diveSite || !diveSite.reviews) {
      return 0
    }
    return diveSite.reviews.length
  }

  toggleAddPhoto = () => {
    if (!this.props.user.username) {
      this.props.setLoginMode(true)
    } else {
      this.setState(prevState => ({
        isAddPhoto: !prevState.isAddPhoto,
        isReview: false
      }));
    }
  };

  toggleReview = () => {
    if (!this.props.user.username) {
      this.props.setLoginMode(true)
    } else {
      this.setState(prevState => ({
        isReview: !prevState.isReview,
        isAddPhoto: false
      }));
    }
  };

  toggleEdit = () => {
    if (!this.props.user.username) {
      this.props.setLoginMode(true)
    } else {
      this.fetchDiveSite()
      this.setState(prevState => ({
        isReview: false,
        isAddPhoto: false,
        isEditing: !prevState.isEditing
      }));
    }
  }

  addReview = (review) => {
    const {diveSite} = this.state.data
    review.user = this.props.user.username

    if (this.props.user.token) {
      axios({
        method: 'put',
        url: 'https://www.divingcollective.com/api/dive-sites/reviews/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + this.props.user.token
        },
        data: {
          id: diveSite._id,
          review: review
        }
  
      }).then(function (response) {
        this.toggleReview();
        this.fetchDiveSite();
        this.props.fetchDiveSites();
      }.bind(this));
    }
  }
  
  render() {
    ReactGA.pageview(window.location.pathname + window.location.search);

    const {diveSite} = this.state.data
    const {mobile} = this.props

    if (this.state.isLoading || !diveSite) {
      return <Loading />
    } 
    
    if (this.state.isEditing) {
      return <ResultEdit site={diveSite} toggleEdit={this.toggleEdit} />

    } else {
      const title = diveSite.name + ', ' + diveSite.country

      return (
        <View style={{position: 'absolute', width: '100%', height: '100%'}}>
          <Helmet>
              <meta charSet="utf-8" />
              <title>{title}</title>
          </Helmet>
          <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#000000', opacity: 0.8}} />
          <ScrollView style={{flex: 1}}>
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#F8F8F8', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
              <View style={{flex: 1, flexDirection: 'column-reverse', margin: 20, marginBottom: 0}}>
                <ReviewsList reviews={diveSite.reviews} />
                <ResultPhotos diveSite={diveSite} />
                <ResultDescription diveSite={diveSite} />
  
                <View style={{flexDirection: 'row', justifyContent: 'center'}} >
                  {/* <ResultTitle diveSite={diveSite} /> */}
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    {!mobile ? <View></View> : 
                    <TouchableOpacity onPress={() => this.props.history.push(`/`)} style={{height: '100%', paddingHorizontal: 10, justifyContent: 'center'}} >
                      <Image style={{width: 30, height: 30, tintColor: 'black'}} source={require('../../assets/close.png')} />
                    </TouchableOpacity>
                    }
                  </View>
                  {mobile ? <View></View> : 
                  <ResultUserActions navigateTerms={() => this.props.history.push(`/conditions`)} isAddPhoto={this.state.isAddPhoto} toggleAddPhoto={this.toggleAddPhoto} isReview={this.state.isReview} toggleReview={this.toggleReview} addReview={this.addReview} toggleEdit={this.toggleEdit} fetchDiveSite={this.fetchDiveSite} diveSiteID={qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id}  />
                  }
                </View>
              </View>
            </View>
          </ScrollView>
          {!mobile ? <View></View> :
          <View style={{height: 75, flexDirection: 'row', backgroundColor: '#FEFEFE', borderTopWidth: 1, borderTopColor: '#CCCCCC'}}>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Add Photos</Text>
              <Image style={{width: 20, height: 20, tintColor: 'black'}} source={require('../../assets/add_photo.svg')} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Review</Text>
              <Image style={{width: 20, height: 20, tintColor: 'black'}} source={require('../../assets/review.svg')} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Edit</Text>
              <Image style={{width: 20, height: 20, tintColor: 'black'}} source={require('../../assets/create.svg')} />
            </TouchableOpacity>
          </View>
          }
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  { fetchDiveSites, setLoginMode }
)(withRouter(Result));


        