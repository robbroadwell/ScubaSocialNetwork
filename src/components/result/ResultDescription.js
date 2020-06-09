import React from 'react';
import { View, Text} from 'react-native';

function ResultDescription({ diveSite }) {
  if (!diveSite.details || !diveSite.details.description || diveSite.details.description.length === 0) {
    return <View></View>
  }

  return (
    <View style={{marginTop: 20, marginBottom: 10}}>
      <Text>{diveSite.details.description[diveSite.details.description.length - 1].content}</Text>
    </View>
  )
}

export default ResultDescription;