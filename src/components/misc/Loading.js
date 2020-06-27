import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function Loading() {
  return (
     <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.8, justifyContent: 'center', alignItems: 'center'}}>
       <ActivityIndicator />
     </View>
   )
 }
 export default Loading;