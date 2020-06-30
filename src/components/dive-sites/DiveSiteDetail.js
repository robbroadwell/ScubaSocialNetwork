import React, {Component} from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import DiveSiteDetailMap from './DiveSiteDetailMap';
import DiveSiteDetailHeader from './DiveSiteDetailHeader';
import DiveSiteDetailSidebar from './DiveSiteDetailSidebar';
import DiveSitePhotos from './DiveSitePhotos';
import LogButton from '../buttons/LogButton';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import qs from 'qs';
import BaseURL from '../../utility/BaseURL';
import EditButton from '../buttons/EditButton';
import SaveButton from '../buttons/SaveButton';
import CancelButton from '../buttons/CancelButton';

import { connect } from "react-redux";
import { getDiveSite, getUser } from "../../redux/selectors";
import { fetchDiveSite, setLogDiveMode, setAddPhotoMode, setAddReviewMode, setDiveSite, setRegisterMode } from '../../redux/actions';

const axios = require('axios')

class DiveSiteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true
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
    let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
    this.props.fetchDiveSite(id)
  }

  openLogDive = () => {
    if (this.props.user.token) {
      this.props.setLogDiveMode(true);
    } else {
      this.props.setRegisterMode(true);
    }
  }

  openAddReview = () => {
    if (this.props.user.token) {
      this.props.setAddReviewMode(true);
    } else {
      this.props.setRegisterMode(true);
    }
  }

  openAddPhoto = () => {
    if (this.props.user.token) {
      this.props.setAddPhotoMode(true);
    } else {
      this.props.setRegisterMode(true);
    }
  }

  render() {
    return (
      <View>
        <DiveSiteDetailHeader diveSite={this.props.diveSite} />

        <View style={{flexDirection: 'row', margin: 10, marginTop: 0}}>
          <DiveSiteDetailBody diveSite={this.props.diveSite} reload={this.fetchDiveSite} openAddReview={this.openAddReview} openLogDive={this.openLogDive} openAddPhoto={this.openAddPhoto} user={this.props.user} />
          <DiveSiteDetailSidebar diveSite={this.props.diveSite} openAddReview={this.openAddReview} />
        </View>

        <DiveSiteDetailMap diveSite={this.props.diveSite} style={this.props.style} />
      </View>
    )
  }
}

class DiveSiteDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      description: props.diveSite && props.diveSite.description.length > 0 ? props.diveSite.description[0].content : "",
    };
  }

  onChangeTextDescription = input => {
    console.log(input)
    this.setState({ description: input });
  };

  onPressSubmit = () => {
    if (this.state.description === "") {
      this.cancelEdit()
      return // can't be empty
    }

    if (this.props.diveSite.description && this.props.diveSite.description.length > 0 && this.props.diveSite.description[0].content === this.state.description) {
      this.cancelEdit()
      return // must change it
    }

    if (!this.props.user || !this.props.user.token) {
      return // force login
    }
    
    axios({
      method: 'put',
      url: BaseURL() + '/api/dive-sites',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.props.user.token
      },
      data: {
          id: this.props.diveSite._id,
          description: this.state.description
      }

    }).then(function (response) {
      this.setState({ 
        isEditing: false
      })
      this.props.reload()
    }.bind(this));
  }

  
  enableEdit = () => {
    this.setState({ isEditing: true })
  }
  
  cancelEdit = () => {
    this.setState({ 
      isEditing: false,
      description: this.props.diveSite && this.props.diveSite.description.length > 0 ? this.props.diveSite.description[0].content : "",
    })
  }

  onChangeTextDescription = input => {
    this.setState({ description: input });
  };

  render() {
    if (!this.props.diveSite) {
      return (
        <View>
          <View style={{flexDirection: 'row', marginTop: 40, marginBottom: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Description</Text>
          </View>
          <ReactPlaceholder type='rect' style={{height: 120}} showLoadingAnimation={true} />
        </View>
      )
    } else if (this.state.isEditing) {
      return (
        <View>
          <View style={{flexDirection: 'row', marginTop: 40, marginBottom: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Description</Text>
            <SaveButton onPress={this.onPressSubmit} />
            <CancelButton onPress={this.cancelEdit} />
          </View>
          <TextInput
            style={{height: 200, padding: 7, marginTop: 5, borderColor: '#DDDDDD', borderWidth: 1 }}
            multiline={true}
            onChangeText={text => this.onChangeTextDescription(text)}
            placeholder={"Add a description..."}
            value={this.state.description}
          /> 
        </View>
      )
    } else {
      return (
        <View>
          <View style={{flexDirection: 'row', marginTop: 40, marginBottom: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Description</Text>
            <EditButton onPress={this.enableEdit} />
          </View>
          <Text>
            {this.props.diveSite && this.props.diveSite.description && this.props.diveSite.description.length > 0 ? this.props.diveSite.description[0].content : "No description yet." }
          </Text>
        </View>
      )
    }
  }
}

function DiveSiteDetailBody({ diveSite, reload, openAddPhoto, openLogDive, user }) {
  return (
    <View style={{flex: 1, flexDirection: 'column', margin: 10, marginRight: 20}}>
      <DiveSitePhotos openAddPhoto={openAddPhoto} diveSite={diveSite} reload={reload} />
      <DiveSiteDescription diveSite={diveSite} reload={reload} user={user} />
      <DiveSiteAverages diveSite={diveSite} openLogDive={openLogDive} />
      <View style={{flex: 1}}></View>
      <DiveSiteLocation diveSite={diveSite} />
    </View>
  )
}

function DiveSiteAverages({ diveSite, openLogDive }) {
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 15}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Details</Text>
        <LogButton onPress={openLogDive} />
      </View>
      <View style={{flexDirection: 'row', marginBottom: 40, marginHorizontal: -5}}>
        <DetailCard name={"Visibility"} value={"100+ meters"} diveSite={diveSite} />
        <DetailCard name={"Depth"} value={"70-80 meters"} diveSite={diveSite} />
        <DetailCard name={"Water Temperature"} value={"80°F"} diveSite={diveSite} />
        <DetailCard name={"Currents"} value={"None"} diveSite={diveSite} />

      </View>
      {/* <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 40}}>

        <AccessCard diveSite={diveSite} />
        <DiveTypeCard diveSite={diveSite} />
      </View> */}
    </View>
  )
}

function DiveSiteLocation({diveSite}) {
  return (
    <View>
      <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Location</Text>
        {/* <EditButton /> */}
      </View>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        {!diveSite ? <View /> : 
          <Text style={{fontSize: 15}}>{diveSite.destination.name}</Text>
        }
        {/* <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
        <Text style={{fontSize: 15}}>Lighthouse Reef</Text> */}
        <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />

        {!diveSite ? <View /> : 
          <Text style={{fontSize: 15}}>{diveSite.location.coordinates[1]}, {diveSite.location.coordinates[0]}</Text>
        }
      </View>
    </View>

  )
}

function DetailCard({ name, value, diveSite }) {
  return (
    <View style={{flex: 1, marginHorizontal: 5, borderColor: '#EEEEEE', backgroundColor: '#FEFEFE', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 120}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>{name}</Text>
          <Image style={{width: 50, height: 30, marginTop: 15}} source={require('../../assets/dial.svg')} />
          <Text style={{fontWeight: '600', marginBottom: 15}}>{value}</Text>
          <Text style={{color: '#A00000'}}>See history</Text>
        </View>
      </ReactPlaceholder>
    </View>
  )
}


function AccessCard({ diveSite }) {
  return (
    <View style={{flexBasis: '33.3%', marginBottom: 0, borderColor: '#EEEEEE', backgroundColor: '#FEFEFE', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 60}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, marginBottom: 3, alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>Access</Text>
          <View style={{flex: 1}} />
          <EditButton />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Text style={{fontWeight: '600'}}>Boat, Liveaboard</Text>
          <View style={{flex: 1}} />
        </View>
      </ReactPlaceholder>
    </View>
  )
}

function DiveTypeCard({ diveSite }) {
  return (
    <View style={{flexBasis: '33.3%', marginBottom: 0, borderColor: '#EEEEEE', backgroundColor: '#FEFEFE', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 60}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, marginBottom: 3, alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>Dive Type</Text>
          <View style={{flex: 1}} />
          <EditButton />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Text style={{fontWeight: '600'}}>Shipwreck</Text>
          <View style={{flex: 1}} />
        </View>
      </ReactPlaceholder>
    </View>
  )
}

const mapStateToProps = state => {
  const diveSite = getDiveSite(state);
  const user = getUser(state);
  return { diveSite, user };
};

export default connect(
  mapStateToProps,
  { fetchDiveSite, setLogDiveMode, setAddPhotoMode, setAddReviewMode, setDiveSite, setRegisterMode }
)(DiveSiteDetail);