import React, {Component} from 'react';
import { View, Text } from 'react-native';
import DiveSiteDetailMap from './DiveSiteDetailMap';
import DiveSiteDetailHeader from './DiveSiteDetailHeader';
import DiveSiteDetailSidebar from './DiveSiteDetailSidebar';
import DiveSiteDetailOverlays from './DiveSiteDetailOverlays';
import DiveSiteReviewsList from './DiveSiteReviewsList';
import DiveSitePhotos from './DiveSitePhotos';
import qs from 'qs';
import BaseURL from '../../utility/BaseURL';
import EditButton from '../buttons/EditButton';

class DiveSiteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        isLogDive: false,
        isAddReview: false,
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

  openLogDive = () => {
    this.setState({ isLogDive: true })
    console.log("openLogDive")
  }

  openAddReview = () => {
    this.setState({ isAddReview: true })
    console.log("openAddReview")
  }

  closeModals = () => {
    this.setState({ isLogDive: false, isAddReview: false })
    document.body.style.overflow = "visible"
    console.log("closeModals")
  }

  render() {
    return (
      <View>
        <DiveSiteDetailHeader diveSite={this.state.data.diveSite} />

        <View style={{flexDirection: 'row', margin: 10, marginTop: 0}}>
          <DiveSiteDetailBody diveSite={this.state.data.diveSite} reload={this.fetchDiveSite} openAddReview={this.openAddReview} />
          <DiveSiteDetailSidebar diveSite={this.state.data.diveSite} openLogDive={this.openLogDive} />
        </View>

        <DiveSiteDetailMap diveSite={this.state.data.diveSite} style={this.props.style} />
        <DiveSiteDetailOverlays diveSite={this.state.data.diveSite} isLogDive={this.state.isLogDive} isAddReview={this.state.isAddReview} close={this.closeModals} reload={this.fetchDiveSite} />
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

export default DiveSiteDetail;