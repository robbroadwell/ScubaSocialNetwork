import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';
import qs from 'qs';
import PrimaryButton from '../../utility/buttons/PrimaryButton';
import PopoverButton from '../../utility/buttons/PopoverButton';
import Edit from './Edit';
import { connect } from "react-redux";
import { getUser } from '../../redux/selectors';
import { fetchDiveSites } from '../../redux/actions';
import ImageUpload from './ImageUpload'
import AddReview from './AddReview'
import ReviewsList from './ReviewsList'
import ResultDetails from './ResultDetails'
const axios = require('axios')

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        isAddPhoto: false,
        isEditing: false,
        isReview: false,
        photoSelectedIndex: 0,
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
        url: 'https://www.divingscore.com/api/dive-sites/reviews/',
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
      return <Standard fetchDiveSite={this.fetchDiveSite} id={qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id} token={this.props.user.token} addReview={this.addReview} diveSite={diveSite} isAddPhoto={this.state.isAddPhoto} toggleAddPhoto={this.toggleAddPhoto} isReview={this.state.isReview} toggleReview={this.toggleReview} toggleEdit={this.toggleEdit} {...this.props} />
    }
  }
}

class Standard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        photoSelectedIndex: 0
    };
  }

  previewBack = () => {
    const {diveSite} = this.props
    this.setState({
      photoSelectedIndex: this.state.photoSelectedIndex > 0 ? this.state.photoSelectedIndex = (this.state.photoSelectedIndex - 1) : 0
    });
  }

  previewForward = () => {
    const {diveSite} = this.props
    this.setState({
      photoSelectedIndex: (this.state.photoSelectedIndex >= (diveSite.photos.length - 1)) ? this.state.photoSelectedIndex : (this.state.photoSelectedIndex + 1)
    });
  }

  render() {
    
    const {diveSite, isAddPhoto, toggleAddPhoto, isReview, toggleReview, toggleEdit, fetchDiveSite} = this.props
    const photo = diveSite.photos[this.state.photoSelectedIndex]
    return (
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#000000', opacity: 0.8}} />
        <ScrollView style={{position: 'absolute', width: '100%', height: '100%'}}>
          <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#FEFEFE', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
            <View style={{flex: 1, flexDirection: 'column-reverse', margin: 20, marginBottom: 0}}>
              <ReviewsList reviews={diveSite.reviews} />
              

              <View style={{backgroundColor: '#FEFEFE', borderWidth: 1, borderColor: "#DDDDDD", height: 400, marginVertical: 20}}>
                
                {!diveSite.photos || diveSite.photos.length === 0 ? <View></View> : 
                  <View style={{flex: 1}}>
                    <Image style={{flex: 1}} source={photo.url} />
                    <View style={{position: 'absolute', bottom: 0, left: 0, alignItems: 'center', margin: 10}}>
                      
                      { diveSite.photos.length === 1 ? <View></View> : 
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity onPress={this.previewBack} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                            <Image style={{width: 30, height: 30, tintColor: '#FFFFFF'}} source={require('../../assets/left.svg')} />
                          </TouchableOpacity>
                          <Text style={{color: '#FFFFFF'}}>Image {this.state.photoSelectedIndex + 1} of {diveSite.photos.length}</Text>
                          <TouchableOpacity onPress={this.previewForward} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                            <Image style={{width: 30, height: 30, tintColor: '#FFFFFF'}} source={require('../../assets/right.svg')} />
                          </TouchableOpacity>
                        </View>
                      }
                      
                      <Text style={{color: '#FFFFFF'}}>Uploaded by {photo.author.username}</Text>
                      <Text style={{color: '#FFFFFF'}}>{new Date(photo.timestamp).toLocaleDateString("en-US")}</Text>
                    </View>
                  </View>
                  
                }
                <ResultDetails diveSite={diveSite} />
              </View>
              
              {
                !diveSite.details || !diveSite.details.description || diveSite.details.description.length === 0 ? <View></View> :
                <View style={{marginTop: 20, marginBottom: 10}}>
                  <Text>{diveSite.details.description[diveSite.details.description.length - 1].content}</Text>
                </View>
              }

              <View style={{flexDirection: 'row'}} >
                <View>
                  <Text style={{fontSize: 28, fontWeight: '300'}}>{diveSite.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 3}}>
                    <Text style={{fontSize: 16}}>{diveSite.country}, </Text>
                    <Text style={{fontSize: 13}}>{Number((diveSite.location.coordinates[1]).toFixed(6))}, {Number((diveSite.location.coordinates[0]).toFixed(6))}</Text>
                  </View>
                </View>
                
                <View style={{flex: 1}}></View>
                <PopoverButton popover={isAddPhoto} action={toggleAddPhoto} title={"Add Photos"} icon={isAddPhoto ? require('../../assets/drop_up.svg') : require('../../assets/add_photo.svg')} >
                  <View style={{width: 300, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
                    <ImageUpload id={this.props.id} token={this.props.token} toggleAddPhoto={toggleAddPhoto} fetchDiveSite={fetchDiveSite} />
                  </View>
                </PopoverButton>
                <PopoverButton popover={isReview} action={toggleReview} title={"Review"} icon={isReview ? require('../../assets/drop_up.svg') : require('../../assets/review.svg')} >
                  <View style={{width: 320, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
                    <AddReview addReview={this.props.addReview} />
                  </View>
                </PopoverButton>
                <PrimaryButton action={toggleEdit} title={"Edit"}icon={require('../../assets/create.svg')}  />
              </View>
            </View>
            
          </View>
        </ScrollView>
      </View>
    )
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

const mapStateToProps = state => {
  const user = getUser(state);
  return { user };
};

export default connect(
  mapStateToProps,
  { fetchDiveSites }
)(Result);


        