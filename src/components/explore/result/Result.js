import React, {Component} from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import qs from 'qs';
import { withRouter } from 'react-router-dom'
import { Helmet } from "react-helmet";
import BaseURL from '../../utility/BaseURL';

import PopoverButton from '../../buttons/PopoverButton';
import PrimaryButton from '../../buttons/PrimaryButton';
import ResultCloseButton from './ResultCloseButton';
import ReviewsList from './ReviewsList'
import ResultPhotos from './ResultPhotos'
import Loading from '../../misc/Loading';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        data: [],
    };
  }

  componentDidMount() {
    this.fetchDiveSite()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.fetchDiveSite()
    }
  }

  fetchDiveSite = () => {
    fetch(BaseURL() + '/api/dive-sites/details/'+`${qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id}`)
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

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{position: 'relative', margin: 20, flex: 1, backgroundColor: this.props.style.colors.secondary}}>
          {this.state.isLoading ? <Loading /> : <View></View>}

          <View style={{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 7, backgroundColor: this.props.style.colors.primary}}>
            <ResultTitle diveSite={this.state.data.diveSite} style={this.props.style} />
            <ResultDesktopAction style={this.props.style} />
            <ResultCloseButton history={this.props.history} style={this.props.style} />
          </View>

          <ResultContent diveSite={this.state.data.diveSite} style={this.props.style} />
          <ResultMobileActions diveSite={this.state.data.diveSite} style={this.props.style} />
        </View>
      </View>
    )
  }
}

function ResultTitle({ diveSite, style }) {
  if (!diveSite) {
    return <View></View>
  }
  return (
    <View >
      <Text style={{fontSize: 20, fontWeight: '300', color: style.colors.secondary}}>{diveSite.name}</Text>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={{fontSize: 15, color: style.colors.secondary}}>{diveSite.country}, </Text>
        <Text style={{fontSize: 13, color: style.colors.secondary}}>{Number((diveSite.location.coordinates[1]).toFixed(6))}, {Number((diveSite.location.coordinates[0]).toFixed(6))}</Text>
      </View>
    </View>
  )
}

function ResultContent({ diveSite, style }) {
  if (!diveSite) {
    return <View></View>
  }
  return (
    <ScrollView style={{flex: 1}}>
      <ResultDescription diveSite={diveSite} />
      <ResultPhotos diveSite={diveSite} />
      <ReviewsList reviews={diveSite.reviews} />
    </ScrollView>
  )
}

function ResultDescription({ diveSite }) {
  if (!diveSite.details || !diveSite.details.description || diveSite.details.description.length === 0) {
    return <View></View>
  }

  return (
    <View style={{margin: 20}}>
      <Text>{diveSite.details.description[diveSite.details.description.length - 1].content}</Text>
    </View>
  )
}

function ResultDesktopAction({ style }) {
  if (style.mobile) {
    return <View style={{flex: 1}}></View>
  }
  return (
    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
      <PopoverButton title={"Add Photos"} icon={require('../../../assets/add_photo.svg')} >
        <View style={{width: 300, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
          {/* <ImageUpload /> */}
        </View>
      </PopoverButton>
      <PopoverButton title={"Review"} icon={require('../../../assets/review.svg')} >
        <View style={{width: 320, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
          {/* <AddReview /> */}
        </View>
      </PopoverButton>
      <PrimaryButton title={"Edit"}icon={require('../../../assets/create.svg')}  />
    </View>
  )
}

function ResultMobileActions({ style }) {
  if (!style.mobile) {
    return <View></View>
  }
  return (
    <View style={{paddingVertical: 10, flexDirection: 'row', backgroundColor: '#FEFEFE', borderTopWidth: 1, borderTopColor: '#CCCCCC'}}>
      <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Add Photos</Text>
        <Image style={{width: 20, height: 20, tintColor: 'black'}} source={require('../../../assets/add_photo.svg')} />
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Review</Text>
        <Image style={{width: 20, height: 20, tintColor: 'black'}} source={require('../../../assets/review.svg')} />
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Edit</Text>
        <Image style={{width: 20, height: 20, tintColor: 'black'}} source={require('../../../assets/create.svg')} />
      </TouchableOpacity>
    </View>
  )
}

export default Result;