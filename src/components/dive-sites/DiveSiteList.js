import React from 'react';
import { FlatList } from 'react-native';
import DiveSiteCard from './DiveSiteCard';
import StyledLinkNone from '../buttons/StyledLinkNone';

function DiveSiteList({ diveSites, history, country }) {
  
  return (
    <FlatList
      data={diveSites}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        
        <StyledLinkNone to={`/dive-sites/${item.destination.id.replace(/\s+/g, '-').toLowerCase()}/${item.name.replace(/\s+/g, '-').toLowerCase()}?id=${item._id}`}>
          <DiveSiteCard site={item} country={country} />
        </StyledLinkNone>

      )}
    />
  )
}

export default DiveSiteList;