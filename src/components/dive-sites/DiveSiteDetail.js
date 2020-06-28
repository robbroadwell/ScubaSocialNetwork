import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { StickyContainer, Sticky } from 'react-sticky';
import DiveSiteMap from './DiveSiteMap';
import DiveSiteDetailHeader from './DiveSiteDetailHeader';
import DiveSiteDetailOverlays from './DiveSiteDetailOverlays';
import DiveSiteReviewsList from './DiveSiteReviewsList';
import DiveSitePhotos from './DiveSitePhotos';
import qs from 'qs';
import BaseURL from '../../utility/BaseURL';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import LogButton from '../buttons/LogButton';
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

function VisibilityCard({ diveSite, openLogDive }) {
  return (
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
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
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
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
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
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
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
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
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
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
    <View style={{margin: 10, marginBottom: 0, borderColor: '#DDDDDD', borderWidth: 1}}>
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

function DiveSiteDetailSidebar({ diveSite, openLogDive }) {
  return (
    <StickyContainer>
      <View style={{width: 320, flexDirection: 'column'}}>
        {/* <View style={{height: 200, borderColor: '#DDDDDD', borderWidth: 1, margin: 10}}>
          <Image style={{flex: 1}} source={require('../../assets/weather_placeholder2.png')} />
        </View> */}

        <VisibilityCard diveSite={diveSite} openLogDive={openLogDive} />
        <DepthCard diveSite={diveSite} openLogDive={openLogDive} />
        <WaterTemperatureCard diveSite={diveSite} openLogDive={openLogDive} />
        <CurrentsCard diveSite={diveSite} openLogDive={openLogDive} />
        <AccessCard diveSite={diveSite} />
        <DiveTypeCard diveSite={diveSite} />

        {/* <DiveSiteDetailMarketing /> */}
      </View>
    </StickyContainer>
  )
}

class DiveSiteDetailMarketing extends Component {
  render() {
    return (
    <Sticky topOffset={665}>
      {({ style }) => (
        <View style={style}>
        {/* <View style={{position: this.state.fixed ? 'absolute' : 'relative', top: this.state.positionY}} ></View> */}
          <Text style={{fontSize: 18, fontWeight: '600', marginTop: 30, marginBottom: 5, textAlign: 'center'}}>Ready to go?</Text>
          <View style={{backgroundColor: '#A00000', margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '600', margin: 20, textAlign: 'center'}}>Flights from $2,000</Text>
          </View>
          <View style={{backgroundColor: '#A00000', margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '600', margin: 20, textAlign: 'center'}}>Hotels from $120 per night</Text>
          </View>
          <View style={{backgroundColor: '#A00000', margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '600', margin: 20, textAlign: 'center'}}>Liveaboards from $154 per night</Text>
          </View>
          {/* <View style={{margin: 10, borderColor: '#DDDDDD', borderWidth: 1, marginBottom: 5}}>
            <Text style={{color: '#A00000', fontSize: 15, fontWeight: '600', margin: 20, marginVertical: 50, textAlign: 'center'}}>Featured Dive Operator</Text>
          </View> */}
        </View>
      )}
    </Sticky>
    )
  }
}

function DiveSiteDetailMap({ style, diveSite }) {
  return (
    <View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Location</Text>
        <EditButton />
      </View>
      <View style={{flexDirection: 'row', margin: 15, marginTop: 5}}>
        <Text style={{fontSize: 15}}>Belize</Text>
        <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
        <Text style={{fontSize: 15}}>Lighthouse Reef</Text>
        <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
        <Text style={{fontSize: 15}}>-41.12394948, 12.1241429</Text>
      </View>
      <View style={{width: '100%', height: 300}}>
        <DiveSiteMap diveSite={diveSite} style={style} />
      </View>
    </View>
  )
}

function AnimalsContent({ onPress }) {
  const count = 10;

  var views = []
  for (var i = 0; i < count; i++) {
    views.push(
      <AnimalsCard onPress={onPress} />
    )
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {views}
    </View>
  )
}

function AnimalsCard({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{width: 150, height: 150, backgroundColor: '#CCCCCC', marginBottom: 10}}>

    </TouchableOpacity>
  )
}

function ReviewsContent({ onPress }) {
  const count = 4;

  var views = []
  for (var i = 0; i < count; i++) {
    views.push(
      <ReviewsCard onPress={onPress} />
    )
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {views}
    </View>
  )
}

function ReviewsCard({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{width: 380, height: 250, backgroundColor: '#CCCCCC', marginBottom: 10}}>

    </TouchableOpacity>
  )
}

export default DiveSiteDetail;