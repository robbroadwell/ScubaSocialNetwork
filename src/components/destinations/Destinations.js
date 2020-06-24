import React, {Component} from 'react';
import { View, Text } from 'react-native';
import DestinationCard from './DestinationCard';
import { getTopDestinations } from '../../redux/selectors';
import { connect } from "react-redux";

class Destinations extends Component {

  render() {
    return (
      <View style={{margin: 10}}>
        <DestinationContent destinations={this.props.destinations} navigateDestination={(destination) => this.props.history.push(`/destinations/` + destination._id)} />
      </View>
    )
  }
}

function DestinationContent({ destinations, navigateDestination }) {

  var views = []

  for (var i = 0; i < destinations.length; i++) {
    views.push(
      <DestinationCard destination={destinations[i]} navigateDestination={navigateDestination} />
    )
  }

  return (
    <View style={{margin: 10}}>
      {/* <Text style={{fontSize: 18, fontWeight: '700', color: '#222222', margin: 10}}>Top Destinations</Text>  */}
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginHorizontal: 5}}>
        {views}
      </View>
    </View>
  )
}


const mapStateToProps = state => {
  const destinations = getTopDestinations(state);
  return { destinations };
};

export default connect(
  mapStateToProps,
  {  }
)(Destinations);

