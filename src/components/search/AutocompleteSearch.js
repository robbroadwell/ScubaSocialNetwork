import React, {Component, useState} from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import BaseURL from '../../utility/BaseURL';
import BaseHoverableView from '../buttons/BaseHoverableView';
import Ratings from 'react-ratings-declarative';
import { useHistory } from "react-router-dom";
import useDebouncedSearch from './useDebouncedSearch';

const axios = require('axios');

async function autocomplete(text) {
  const response = await axios.get(BaseURL() + '/api/search?term=' + text);
  console.log(response)
  return response.data;
}

const useAutocomplete = () => useDebouncedSearch(text => autocomplete(text))

const AutocompleteSearch = ({ header }) => {
  const { inputText, setInputText, searchResults } = useAutocomplete();
  return (
    <View style={{position: 'absolute', width: '100%', alignItems: 'center'}}>
      <Image style={{position: 'absolute', top: header ? 7 : 10, right: 10, width: 25, height: 25, tintColor: header ? '#555555' : 'black'}} source={require('../../assets/search.svg')} />
      <TextInput
        style={{width: '100%', outlineWidth: 0, paddingVertical: header ? 8 : 12, paddingHorizontal: 12, fontSize: 18, color: header ? 'white' : 'black', borderColor: '#555555', borderWidth: header ? 1 : 0, backgroundColor: header ? '#20232a' : 'white', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.4, shadowRadius: 5, shadowColor: '#000', marginBottom: 0 }}
        spellCheck={false}
        onChangeText={text => setInputText(text)}
        placeholder={'Search'}
        placeholderTextColor={header ? '#888888' : '#444444'}
        value={inputText}
        />

        {inputText === "" ? <View /> : 
        
        <View style={{position: 'absolute', top: header ? 55 : 45, width: 600, borderTopColor: '#EEEEEE', borderTopWidth: 1, overflow: 'hidden', backgroundColor: 'white', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 10, shadowColor: '#000'}}>
          <View style={{padding: 10}}>
            {searchResults.loading && <div>...</div>}
              {searchResults.error && <div>Error: {searchResults.error.message}</div>}
              {searchResults.result && (
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, marginBottom: -5}}>
                    {searchResults.result.diveSites && searchResults.result.diveSites.map(site => (
                      <SearchDiveSiteCard site={site} close={() => setInputText("")} />
                    ))}
                  </View>
                  <View style={{width: 250, marginBottom: -10}}>
                    {searchResults.result.destinations && searchResults.result.destinations.map(destination => (
                      <SearchDestinationCard destination={destination} close={() => setInputText("")} />
                    ))}
                  </View>
                </View>
              )}
              {searchResults.result && searchResults.result.diveSites && searchResults.result.diveSites.length === 0 && searchResults.result.destinations && searchResults.result.destinations.length === 0 ? <Text>No results.</Text>: <View />}
          </View>
        </View>
        }
    </View>
  );
};

function SearchDiveSiteCard({ site, close }) {
  let history = useHistory();

  function onPress(){
    close()
    history.push(`/dive-sites/${site.destination.id}/${site.name.replace(/\s+/g, '-').toLowerCase()}?id=${site._id}`)
  }

  return (
    <View style={{marginRight: 10, marginBottom: 5}}>
        <TouchableOpacity onPress={() => onPress()} activeOpacity={1.0} >
          <BaseHoverableView
            style={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.0, shadowRadius: 5, shadowColor: '#000', padding: 10, borderColor: '#cccccc', borderWidth: 1 }}
            onHover={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', padding: 10, borderColor: '#aaaaaa', borderWidth: 1 }}
          >

          <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>{site.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 2}}>
                  <Text style={{fontSize: 13, color: 'black'}}>{site.destination.name} </Text>
                </View>
              </View>
              <SearchDiveSiteReviews reviews={site.ratingCount} rating={site.rating} />
          </View>
        </BaseHoverableView>
      </TouchableOpacity>
    </View>
  );
  
}

function SearchDiveSiteReviews({ reviews, rating }) {
  return (
    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
      <View style={{alignItems: 'center'}}>
        <Ratings
          rating={rating}
          widgetRatedColors={"DD0000"}
          widgetDimensions="14px"
          widgetSpacings="1px">
          <Ratings.Widget widgetHoverColor="#FFB400"  />
          <Ratings.Widget widgetHoverColor="#FFB400"  />
          <Ratings.Widget widgetHoverColor="#FFB400"  />
          <Ratings.Widget widgetHoverColor="#FFB400"  />
          <Ratings.Widget widgetHoverColor="#FFB400"  />
        </Ratings>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 13, fontWeight: '600', color: 'black'}}>{(Math.round(rating * 100) / 100).toFixed(2)}</Text>
            <Text style={{marginLeft: 5, fontSize: 13, color: 'black' }}>({reviews} review{reviews == 1 ? '' : 's'})</Text>
        </View>
      </View>
    </View>
  )
}

function SearchDestinationCard({ destination, close }) {
  let history = useHistory();

  function onPress(){
    close()
    history.push(`/destinations/` + destination._id)
  }

  return (
    <TouchableOpacity onPress={() => onPress()}  style={{flex: 1, width: 250, height: 80, marginBottom: 10, borderColor: '#CCCCCC', borderWidth: 1}}>
      <Image style={{flex: 1}} source={destination.urlThumbnail} />
      <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {!destination.isTop ? <View></View> : 
        <View style={{position: 'absolute', top: 5, right: 5, backgroundColor: 'red', shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 5}}>
          <Text style={{color: 'white', fontWeight: '700', padding: 5}}>TOP</Text>
        </View>
        }
        <Text style={{color: 'white', fontSize: 24, fontWeight: '900', textAlign: 'center', textShadowColor: '#000000', textShadowRadius: 5}}>{destination.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default AutocompleteSearch;