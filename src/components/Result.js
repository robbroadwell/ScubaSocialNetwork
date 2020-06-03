import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import qs from 'qs';
import PrimaryButton from './buttons/PrimaryButton';
import PopoverButton from './buttons/PopoverButton';
import Edit from './Edit';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        isAddPhoto: false,
        isEditing: false,
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
    console.log('add photo')
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

  toggleEdit = () => {
    this.fetchDiveSite()
    this.setState(prevState => ({
      isReview: false,
      isAddPhoto: false,
      isEditing: !prevState.isEditing
    }));
  }
  
  render() {
    const {diveSite} = this.state.data

    if (this.state.isLoading || !diveSite || !diveSite.details) {
      return <Loading />
    } else if (this.state.isEditing) {
      return <Edit site={diveSite} toggleEdit={this.toggleEdit} />
    } else {
      return <Standard diveSite={diveSite} isAddPhoto={this.state.isAddPhoto} toggleAddPhoto={this.toggleAddPhoto} isReview={this.state.isReview} toggleReview={this.toggleReview} toggleEdit={this.toggleEdit} {...this.props} />
    }
  }
}

class Standard extends Component {
  render() {
    const {diveSite, isAddPhoto, toggleAddPhoto, isReview, toggleReview, toggleEdit} = this.props

    return (
      <View style={{flexDirection: 'row', position: 'absolute', width: '100%', height: '100%', backgroundColor: '#FEFEFE', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
        <View style={{flex: 1, flexDirection: 'column-reverse', justifyContent: 'flex-end', margin: 20, marginRight: 0}}>

          <View style={{backgroundColor: '#FEFEFE', flexDirection: 'row', justifyContent: 'flex-end', borderWidth: 1, borderColor: "#DDDDDD", height: 400, marginVertical: 20}}>
            
            <Details diveSite={diveSite} />
          </View>
          

          {
            !diveSite.details.description ? <View></View> :
            <View style={{marginTop: 20, marginBottom: 10}}>
              <Text>{diveSite.details.description}</Text>
            </View>
          }

          <View style={{flexDirection: 'row'}} >
            <Text style={{fontSize: 28, fontWeight: '300'}}>{diveSite.name}, {diveSite.country}</Text>
            <View style={{flex: 1}}></View>
            <PopoverButton popover={isAddPhoto} action={toggleAddPhoto} title={"Add Photo"} icon={isAddPhoto ? require('../assets/drop_up.svg') : require('../assets/add_photo.svg')} >
              <View style={{height: 250, width: 320, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
                <Text>Test</Text>
              </View>
            </PopoverButton>
            <PopoverButton popover={isReview} action={toggleReview} title={"Review"} icon={isReview ? require('../assets/drop_up.svg') : require('../assets/review.svg')} >
              <View style={{height: 250, width: 320, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
                <Text>Test</Text>
              </View>
            </PopoverButton>
            <PrimaryButton action={toggleEdit} title={"Edit"}icon={require('../assets/create.svg')}  />
          </View>
          
          
        
        </View>
        <View style={{width: 300, margin: 20}}>
          <View style={{height: 280, borderColor: "#DDDDDD", borderWidth: 1}}>
            <Image style={{height: 275, width: 298}} source={require('../assets/weather_placeholder.png')} />
          </View>
          
          <View style={{height: 200, padding: 20, marginTop: 20, backgroundColor: "#F6F6F6", borderColor: "#DDDDDD", borderWidth: 1}}>
            
          </View>
        </View>
      </View>
    )
  }
}

function Details({ diveSite }) {
  return (
    <View style={{backgroundColor: '#FEFEFE'}}>
      <View>
        {!diveSite.details || !diveSite.details.depth ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 20, fontSize: 16, color: 'black', fontWeight: 'bold'}}>Depth</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.depth}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.access ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 20, fontSize: 16, color: 'black', fontWeight: 'bold'}}>Access</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.access}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.visibility ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 20, fontSize: 16, color: 'black', fontWeight: 'bold'}}>Visibility</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.visibility}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.currents ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 20, fontSize: 16, color: 'black', fontWeight: 'bold'}}>Currents</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.currents}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.experienceLevel ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 20, fontSize: 16, color: 'black', fontWeight: 'bold'}}>Difficulty</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.experienceLevel}</Text>
          </View>
        }
      </View>
    </View>
  )
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


        