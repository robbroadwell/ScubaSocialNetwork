import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

function DestinationCard({ destination, navigateDestination }) {
  return (
    <TouchableOpacity onPress={() => navigateDestination(destination)}  style={{flex: 1, margin: 10, minWidth: 250, minHeight: 200, marginHorizontal: 10, shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 5}}>
      <Image style={{flex: 1}} source={destination.urlThumbnail} />
      <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {!destination.isTop ? <View></View> : 
        <View style={{position: 'absolute', top: 5, right: 5, backgroundColor: 'red', shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 5}}>
          <Text style={{color: 'white', fontWeight: '700', padding: 5}}>TOP</Text>
        </View>
        }
        <Text style={{color: 'white', fontSize: 24, fontWeight: '900', textAlign: 'center', textShadowColor: '#000000', textShadowRadius: 5}}>{destination.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default DestinationCard;