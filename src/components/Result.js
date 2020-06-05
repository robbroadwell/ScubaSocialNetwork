import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import qs from 'qs';
import PrimaryButton from './buttons/PrimaryButton';
import PopoverButton from './buttons/PopoverButton';
import Ratings from 'react-ratings-declarative';
import Edit from './Edit';
import { connect } from "react-redux";
import { getUser } from '../redux/selectors';
import { fetchDiveSites } from '../redux/actions';
const axios = require('axios')

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
    fetch('https://www.divingscore.com/api/dive-sites/details/'+`${qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id}`)
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

  addReview = (review) => {
    const {diveSite} = this.state.data
    console.log(diveSite)

    if (this.props.user.token) {
      axios({
        method: 'put',
        url: 'http://localhost:8080/api/dive-sites/reviews/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + this.props.user.token
        },
        data: {
          id: diveSite._id,
          review: review
        }
  
      }).then(function (response) {
        this.toggleReview();
        this.fetchDiveSite();
        this.props.fetchDiveSites();
      }.bind(this));
    }
  }
  
  render() {
    const {diveSite} = this.state.data

    if (this.state.isLoading || !diveSite) {
      return <Loading />
    } else if (this.state.isEditing) {
      return <Edit site={diveSite} toggleEdit={this.toggleEdit} />
    } else {
      return <Standard addReview={this.addReview} diveSite={diveSite} isAddPhoto={this.state.isAddPhoto} toggleAddPhoto={this.toggleAddPhoto} isReview={this.state.isReview} toggleReview={this.toggleReview} toggleEdit={this.toggleEdit} {...this.props} />
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
            !diveSite.details || !diveSite.details.description ? <View></View> :
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
                <AddReview addReview={this.props.addReview} />
              </View>
            </PopoverButton>
            <PrimaryButton action={toggleEdit} title={"Edit"}icon={require('../assets/create.svg')}  />
          </View>
          
          
        
        </View>
        <View style={{width: 300, margin: 20}}>
          <View style={{height: 280, borderColor: "#DDDDDD", borderWidth: 1}}>
            <Image style={{height: 275, width: 298}} source={require('../assets/weather_placeholder.png')} />
          </View>

          {
            !diveSite.reviews || diveSite.reviews.count === 0 ? <View></View> : 
            <FlatList
              style={{paddingBottom: 4}}
              data={diveSite.reviews}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View style={{height: 200, padding: 20, marginTop: 20, backgroundColor: "#F6F6F6", borderColor: "#DDDDDD", borderWidth: 1}}>
                  <Text>{item.title}</Text>
                  <Ratings
                    rating={item.rating}
                    widgetRatedColors={"#DD0000"}
                    widgetDimensions="14px"
                    widgetSpacings="1px">
                    <Ratings.Widget widgetHoverColor="#FFB400"  />
                    <Ratings.Widget widgetHoverColor="#FFB400"  />
                    <Ratings.Widget widgetHoverColor="#FFB400"  />
                    <Ratings.Widget widgetHoverColor="#FFB400"  />
                    <Ratings.Widget widgetHoverColor="#FFB400"  />
                  </Ratings>
                  <Text>{item.comment}</Text>
                  <Text>{item.author}</Text>
                  <Text>{item.timestamp}</Text>
                </View>
              )}
              />
            
          }
          
        </View>
      </View>
    )
  }
}

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      title: "",
      review: ""
    };
  }

  onChangeRating = input => {
    this.setState({ rating: input });
  };

  onChangeTextTitle = input => {
    this.setState({ title: input });
  };

  onChangeTextReview = input => {
    this.setState({ review: input });
  };

  addReview = () => {
    console.log("add")
    var review = {
      rating: this.state.rating,
      author: "Rob, USA",
      title: this.state.title,
      comment: this.state.review,
      timestamp: 111111111
    }
    this.props.addReview(review);
  }

  render() {
    return (
      <View>

        <View>
          <Ratings
            rating={this.state.rating}
            widgetRatedColors={"#FFB400"}
            widgetDimensions="14px"
            widgetSpacings="1px"
            changeRating={(rating) => this.onChangeRating(rating)}>
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
          </Ratings>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
            onChangeText={text => this.onChangeTextTitle(text)}
            placeholder={'Title'}
            value={this.state.title}
            />
          <TextInput
            style={{ height: 40, borderColor: 'gray', padding: 10, borderWidth: 1 }}
            onChangeText={text => this.onChangeTextReview(text)}
            placeholder={'Review'}
            value={this.state.review}
          />
          <TouchableOpacity onPress={() => this.addReview()}>
            <Text style={{textAlign: 'center', margin: 20, color: 'black', fontWeight: 'bold', fontSize: 18}}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

function Details({ diveSite }) {
  if (!diveSite || !diveSite.details) {
    return <View></View>
  }
  return (
    <View style={{backgroundColor: '#FEFEFE'}}>
      <View>
        <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.5}} />
        {!diveSite.details || !diveSite.details.depth ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 30, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Depth</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{diveSite.details.depth}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.access ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 30, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Access</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{diveSite.details.access}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.visibility ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 30, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Visibility</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{diveSite.details.visibility}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.currents ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 30, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Currents</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{diveSite.details.currents}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.experienceLevel ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 30, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Difficulty</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{diveSite.details.experienceLevel}</Text>
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

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  { fetchDiveSites }
)(Result);


        