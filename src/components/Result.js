import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import qs from 'qs';
import PrimaryButton from './buttons/PrimaryButton';
import PopoverButton from './buttons/PopoverButton';
import Ratings from 'react-ratings-declarative';
import Edit from './Edit';
import { connect } from "react-redux";
import { getUser } from '../redux/selectors';
import { fetchDiveSites } from '../redux/actions';
import DragAndDrop from './DragAndDrop'
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
            <View style={{flex: 1, flexDirection: 'column-reverse', justifyContent: 'flex-end', margin: 20}}>
              <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', margin: -10, marginBottom: 20}}>

                  <FlatList
                    contentContainerStyle={{flexDirection : "row", flexWrap : "wrap", justifyContent: 'space-between'}} 
                    data={diveSite.reviews}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                      <View style={{flex: 1, margin: 10, alignItems: 'center', backgroundColor: "#F6F6F6", borderColor: "#DDDDDD", borderWidth: 1}}>
                        <View style={{ width: 350, height: '100%', padding: 20}}>
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
                      </View>
                      
                    )}
                    />
                
              </View>

              <View style={{backgroundColor: '#FEFEFE', borderWidth: 1, borderColor: "#DDDDDD", height: 400, marginVertical: 20}}>
                
                {!diveSite.photos || diveSite.photos.length === 0 ? <View></View> : 
                  <View style={{flex: 1}}>
                    <Image style={{flex: 1}} source={photo.url} />
                    <View style={{position: 'absolute', bottom: 0, left: 0, alignItems: 'center', margin: 10}}>
                      
                      { diveSite.photos.length === 1 ? <View></View> : 
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity onPress={this.previewBack} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                            <Image style={{width: 30, height: 30, tintColor: '#FFFFFF'}} source={require('../assets/left.svg')} />
                          </TouchableOpacity>
                          <Text style={{color: '#FFFFFF'}}>Image {this.state.photoSelectedIndex + 1} of {diveSite.photos.length}</Text>
                          <TouchableOpacity onPress={this.previewForward} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                            <Image style={{width: 30, height: 30, tintColor: '#FFFFFF'}} source={require('../assets/right.svg')} />
                          </TouchableOpacity>
                        </View>
                      }
                      
                      <Text style={{color: '#FFFFFF'}}>Uploaded by {photo.author}</Text>
                      <Text style={{color: '#FFFFFF'}}>{new Date(photo.timestamp).toLocaleDateString("en-US")}</Text>
                    </View>
                  </View>
                  
                }
                <Details diveSite={diveSite} />
              </View>
              
              {
                !diveSite.details || !diveSite.details.description ? <View></View> :
                <View style={{marginTop: 20, marginBottom: 10}}>
                  <Text>{diveSite.details.description}</Text>
                </View>
              }

              <View style={{flexDirection: 'row'}} >
                <View>
                  <Text style={{fontSize: 28, fontWeight: '300'}}>{diveSite.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 3}}>
                    <Text style={{fontSize: 16}}>{diveSite.country}, </Text>
                    <Text style={{fontSize: 13}}>{ Number((diveSite.location.coordinates[1]).toFixed(6))}, {Number((diveSite.location.coordinates[0]).toFixed(6))}</Text>
                  </View>
                </View>
                
                <View style={{flex: 1}}></View>
                <PopoverButton popover={isAddPhoto} action={toggleAddPhoto} title={"Add Photos"} icon={isAddPhoto ? require('../assets/drop_up.svg') : require('../assets/add_photo.svg')} >
                  <View style={{width: 300, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
                    <FileList id={this.props.id} token={this.props.token} toggleAddPhoto={toggleAddPhoto} fetchDiveSite={fetchDiveSite} />
                  </View>
                </PopoverButton>
                <PopoverButton popover={isReview} action={toggleReview} title={"Review"} icon={isReview ? require('../assets/drop_up.svg') : require('../assets/review.svg')} >
                  <View style={{width: 320, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
                    <AddReview addReview={this.props.addReview} />
                  </View>
                </PopoverButton>
                <PrimaryButton action={toggleEdit} title={"Edit"}icon={require('../assets/create.svg')}  />
              </View>
              
              
            
            </View>
            
          </View>
        </ScrollView>
      </View>
    )
  }
}

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      files: [

      ],
      previews: [

      ]
    };
  }

 handleDrop = (files) => {
    let previews = this.state.previews
    for (var i = 0; i < files.length; i++) {
      var url = URL.createObjectURL(files[i])
      previews.push(url)
    }
    this.setState({
      files: files,
      previews: previews
    })
  }

  previewBack = () => {
    this.setState({
      selectedIndex: this.state.selectedIndex > 0 ? this.state.selectedIndex = (this.state.selectedIndex - 1) : 0
    });
  }

  previewForward = () => {
    this.setState({
      selectedIndex: (this.state.selectedIndex >= (this.state.files.length - 1)) ? this.state.selectedIndex : (this.state.selectedIndex + 1)
    });
  }

  upload = () => {
    console.log(this.state.files[0])
    console.log(this.state.previews[0])
    const file = this.state.files[0];
    const id = this.props.id;

    axios({
      method: 'put',
      url: 'https://www.divingscore.com/api/dive-sites/photo-upload/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.props.token
      },
      data: {
        id: id,
        fileName: file.name,
        fileType: file.type
      }

    }).then(response => {
      
      var options = {
        headers: {
          'Content-Type': file.type
        }
      };

      axios.put(response.data.data.signedRequest,file,options)
      .then(result => {
        const base = "https://divingcollective-photos.s3.us-east-2.amazonaws.com/"
        const url = base + id + "/" + file.name
        console.log(url)
        console.log("Response from s3")

        axios({
          method: 'put',
          url: 'https://www.divingscore.com/api/dive-sites/photos/',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.props.token
          },
          data: {
              id: id,
              url: url,
              author: "Rob, USA"
          }
    
        }).then(function (response) {
          this.props.fetchDiveSite()
          this.props.toggleAddPhoto()
          console.log(response)

        }.bind(this));

      })
      .catch(error => {
        console.log(error)
      })
    }
    )
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }

  render() {
    if (this.state.files.length === 0) {
      return (
        <DragAndDrop style={{flex: 1}} handleDrop={this.handleDrop}>
          <View style={{width: 300, height: 250}}>
            <View style={{flex: 1, margin: 20, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 50, height: 50, tintColor: '#FFFFFF'}} source={require('../assets/add_photo.svg')} />
              <Text style={{textAlign: 'center', marginTop: 10, color: 'white', fontSize: 16}}>Drag Photo Here</Text>
            </View>
          </View>
        </DragAndDrop>
      )
    }
    return (
      <DragAndDrop handleDrop={this.handleDrop}>
        <View>
          <Image style={{height: 250, width: 300}} source={this.state.previews[this.state.selectedIndex]} />
          {
            this.state.files.length === 1 ? <View></View> : 
            <View style={{position:'absolute', top: 220, flexDirection: 'row'}}>
              <TouchableOpacity onPress={this.previewBack} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                <Image style={{width: 18, height: 18, tintColor: '#FFFFFF'}} source={require('../assets/left.svg')} />
              </TouchableOpacity>
              <Text style={{color: '#FFFFFF'}}>Image {this.state.selectedIndex + 1} of {this.state.files.length}</Text>
              <TouchableOpacity onPress={this.previewForward} activeOpacity={1.0} style={{marginHorizontal: 5}} >
                <Image style={{width: 18, height: 18, tintColor: '#FFFFFF'}} source={require('../assets/right.svg')} />
              </TouchableOpacity>
            </View>
          }
          
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
              <View style={{width: 18, height: 18, marginHorizontal: 10, borderColor: '#FFFFFF', borderWidth: 1}} />
              <Text style={{color: 'white'}}>I certify that I own the rights to this photograph, and <span style={{textDecorationLine: 'underline'}}>agree to the T&C.</span></Text>
            </View>
            <TouchableOpacity onPress={() => this.upload()} activeOpacity={1.0} style={{marginHorizontal: 5}} >
              <Text style={{textAlign: 'center', marginVertical: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DragAndDrop>
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
        <View style={{margin: 20, alignItems: 'center'}}>
          <Ratings
            rating={this.state.rating}
            widgetRatedColors={"#FFB400"}
            widgetDimensions="22px"
            widgetSpacings="1px"
            changeRating={(rating) => this.onChangeRating(rating)}>
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
            <Ratings.Widget widgetHoverColor="#FFB400"  />
          </Ratings>
          <TextInput
            style={{ height: 40, width: '90%', color: 'white', backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 }}          
            placeholderTextColor={'white'}
            onChangeText={text => this.onChangeTextTitle(text)}
            placeholder={'Title'}
            value={this.state.title}
            />
          <TextInput
            style={{ height: 40, height: 120,  color: 'white', backgroundColor: 'gray', textAlignVertical: 'top', width: '90%', borderColor: 'gray', padding: 10, borderWidth: 1 }}
            multiline={true}
            placeholderTextColor={'white'}
            onChangeText={text => this.onChangeTextReview(text)}
            placeholder={'Comments'}
            value={this.state.review}
          />
          <TouchableOpacity onPress={() => this.addReview()}>
            <Text style={{textAlign: 'center', marginTop: 20, color: 'white', fontWeight: 'bold', fontSize: 18}}>Submit</Text>
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
      <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: 'black', opacity: 0.7}} >
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


        