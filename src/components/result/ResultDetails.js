import React from 'react';
import { View, Text } from 'react-native';

function ResultDetails({ diveSite }) {
  if (!diveSite || !diveSite.details) {
    return <View></View>
  }
  return (
      <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: 'black', opacity: 0.7}} >
        {!diveSite.details || !diveSite.details.depth || diveSite.details.depth.length === 0 ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 30, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Depth</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{diveSite.details.depth[diveSite.details.depth.length - 1].content}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.visibility || diveSite.details.visibility.length === 0 ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 30, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Visibility</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{diveSite.details.visibility[diveSite.details.visibility.length - 1].content}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.difficulty || diveSite.details.difficulty.length === 0 ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 30, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Difficulty</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{diveSite.details.difficulty[diveSite.details.difficulty.length - 1].content}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.currents || diveSite.details.currents.length === 0 ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 30, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Currents</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{diveSite.details.currents[diveSite.details.currents.length - 1].content}</Text>
          </View>
        }
        {!diveSite.details || !diveSite.details.access || diveSite.details.access.length === 0 ? <View></View> :
          <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 30, fontSize: 16, color: 'white', fontWeight: 'bold'}}>Access</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{diveSite.details.access[diveSite.details.access.length - 1].content}</Text>
          </View>
        }
      </View>
  )
}

export default ResultDetails;