import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
import PhotosContent from './PhotosContent';

class Photos extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{width: 250, borderColor: '#CCCCCC', borderRightWidth: 1, alignItems: 'stretch', marginRight: 5}}>
          <View style={{padding: 20, marginHorizontal: 10, borderColor: '#CCCCCC', borderBottomWidth: 1}}>
            <View style={{flexDirection: 'row', paddingVertical: 5, backgroundColor: '#DDDDDD', borderRadius: 7}}>
              <Image style={{width: 20, height: 20, marginHorizontal: 15}} source={require('../../assets/upvote.svg')} />
              <Text style={{fontWeight: '600'}}>Best Photos</Text>
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 5, borderRadius: 7, marginTop: 5}}>
              <Image style={{width: 20, height: 20, marginHorizontal: 15}} source={require('../../assets/eye.svg')} />
              <Text>Most Viewed</Text>
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 5, borderRadius: 7, marginTop: 5}}>
              <Image style={{width: 20, height: 20, marginHorizontal: 15}} source={require('../../assets/talk.svg')} />
              <Text>Most Commented</Text>
            </View>
          </View>
          <View style={{padding: 20, marginHorizontal: 10, borderColor: '#CCCCCC', borderBottomWidth: 1}}>
            <View style={{flexDirection: 'row', paddingVertical: 5, backgroundColor: '#DDDDDD', borderRadius: 7}}>
              <Text style={{fontWeight: '600', textAlign: 'center', flex: 1}}>This Week</Text>
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 5, borderRadius: 7, marginTop: 5}}>
              <Text style={{textAlign: 'center', flex: 1}}>This Month</Text>
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 5, borderRadius: 7, marginTop: 5}}>
              <Text style={{textAlign: 'center', flex: 1}}>This Year</Text>
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 5, borderRadius: 7, marginTop: 5}}>
              <Text style={{textAlign: 'center', flex: 1}}>All Time</Text>
            </View>
          </View>
          
        </View>
        <View style={{flex: 1}}>
          <PhotosContent count={12} onPress={() => this.props.history.push(`/photos/418596049`)} />
        </View>
      </View>
    )
  }
}

export default Photos;