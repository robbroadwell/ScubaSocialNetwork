import React, {Component} from 'react';
import { View, Text } from 'react-native';
import DiveSiteDetailMap from './DiveSiteDetailMap';
import DiveSiteDetailHeader from './DiveSiteDetailHeader';
import DiveSiteDetailSidebar from './DiveSiteDetailSidebar';
import DiveSiteReviewsList from './DiveSiteReviewsList';
import DiveSitePhotos from './DiveSitePhotos';
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
    let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
    this.props.fetchDiveSite(id)
  }

  componentDidUpdate = (prevProps) => {
    let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.fetchDiveSite(id)
    }
  }

  openLogDive = () => {
    this.props.setLogDiveMode(true);
    console.log("openLogDive")
  }

  openAddReview = () => {
    this.props.setAddReviewMode(true);
    console.log("openAddReview")
  }

  render() {
    return (
      <View>
        <DiveSiteDetailHeader diveSite={this.props.diveSite} />

        <View style={{flexDirection: 'row', margin: 10, marginTop: 0}}>
          <DiveSiteDetailBody diveSite={this.props.diveSite} reload={this.fetchDiveSite} openAddReview={this.openAddReview} />
          <DiveSiteDetailSidebar diveSite={this.props.diveSite} openLogDive={this.openLogDive} />
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

function DiveSiteDetailBody({ diveSite, reload, openAddReview }) {
  return (
    <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
      <DiveSitePhotos diveSite={diveSite} reload={reload} />
      <DiveSiteDescription diveSite={diveSite} />
      <DiveSiteReviewsList diveSite={diveSite} reload={reload} openAddReview={openAddReview}  />
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