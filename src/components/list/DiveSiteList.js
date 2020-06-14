import React from 'react';
import { FlatList } from 'react-native';
import DiveSiteCard from './DiveSiteCard';

function DiveSiteList({ diveSites }) {
  return (
    <FlatList
    
      style={{paddingBottom: 4}}
      data={diveSites}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (

        <DiveSiteCard site={item} onPress={() => this.selectDiveSite(item)} />

      )}
    />
  )
}

export default DiveSiteList;