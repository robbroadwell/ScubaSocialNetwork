import React, {Component} from 'react';
import { View, Text } from 'react-native';
import DestinationCard from './DestinationCard';
import { fetchTopDestinations } from "../../redux/actions";
import { getTopDestinations } from '../../redux/selectors';
import { connect } from "react-redux";

class Destinations extends Component {
  componentWillMount() {
    this.props.fetchTopDestinations()
  }

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
  { fetchTopDestinations }
)(Destinations);

