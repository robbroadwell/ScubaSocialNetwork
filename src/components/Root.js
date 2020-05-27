import React, {Component} from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
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
          user: null
        };
      }

      componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search);
      }

      selectDiveSite = (diveSite) => {
        ReactGA.event({
            category: 'Dive Site',
            action: 'Viewed [' + diveSite.id + ']'
          });
          
        this.setState({ 
            selectedSite: (this.state.selectedSite._id == diveSite._id) ? [] : diveSite
        })

      }

      searchForDiveSites = (coordinates) => {
          console.log(coordinates);

        fetch('https://www.divingscore.com/api/dive-sites?polygon='+`${coordinates}`)
          .then((response) => response.json())
          .then((json) => {
            this.setState({ diveSites: json });
          })
          .catch((error) => console.error(error))
          .finally(() => {
            this.setState({ isLoading: false });
          });
      }

    render() {
        const { diveSites, isLoading, selectedSite } = this.state;

        return (
            <View style={{height: '100vh', flexDirection: 'column'}}>
                <Header user={this.state.user} />
                <Body diveSites={diveSites} isLoading={isLoading} selectDiveSite={this.selectDiveSite} selectedSite={selectedSite} searchForDiveSites={this.searchForDiveSites} />
                {/* <Login /> */}
            </View>
        );
    }
}

function Login({ hidden }) {
    const [valueUsername, onChangeTextUsername] = React.useState('Username');
    const [valuePassword, onChangeTextPassword] = React.useState('Password');

    if (hidden) {
        return <View></View>
    }



    return (
        <View style={{opacity: 1, position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{position: 'absolute', width: '100%', height: '100%', left: 0, right: 0, backgroundColor: 'black', opacity: 0.8}} />
            <View style={{position: 'absolute', backgroundColor: 'white', padding: 100, paddingBottom: 60}}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                    onChangeText={text => onChangeTextUsername(text)}
                    value={valueUsername}
                    />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', padding: 10, borderWidth: 1 }}
                    onChangeText={text => onChangeTextPassword(text)}
                    value={valuePassword}
                />
                <TouchableOpacity>
                    <Text style={{textAlign: 'center', margin: 20, color: 'black', fontWeight: 'bold', fontSize: 18}}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function Header({ user }) {
    return (
        <View style={{backgroundColor: "#1d1d1e", flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 40, height: 28, margin: 15, marginLeft: 15}} source={require('../assets/flag.png')} />
            <Image style={{width: 200, height: 38, margin: 5}} source={require('../assets/logo_alt.svg')} />
            
            <View style={{flex: 1}}>
                <TouchableOpacity>
                    <Text style={{textAlign: 'right', margin: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>{ user ? user.username : "Login"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function Body({ diveSites, isLoading, selectDiveSite, selectedSite, searchForDiveSites }) {

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
                <GoogleMap data={diveSites} select={(diveSite) => selectDiveSite(diveSite)} mapMoved={(geometry) => searchForDiveSites(geometry)} />
            </View>
            
            <View style={{width: '33%', minWidth: 450, backgroundColor: "#CCCCCC"}}>
                <ScrollView>
                    {isLoading ? <View style={{flex: 1}}><ActivityIndicator/></View> : 
                    <FlatList
                        style={{paddingBottom: 10}}
                        data={diveSites}
                        keyExtractor={({ id }, index) => id}
                        extraData={selectedSite}
                        renderItem={({ item }) => (
                        <DiveSiteCard site={item} onPress={() => selectDiveSite(item)} selected={selectedSite._id === item._id} />
                        )}
                    />
                    }
                </ScrollView>
            </View>
        </View>
    )
}

function DiveSiteCard({ site, selected, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1.0}>
            <View style={{margin: 5, marginBottom: 0, padding: 20, backgroundColor: '#FEFEFE', shadowColor: '#000',
                borderColor: "#A00000",
                borderRadius: 3,
                // borderWidth: selected ? 2 : 0,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 5}}>
                {selected ? <DiveSiteCardExpanded site={site} /> : <DiveSiteCardCollapsed site={site} />}
            </View>
        </TouchableOpacity>   
    )
}

function DiveSiteCardCollapsed({ site }) {
    return (
        <View>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{site.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 5}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{site.country}, </Text>
                        <Text style={{fontSize: 16}}>{site.location.coordinates[1]}, {site.location.coordinates[0]}</Text>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <Stars rating={site.score} />
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#000000', fontSize: 16, fontWeight: 'bold'}}>{(Math.round(site.rating * 100) / 100).toFixed(2)}</Text>
                            <Text style={{marginLeft: 5}}>(1 review)</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

function DiveSiteCardExpanded({ site }) {
    return (
        <View>
            <DiveSiteCardCollapsed site={site} />
            
            {!site.description ? <View></View> : 
                <Text style={{fontSize: 18, marginTop: 20}}>{site.description}</Text>
            }

            <View style={{marginTop: 20}}>
                {!site.depth ? <View></View> : 
                    <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Depth</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>{site.depth}</Text>
                    </View>
                }
                {!site.visibility ? <View></View> : 
                    <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Visibility</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>{site.visibility}</Text>
                    </View>
                }
                {!site.access ? <View></View> : 
                    <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Access</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>{site.access}</Text>
                    </View>
                }
            </View>
        </View>
    )
}

export default Root;