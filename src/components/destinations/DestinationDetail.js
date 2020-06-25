import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import List from '../explore/list/List';
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

  // componentDidUpdate = (prevProps) => {
  //   if (this.props.location.pathname !== prevProps.location.pathname) {
  //     this.fetchDestination()
  //   }
  // }

  fetchDestination = () => {
    console.log(this.props.match.params.id)
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

        <View style={{height: 500, margin: 20}}>
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
                {/* <Image style={{width: 20, height: 20}} source={require('../../assets/right.svg')} />
                {this.props.match.params.idRegion ? <Text style={{fontSize: 16}}>Lighthouse Reef</Text> : <StyledLink to="/destinations/belize/lighthouse-reef">Select Region</StyledLink>} */}
              </View>
            </View>
            
            {/* <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <MapFilters />
            </View> */}
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
            <List style={this.props.style} history={this.props.history} />
            {this.props.map}
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{flex: 1}} />
            <Text style={{marginRight: 5}}>Are we missing something?</Text>
            <TouchableOpacity onPress={() => this.props.history.push('/add-dive-site/')}>
              <Text style={{textDecorationLine: 'underline', color: '#A00000'}}>Add a dive site</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{margin: 20, marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black', marginBottom: 10}}>Recent Photos in {this.state.data.name}</Text> 
          <PhotosContent />
        </View>

        {/* <View style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Animals Seen in Belize</Text> 
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
          </View>
        </View> */}

        {/* <View style={{margin: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>Top Liveaboards in Belize</Text> 
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10}}>
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
            <View style={{margin: 10, minWidth: 200, minHeight: 200, backgroundColor: 'grey'}} />
          </View>
        </View> */}
      </View>
    )
  }
}

export default DestinationDetail;