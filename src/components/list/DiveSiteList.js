import React from 'react';
import { FlatList } from 'react-native';
import DiveSiteCard from './DiveSiteCard';

function DiveSiteList({ diveSites, history }) {
  
  function selectDiveSite (site) {
    history.push(`/dive-sites/${site.country.replace(/\s+/g, '-').toLowerCase()}/${site.name.replace(/\s+/g, '-').toLowerCase()}?id=${site._id}`)
  }

  return (
    <FlatList

      style={{paddingBottom: 4}}
      data={diveSites}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (

        <DiveSiteCard site={item} onPress={() => selectDiveSite(item)} />

      )}
    />
  )
}

export default DiveSiteList;