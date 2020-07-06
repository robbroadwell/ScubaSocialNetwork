import React from 'react';
import { View, Text } from 'react-native';

function MapFilters() {
  return (
    
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FilterButton filter={"Visibility"} />
        <FilterButton filter={"Depth"} />
        <FilterButton filter={"Water Temperature"} />
        <FilterButton filter={"Currents"} />
        <FilterButton filter={"Animals"} premium={true} />
      </View>
 
  )
}

function FilterButton({ filter, premium }) {
  return (
    <View style={{borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 7, marginRight: 10}}>
      <Text style={{padding: 10}}>{filter}</Text>
    </View>
  )
}

export default MapFilters;