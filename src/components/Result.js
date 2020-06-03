import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import qs from 'qs';
import PrimaryButton from './buttons/PrimaryButton';
import PopoverButton from './buttons/PopoverButton';
import DiveSiteReviews from './DiveSiteReviews';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        isAddPhoto: false,
        isReview: false,
        data: [],
    };
  }

  componentDidMount() {
    this.fetchDiveSite()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log("fetch")
      this.fetchDiveSite()
    }
  }


  fetchDiveSite = () => {
    fetch('http://localhost:8080/api/dive-sites/details/'+`${qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id}`)
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

  rating = () => {
    const {diveSite} = this.state.data

    if (!diveSite.reviews || diveSite.reviews.length === 0) {
      return 0
    }

    var total = 0;
    var x;

    for (x in diveSite.reviews) {
      total = total + diveSite.reviews[x].rating
    }

    return total / diveSite.reviews.length
  }

  reviews = () => {
    const {diveSite} = this.state.data

    if (!diveSite || !diveSite.reviews) {
      return 0
    }
    return diveSite.reviews.length
  }

  toggleAddPhoto = () => {
    this.setState(prevState => ({
      isAddPhoto: !prevState.isAddPhoto,
      isReview: false
    }));
  };

  toggleReview = () => {
    this.setState(prevState => ({
      isReview: !prevState.isReview,
      isAddPhoto: false
    }));
  };
  

  render() {
    const {diveSite} = this.state.data

    console.log(diveSite)

    if (this.state.isLoading || !diveSite || !diveSite.details) {
      return <Loading />
    } else {
      return (
        <View style={{flexDirection: 'row', position: 'absolute', width: '100%', height: '100%', backgroundColor: '#FEFEFE', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
          <View style={{flex: 1, flexDirection: 'column-reverse', justifyContent: 'flex-end', margin: 20, marginRight: 0}}>
            <View style={{marginBottom: 20, flexDirection: 'row'}}>
              <View style={{flex: 1, backgroundColor: '#FEFEFE', borderWidth: 1, borderColor: "#DDDDDD", height: 200, marginBottom: 20, marginRight: 10}}>

              </View>
              <View style={{flex: 1, backgroundColor: '#FEFEFE', borderWidth: 1, borderColor: "#DDDDDD", height: 200, marginBottom: 20, marginLeft: 10}}>
                
              </View>
            </View>

            <View style={{backgroundColor: '#FEFEFE', borderWidth: 1, borderColor: "#DDDDDD", height: 400, marginVertical: 20}}>

            </View>
            

            {
              !diveSite.details.description ? <View></View> :
              <View style={{marginTop: 20, marginBottom: 10}}>
                <Text>{diveSite.details.description}</Text>
              </View>
            }

            <View style={{flexDirection: 'row'}} >
              <Text style={{fontSize: 28, fontWeight: '200'}}>{diveSite.name}, {diveSite.country}</Text>
              <View style={{flex: 1}}></View>
              <PopoverButton popover={this.state.isAddPhoto} action={this.toggleAddPhoto} title={"Add Photo"} icon={this.state.isAddPhoto ? require('../assets/drop_up.svg') : require('../assets/add_photo.svg')} >
                <View style={{height: 250, width: 320, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
                  <Text>Test</Text>
                </View>
              </PopoverButton>
              <PopoverButton popover={this.state.isReview} action={this.toggleReview} title={"Review"} icon={this.state.isReview ? require('../assets/drop_up.svg') : require('../assets/review.svg')} >
                <View style={{height: 250, width: 320, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
                  <Text>Test</Text>
                </View>
              </PopoverButton>
              <PrimaryButton title={"Edit"}icon={require('../assets/create.svg')}  />
            </View>
            
            
          
          </View>
          <View style={{width: 300, margin: 20}}>
            <View style={{height: 280, borderColor: "#DDDDDD", borderWidth: 1}}>
              <Image style={{height: 275, width: 298}} source={require('../assets/weather_placeholder.png')} />
            </View>
            
            <View style={{height: 200, padding: 20, marginTop: 20, backgroundColor: "#F6F6F6", borderColor: "#DDDDDD", borderWidth: 1}}>
              
            </View>
            <View style={{height: 200, padding: 20, marginTop: 20, backgroundColor: "#F6F6F6", borderColor: "#DDDDDD", borderWidth: 1}}>
              
            </View>
            <View style={{height: 200, padding: 20, marginTop: 20, marginBottom: 20, backgroundColor: "#F6F6F6", borderColor: "#DDDDDD", borderWidth: 1}}>
              
            </View>
          </View>
        </View>
      )
    }
  }
}

function Loading() {
 return (
  <View style={{position: 'absolute', width: '100%', height: '100%', padding: 20, backgroundColor: '#FEFEFE', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  </View>
  )
}

export default Result


{/* <View style={{position: 'absolute', width: '100%', height: '100%', padding: 20, backgroundColor: '#FEFEFE', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
        {!diveSite.details || !diveSite.details.description ? <View></View> :
          <Text style={{fontSize: 18, marginTop: 20}}>{diveSite.details.description}</Text>
        }
        <View style={{marginTop: 20}}>
          {!diveSite.details || !diveSite.details.depth ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Depth</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.depth}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.access ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Access</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.access}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.visibility ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Visibility</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.visibility}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.currents ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Currents</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.currents}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.airTemperature ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Air Temperature</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.airTemperature}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.waterTemperature ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Water Temperature</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.waterTemperature}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.experienceLevel ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Experience Level</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.experienceLevel}</Text>
            </View>
          }

          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Image style={{height: 20, width: 20, margin: 10, marginRight: 5, marginTop: 20, tintColor: '#A00000'}} source={require('../assets/create.svg')} />
            <Text style={{color: '#A00000', fontWeight: 'bold', marginTop: 8, marginRight: 5}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View> */}