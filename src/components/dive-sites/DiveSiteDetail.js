import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
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

import { connect } from "react-redux";
import { getDiveSite } from "../../redux/selectors";
import { fetchDiveSite, setLogDiveMode, setAddPhotoMode, setAddReviewMode, setDiveSite } from '../../redux/actions';

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
    console.log('update')
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log('fetch')
      this.fetchDiveSite()
    }
  }

  fetchDiveSite = () => {
    console.log('fetch')
    let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
    this.props.fetchDiveSite(id)
  }

  openLogDive = () => {
    this.props.setLogDiveMode(true);
    console.log("openLogDive")
  }

  openAddReview = () => {
    this.props.setAddReviewMode(true);
    console.log("openAddReview")
  }

  openAddPhoto = () => {
    this.props.setAddPhotoMode(true);
    console.log("openAddPhoto")
  }

  render() {
    return (
      <View>
        <DiveSiteDetailHeader diveSite={this.props.diveSite} />

        <View style={{flexDirection: 'row', margin: 10, marginTop: 0}}>
          <DiveSiteDetailBody diveSite={this.props.diveSite} reload={this.fetchDiveSite} openAddReview={this.openAddReview} openLogDive={this.openLogDive} openAddPhoto={this.openAddPhoto} />
          <DiveSiteDetailSidebar diveSite={this.props.diveSite} openAddReview={this.openAddReview} />
        </View>

        <DiveSiteDetailMap diveSite={this.props.diveSite} style={this.props.style} />
      </View>
    )
  }
}

function DiveSiteDescription({ diveSite }) {
  return (
    <View>
      <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10, alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Description</Text>
        <EditButton />
      </View>
      <Text>
      SS Thistlegorm rests in the Sha'ab Ali's shallows in the Northern Red Sea, since its sinking back in 1941. Discovered by Jacques Cousteau, it quickly gained a reputation as the world's best wreck site among recreational divers during the early '90s. A dive on the Thistlegorm will let you explore the remnants of the Great War while being immersed in the vibrant marine life of the northern Red Sea such as dolphins and turtles. The Thistlegorm offers divers a unique blend of historical value and aquatic life at a depth that can be easily reached by most divers. Visit the famous Captain's room, the holds containing supplies destined for the British war effort, the locomotives. Finish the dive with a five-metre safety stop surrounded by curious napoleon wrasses, batfish, and dolphins.
      </Text>
    </View>
  )
}

function DiveSiteDetailBody({ diveSite, reload, openAddPhoto, openLogDive }) {
  return (
    <View style={{flex: 1, flexDirection: 'column', margin: 10, marginRight: 20}}>
      <DiveSitePhotos openAddPhoto={openAddPhoto} diveSite={diveSite} reload={reload} />
      <DiveSiteDescription diveSite={diveSite} />
      <DiveSiteAverages diveSite={diveSite} openLogDive={openLogDive} />
      <View style={{flex: 1}}></View>
      <DiveSiteLocation diveSite={diveSite} />
    </View>
  )
}

function DiveSiteAverages({ diveSite, openLogDive }) {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 20}}>
      <VisibilityCard diveSite={diveSite} openLogDive={openLogDive} />
      <DepthCard diveSite={diveSite} openLogDive={openLogDive} />
      <WaterTemperatureCard diveSite={diveSite} openLogDive={openLogDive} />
      <CurrentsCard diveSite={diveSite} openLogDive={openLogDive} />
      <AccessCard diveSite={diveSite} />
      <DiveTypeCard diveSite={diveSite} />
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

function VisibilityCard({ diveSite, openLogDive }) {
  return (
    <View style={{flexBasis: '33.3%', marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 80}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Visibility</Text>
          <View style={{flex: 1}} />
          <LogButton onPress={openLogDive} />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Image style={{width: 50, height: 30, marginTop: 0, marginLeft: 10, marginRight: 10}} source={require('../../assets/dial.svg')} />
          <Text style={{fontWeight: '600'}}>100+ meters</Text>
          <View style={{flex: 1}} />
          <Text>See history</Text>
        </View>
      </ReactPlaceholder>
    </View>
  )
}

function DepthCard({ diveSite, openLogDive }){
  return (
    <View style={{flexBasis: '33.3%', marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 80}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Depth</Text>
          <View style={{flex: 1}} />
          <LogButton onPress={openLogDive} />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Image style={{width: 50, height: 30, marginTop: 0, marginLeft: 10, marginRight: 10}} source={require('../../assets/dial.svg')} />
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: '600'}}>Average: 44 ft</Text>
            <Text style={{fontWeight: '600'}}>Max: 78 ft</Text>
          </View>
          <View style={{flex: 1}} />
          <Text>See history</Text>
        </View>
      </ReactPlaceholder>
    </View>
  )
}

function WaterTemperatureCard({ diveSite, openLogDive }) {
  return (
    <View style={{flexBasis: '33.3%', marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 80}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Water Temperature</Text>
          <View style={{flex: 1}} />
          <LogButton onPress={openLogDive} />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Image style={{width: 50, height: 30, marginTop: 0, marginLeft: 10, marginRight: 10}} source={require('../../assets/dial.svg')} />
          <Text style={{fontWeight: '600'}}>80°F</Text>
          <View style={{flex: 1}} />
          <Text>See history</Text>
        </View>
      </ReactPlaceholder>
    </View>
  )
}

function CurrentsCard({ diveSite, openLogDive }) {
  return (
    <View style={{flexBasis: '33.3%', marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 80}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Currents</Text>
          <View style={{flex: 1}} />
          <LogButton onPress={openLogDive} />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
          <Image style={{width: 50, height: 30, marginTop: 0, marginLeft: 10, marginRight: 10}} source={require('../../assets/dial.svg')} />
          <Text style={{fontWeight: '600'}}>None</Text>
          <View style={{flex: 1}} />
          <Text>See history</Text>
        </View>
      </ReactPlaceholder>
    </View>
  )
}

function AccessCard({ diveSite }) {
  return (
    <View style={{flexBasis: '33.3%', marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 60}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, marginBottom: 3, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Access</Text>
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
    <View style={{flexBasis: '33.3%', marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
      <ReactPlaceholder type='rect' style={{height: 60}} ready={diveSite} showLoadingAnimation={true}>
        <View style={{flexDirection: 'row', margin: 10, marginBottom: 3, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Dive Type</Text>
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
  return { diveSite };
};

export default connect(
  mapStateToProps,
  { fetchDiveSite, setLogDiveMode, setAddPhotoMode, setAddReviewMode, setDiveSite }
)(DiveSiteDetail);