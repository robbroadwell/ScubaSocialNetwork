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

        <View style={{height: 1100}}>
          <View>
            <Image style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} source={require('../../assets/thailand.jpeg')} />
            <View style={{height: 550, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 70, fontWeight: '700', color: 'white', textShadowColor: '#00000070', textShadowRadius: 15}}>{this.state.data.name}</Text>
            </View>

            {/* <View>
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
            </View> */}

            {/* <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <MapFilters />
            </View> */}
            
          </View>

          <View style={{flex: 1, flexDirection: 'row', margin: 20}}>
            <Map style={this.props.style} history={this.props.history} country={this.state.data} />
            <View style={{position: 'absolute', bottom: 15, right: 68, padding: 5, opacity: 0.85, backgroundColor: 'red', flexDirection: 'row', marginTop: 5}}>
              <View style={{flex: 1}} />
              <Text style={{marginRight: 5, color: 'white'}}>Are we missing something?</Text>
              <TouchableOpacity onPress={() => this.props.history.push('/add-dive-site/')}>
                <Text style={{textDecorationLine: 'underline', fontWeight: '700', color: 'white'}}>Add a dive site</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={{margin: 15}}>
          <PhotosContent count={20} onPress={() => this.props.history.push(`/photos/418596049`)} />
        </View> */}
      </View>
    )
  }
}

export default DestinationDetail;