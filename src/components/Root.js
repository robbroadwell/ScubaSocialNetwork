import React, {Component} from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import GoogleMap from './GoogleMap';
import Stars from './Stars';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-88100612-2');

class Root extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          diveSites: [],
          selectedSite: [],
          isLoading: true,
          isDiveSiteSelected: true
        };
      }

      componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search);

        fetch('https://www.divingscore.com/api/dive-sites')
          .then((response) => response.json())
          .then((json) => {
            this.setState({ diveSites: json });
            this.selectDiveSite(json[0])
          })
          .catch((error) => console.error(error))
          .finally(() => {
            this.setState({ isLoading: false });
          });
      }

      selectDiveSite = (diveSite) => {
        ReactGA.event({
            category: 'Dive Site',
            action: 'Viewed [' + diveSite.id + ']'
          });
          
        this.setState({ 
            selectedSite: diveSite,
            isDiveSiteSelected: true
        })
      }

      closeDiveSite = () => {
          this.setState({
            isDiveSiteSelected: false
          })
      }

    render() {
        const { diveSites, isLoading, selectedSite, isDiveSiteSelected } = this.state;
        return (
            <View style={{height: '100vh', flexDirection: 'column'}}>
                <View style={{backgroundColor: "#1d1d1e", flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 40, height: 28, margin: 15, marginLeft: 15}} source={require('../assets/flag.png')} />
                    <Image style={{width: 200, height: 38, margin: 5}} source={require('../assets/logo_alt.svg')} />
                    
                    {/* <View style={{flex: 1}}>
                        <TouchableOpacity>
                            <Text style={{textAlign: 'right', margin: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Add Dive Site</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <GoogleMap data={diveSites} select={(diveSite) => this.selectDiveSite(diveSite)} />
                    </View>
                    
                    <View style={{width: '33%', minWidth: 450, backgroundColor: "#CCCCCC"}}>
                        <ScrollView>
                            {isLoading ? <View style={{flex: 1}}><ActivityIndicator/></View> : 
                            
                            <FlatList
                                data={diveSites}
                                keyExtractor={({ id }, index) => id}
                                renderItem={({ item }) => (
                                <DiveSiteCard site={item} />
                                )}
                            />

                            }
                        </ScrollView>
                    </View>
                </View>
                
            </View>
        );
    }
}

function DiveSiteCard({ site }) {
    return (
        <View style={{margin: 10, padding: 20, backgroundColor: '#FEFEFE'}}>
            <View style={{marginBottom: 20, flexDirection: 'row'}}>
                <View>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>{site.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 5}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{site.country}, </Text>
                        <Text style={{fontSize: 16}}>{site.latitude}, {site.longitude}</Text>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <Stars rating={site.score} />
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold'}}>{(Math.round(site.rating * 100) / 100).toFixed(2)}</Text>
                            <Text style={{marginLeft: 5}}>(1 review)</Text>
                        </View>
                    </View>
                </View>
                
                {/* <Text style={{fontSize: 15, margin: 10}}>{selectedSite.latitude}, {selectedSite.longitude}</Text> */}
            </View>
            <Text style={{fontSize: 18}}>{site.description}</Text>
            <View style={{marginTop: 20}}>
                <View style={{padding: 7, backgroundColor: '#DEDEDE', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Depth</Text>
                    <Text style={{fontSize: 16, color: 'black'}}>30 - 50 meters</Text>
                </View>
                <View style={{padding: 7, backgroundColor: '#FEFEFE', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Visibility</Text>
                    <Text style={{fontSize: 16, color: 'black'}}>~ 30 meters</Text>
                </View>
                <View style={{padding: 7, backgroundColor: '#DEDEDE', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Access</Text>
                    <Text style={{fontSize: 16, color: 'black'}}>Boat</Text>
                </View>
            </View>
        </View>
    )
}

export default Root;