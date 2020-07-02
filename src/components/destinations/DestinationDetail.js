import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Map from '../explore/map/Map';
import StyledLink from '../buttons/StyledLink';
import PhotosContent from '../photos/PhotosContent';
import MapFilters from '../explore/map/MapFilters';
import BaseURL from '../../utility/BaseURL';

class DestinationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        data: [],
    };
  }

  componentDidMount() {
    this.fetchDestination()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.fetchDestination()
    }
  }

  fetchDestination = () => {
    fetch(BaseURL() + '/api/destinations/'+ this.props.match.params.id )
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({ data: json[0] });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{height: 700, margin: 20}}>
          <View style={{flexDirection: 'row'}}>

            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 30, fontWeight: '700', color: 'black'}}>{this.state.data.name}</Text>
                {!this.state.data.isTop ? <View></View> :
                  <View style={{marginLeft: 15, justifyContent: 'center'}}>
                    <View style={{backgroundColor: '#A00000'}}>
                      <Text style={{padding: 5, color: 'white'}}>TOP</Text>
                    </View>
                  </View>
                }
              </View>

              <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 10}}>
                <StyledLink to="/destinations">Destinations</StyledLink>
                <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
                {this.props.match.params.idRegion ? <StyledLink to="/destinations/belize">{this.state.data.name}</StyledLink> : <Text style={{fontSize: 16}}>{this.state.data.name}</Text>}
              </View>
            </View>
            
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
            <Map style={this.props.style} history={this.props.history} country={this.state.data} />
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{flex: 1}} />
            <Text style={{marginRight: 5}}>Are we missing something?</Text>
            <TouchableOpacity onPress={() => this.props.history.push('/add-dive-site/')}>
              <Text style={{textDecorationLine: 'underline', color: '#A00000'}}>Add a dive site</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default DestinationDetail;