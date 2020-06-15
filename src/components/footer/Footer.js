import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';

class Footer extends Component {
  render() {
    return (
      <View>
        <FooterActions />
        <View style={{backgroundColor: 'black'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
            <Image style={{width: 150, height: 45, marginRight: 10}} source={require('../../assets/appStoreIos.gif')} />
            <Image style={{width: 150, height: 45}} source={require('../../assets/appStoreAndroid.gif')} />
          </View>
          <View style={{marginTop: 30, marginBottom: 60}}>
            <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#DDDDDD'}}>© 2020, Broadwell LLC, or its affiliates</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => this.props.history.push(`/conditions`)}>
                <Text style={{fontSize: 12, textAlign: 'center',color: '#DDDDDD', marginLeft: 10}}>Conditions of Use</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.history.push(`/privacy`)}>
                <Text style={{fontSize: 12, textAlign: 'center',color: '#DDDDDD', marginLeft: 10}}>Privacy Notice</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.history.push(`/contact`)}>
                <Text style={{fontSize: 12, textAlign: 'center',color: '#DDDDDD', marginLeft: 10}}>Contact Us</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

function FooterActions() {
  return (
    <View style={{margin: 20, marginBottom: 40, borderTopColor: '#CCCCCC', borderTopWidth: 1, paddingTop: 40, flexDirection: 'row', height: 450}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image style={{flex: 1}} source={require('../../assets/mobile.jpg')} />
        <Text style={{fontSize: 24, textAlign: 'center', marginTop: 20, marginBottom: 5}}>Maps as mobile as you are</Text>
        <Text style={{fontSize: 14, textAlign: 'center', marginHorizontal: 50}}>Never lose the trail, even if you lose your cell signal. Our app was designed to work offline.</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
          <View style={{backgroundColor: '#A00000'}}>
            <Text style={{padding: 15, color: 'white'}}>Download the App</Text>
          </View>
        </View>
      </View>
      <View style={{width: 20}} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image style={{flex: 1}} source={require('../../assets/you.jpg')} />
        <Text style={{fontSize: 24, textAlign: 'center', marginTop: 20, marginBottom: 5}}>Add your favorite dive sites</Text>
        <Text style={{fontSize: 14, textAlign: 'center', marginHorizontal: 50}}>Join the thousands of riders who’ve shared their most treasured trails with the MTB Project community.</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
          <View style={{backgroundColor: '#A00000'}}>
            <Text style={{padding: 15, color: 'white'}}>Add a dive site</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Footer;