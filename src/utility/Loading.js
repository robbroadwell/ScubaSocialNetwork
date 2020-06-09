import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function Loading() {
  return (
   <View style={{position: 'absolute', width: '100%', height: '100%', padding: 20, backgroundColor: '#FEFEFE', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <ActivityIndicator />
     </View>
   </View>
   )
 }
 export default Loading;