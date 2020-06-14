import React from 'react';
import { View, Text} from 'react-native';

function ResultTitle({ diveSite }) {
  return (
    <View>
      <Text style={{fontSize: 28, fontWeight: '300'}}>{diveSite.name}</Text>
      <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 3}}>
        <Text style={{fontSize: 16}}>{diveSite.country}, </Text>
        <Text style={{fontSize: 13}}>{Number((diveSite.location.coordinates[1]).toFixed(6))}, {Number((diveSite.location.coordinates[0]).toFixed(6))}</Text>
      </View>
    </View>
  )
}

export default ResultTitle;