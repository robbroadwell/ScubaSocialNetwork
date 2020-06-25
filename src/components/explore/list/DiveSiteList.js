import React from 'react';
import { FlatList } from 'react-native';
import DiveSiteCard from './DiveSiteCard';

function DiveSiteList({ diveSites, history }) {
  
  return (
    <FlatList
      style={{marginBottom: -5}}
      data={diveSites}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (

        <DiveSiteCard site={item} onPress={() => history.push(`/dive-sites/${item.destination.id.replace(/\s+/g, '-').toLowerCase()}/${item.name.replace(/\s+/g, '-').toLowerCase()}?id=${item._id}`)} />

      )}
    />
  )
}

export default DiveSiteList;