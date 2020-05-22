import React, {Component} from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import GoogleMap from './GoogleMap';
import Stars from './Stars';

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
        fetch('http://localhost:8080/api/dive-sites')
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
                    {!isDiveSiteSelected ? <View></View> : 
                    <View style={{position: 'absolute', right: 20, top: 20, width: 400, backgroundColor: '#FEFEFE', shadowColor: '#000',
                    borderRadius: 10,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.4,
                    shadowRadius: 5}}>
                        <ScrollView>
                            <View style={{padding: 20}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
                                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>{selectedSite.name}</Text>
                                    <Text style={{fontSize: 20}}>{selectedSite.country}</Text>
                                    {/* <Text style={{fontSize: 15, margin: 10}}>{selectedSite.latitude}, {selectedSite.longitude}</Text> */}
                                </View>
                                <Text style={{fontSize: 18}}>{selectedSite.description}</Text>
                                <View style={{marginVertical: 30, paddingHorizontal: 60}}>
                                    <View style={{padding: 7, backgroundColor: '#111111', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{color: 'white'}}>Depth</Text>
                                        <Text style={{color: 'white', fontWeight: '700'}}>22-48 feet</Text>
                                    </View>
                                    <View style={{padding: 7, backgroundColor: '#000000', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{color: 'white'}}>Visibility</Text>
                                        <Text style={{color: 'white', fontWeight: '700'}}>100 feet</Text>
                                    </View>
                                    <View style={{padding: 7, backgroundColor: '#111111', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{color: 'white'}}>Currents</Text>
                                        <Text style={{color: 'white', fontWeight: '700'}}>None</Text>
                                    </View>
                                    <View style={{padding: 7, backgroundColor: '#000000', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{color: 'white'}}>Difficulty</Text>
                                        <Text style={{color: 'white', fontWeight: '700'}}>Novice</Text>
                                    </View>
                                    <View style={{padding: 7, backgroundColor: '#111111', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{color: 'white'}}>Access</Text>
                                        <Text style={{color: 'white', fontWeight: '700'}}>Shore</Text>
                                    </View>
                                </View>
                                {/* <View style={{flex: 1, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
                                    <Stars rating={selectedSite.rating} />
                                    <Text>(1 review)</Text>
                                </View> */}
                            </View>
                        </ScrollView>
                        <View style={{position: 'absolute', top: 20, right: 20}}>
                            <TouchableOpacity onPress={this.closeDiveSite}>
                                <Image style={{width: 30, height: 30}} source={require('../assets/close.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                        }
                    {/* <View style={{width: '25%', backgroundColor: "#FEFEFE"}}>
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
                    </View> */}
                </View>
                
            </View>
        );
    }
}

function DiveSiteCard({ site }) {
    return (
        <View style={{margin: 10, padding: 10, marginBottom: 0, backgroundColor: '#DDDDDD', borderRadius: 7, justifyContent: 'center'}}>
            <Text>{site.name}</Text>
            <Text>{site.rating}</Text>
            <Text>{site.description}</Text>
        </View>
    )
}

export default Root;