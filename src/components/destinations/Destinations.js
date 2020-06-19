import React, {Component} from 'react';
import { View } from 'react-native';
import DestinationCard from './DestinationCard';

class Destinations extends Component {
  render() {
    return (
      <View style={{margin: 10}}>
        <DestinationContent onPress={() => this.props.history.push(`/destinations/belize`)} />
      </View>
    )
  }
}

function DestinationContent({ onPress }) {
  const destinations = [
    {
      name: "Mexico",
      image: require('../../assets/mexico.jpg'),
      isTop: true
    },
    {
      name: "Belize",
      image: require('../../assets/belize.jpg'),
      isTop: true
    },
    {
      name: "Fiji",
      image: require('../../assets/fiji.jpg'),
      isTop: true
    },
    {
      name: "Australia",
      image: require('../../assets/australia.jpeg'),
      isTop: true
    },
    {
      name: "Belize",
      image: require('../../assets/belize.jpg'),
      isTop: true
    },
    {
      name: "Fiji",
      image: require('../../assets/fiji.jpg'),
      isTop: true
    },
    {
      name: "Australia",
      image: require('../../assets/australia.jpeg'),
      isTop: true
    },
    {
      name: "Mexico",
      image: require('../../assets/mexico.jpg'),
      isTop: true
    },
    {
      name: "Belize",
      image: require('../../assets/belize.jpg'),
      isTop: false
    },
    {
      name: "Australia",
      image: require('../../assets/australia.jpeg'),
      isTop: false
    },
    {
      name: "Mexico",
      image: require('../../assets/mexico.jpg'),
      isTop: false
    },
    {
      name: "Belize",
      image: require('../../assets/belize.jpg'),
      isTop: false
    },
    {
      name: "Fiji",
      image: require('../../assets/fiji.jpg'),
      isTop: false
    },
    {
      name: "Australia",
      image: require('../../assets/australia.jpeg'),
      isTop: false
    },
    {
      name: "Fiji",
      image: require('../../assets/fiji.jpg'),
      isTop: false
    },
    {
      name: "Belize",
      image: require('../../assets/belize.jpg'),
      isTop: false
    },
    
  ]

  var views = []
  for (var i = 0; i < destinations.length; i++) {
    views.push(
      <DestinationCard country={destinations[i].name} image={destinations[i].image} isTop={destinations[i].isTop} onPress={onPress} />
    )
  }

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {views}
    </View>
  )
}

export default Destinations;