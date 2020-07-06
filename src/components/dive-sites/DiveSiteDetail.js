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
import AddButton from '../buttons/AddButton';
import EditButton from '../buttons/EditButton';
import SaveButton from '../buttons/SaveButton';
import CancelButton from '../buttons/CancelButton';
import UserBadge from './UserBadge';

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

        <View style={{flexDirection: 'row', margin: 10, marginTop: 0}}>
          <DiveSiteDetailBody diveSite={this.props.diveSite} reload={this.fetchDiveSite} openAddReview={this.openAddReview} openLogDive={this.openLogDive} openAddPhoto={this.openAddPhoto} openRegister={() => this.props.setRegisterMode(true)} user={this.props.user} />
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
      description: !props.diveSite || !props.diveSite.description || props.diveSite.description.length === 0 ? "" : props.diveSite.description[0].content,
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
    if (!this.props.user.token) {
      this.props.openRegister()
    } else {
      this.setState({ 
        isEditing: true,
        description: this.props.diveSite && this.props.diveSite.description.length > 0 ? this.props.diveSite.description[0].content : "",
      })
    }
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
            style={{height: 200, outlineWidth: 0, padding: 7, marginTop: 5, borderColor: '#DDDDDD', borderWidth: 1 }}
            multiline={true}
            onChangeText={text => this.onChangeTextDescription(text)}
            placeholder={"Add a description..."}
            value={this.state.description}
          /> 
        </View>
      )
    } else {
      return (
        <View style={{borderColor: '#CCCCCC', borderWidth: 1, marginTop: 20, padding: 20, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 5, shadowColor: '#000'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Description</Text>
            <AddButton onPress={this.enableEdit} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{marginRight: 20}}>
              <Image style={{height: 28, width: 18, tintColor: '#CCCCCC'}} source={require('../../assets/arrow_up.svg')} />
              <Text style={{fontWeight: '900'}}>12</Text>
              <Image style={{height: 28, width: 18, tintColor: '#CCCCCC'}} source={require('../../assets/arrow_down.svg')} />
            </View>
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={{fontSize: 15}}>
                {this.props.diveSite && this.props.diveSite.description && this.props.diveSite.description.length > 0 ? this.props.diveSite.description[0].content : "No description yet." }
              </Text>
            </View>
            
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 10}}>
            <View style={{borderColor: '#CCCCCC', borderWidth: 1, borderRadius: 5, padding: 5}}>
              <Text style={{fontWeight: '900', paddingHorizontal: 5}}>2 more...</Text>
            </View>
            <View style={{flex: 1}} />
            <UserBadge user={{name: "Rob"}} timestamp={1234567} />
          </View>
        </View>
      )
    }
  }
}

function DiveSiteDetailBody({ diveSite, reload, openAddPhoto, openLogDive, user, openRegister }) {
  return (
    <View style={{flex: 1, flexDirection: 'column', margin: 10, marginRight: 20}}>
      <DiveSiteDetailHeader diveSite={diveSite} />
      <DiveSitePhotos openAddPhoto={openAddPhoto} diveSite={diveSite} reload={reload} />
      <DiveSiteAverages diveSite={diveSite} openLogDive={openLogDive} />
      <DiveSiteAnimals />
      {/* <DiveSiteDescription diveSite={diveSite} reload={reload} user={user} openRegister={openRegister} /> */}
      <View style={{flex: 1}}></View>
      {/* <DiveSiteLocation diveSite={diveSite} /> */}
    </View>
  )
}

function DiveSiteAnimals({ name, image }) {

  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', margin: -5, marginTop: 15}}>
      <AnimalCard name={"Clownfish"} image={require('../../assets/animals/clownfish.jpg')} />
      <AnimalCard name={"Reef Shark"} image={require('../../assets/animals/reef_shark.jpg')} />
      <AnimalCard name={"Reef Lobster"} image={require('../../assets/animals/reef_lobster.jpg')} />
      <AnimalCard name={"Eagle Ray"} image={require('../../assets/animals/eagle_ray.jpg')} />
      <AnimalCard name={"Giant Sea Turtle"} image={require('../../assets/animals/turtle.jpg')} />
      <AnimalCard name={"Sea Cucumber"} image={require('../../assets/animals/sea_cucumber.jpeg')} />
      <AnimalCard name={"Seahorse"} image={require('../../assets/animals/seahorse.jpg')} />
      <AnimalCard name={"Barracuda"} image={require('../../assets/animals/barracuda.jpg')} />
      <AnimalCard name={"Manta Ray"} image={require('../../assets/animals/manta_ray.jpg')} />
    </View>
  )
}

function AnimalCard({ name, image }) {
  return (
    <View style={{flex: 1, minWidth: 250, height: 200, margin: 5, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 5, shadowColor: '#000'}}>
      <Image style={{flex: 1}} source={image} />
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 30}}>
        <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: 'black', opacity: 0.7}} />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
          <Text style={{color: 'white', fontSize: 17, fontWeight: '500'}}>{name}</Text>
          <View style={{flex: 1}} />
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', marginRight: 5}}>18</Text>
            <Image style={{width: 20, height: 17, tintColor: 'white'}} source={require('../../assets/eye.svg')} />
          </View>
        </View>
      </View>
    </View>
  )
}

function DiveSiteAverages({ diveSite, openLogDive }) {
  return (
    <View style={{borderColor: '#CCCCCC', backgroundColor: '#FEFEFE',  borderWidth: 1, marginTop: 0, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 10, shadowColor: '#000'}}>
      <View style={{flexDirection: 'row'}}>
        <DetailCard name={"Visibility"} value={"100+ meters"} diveSite={diveSite} />
        <DetailCard name={"Depth"} value={"70-80 meters"} diveSite={diveSite} />
        <DetailCard name={"Water Temperature"} value={"80°F"} diveSite={diveSite} />
        <DetailCard name={"Currents"} value={"None"} diveSite={diveSite} noBorder={true} />

      </View>
      {/* <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 40}}>

        <AccessCard diveSite={diveSite} />
        <DiveTypeCard diveSite={diveSite} />
      </View> */}
    </View>
  )
}

function DetailCard({ name, value, diveSite, noBorder }) {
  return (
    <View style={{flex: 1, paddingVertical: 5, marginHorizontal: 5, borderRightColor: "#DEDEDE", borderRightWidth: noBorder ? 0 : 1}}>
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