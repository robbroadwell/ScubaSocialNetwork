import React, {Component, useState} from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsync } from 'react-async-hook';
import BaseURL from '../../utility/BaseURL';
import DiveSiteReviews from '../explore/list/DiveSiteReviews';
import BaseHoverableView from '../buttons/BaseHoverableView';
import Ratings from 'react-ratings-declarative';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        search: ""
    };
  }

onChangeTextSearch = input => {
  this.setState({ search: input });
};

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <SearchStarwarsHeroExample />
      </View>
    )
  }
}

// Generic reusable hook
const useDebouncedSearch = (searchFunction) => {

  // Handle the input text state
  const [inputText, setInputText] = useState('');

  // Debounce the original search async function
  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 300)
  );

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(
    async () => {
      if (inputText.length === 0) {
        return [];
      } else {
        return debouncedSearchFunction(inputText);
      }
    },
    [debouncedSearchFunction, inputText]
  );

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    searchResults,
  };
};

const axios = require('axios');

async function autocomplete(text) {
  const response = await axios.get(BaseURL() + '/api/search?term=' + text);
  console.log(response)
  return response.data;
}

const useSearchStarwarsHero = () => useDebouncedSearch(text => autocomplete(text))

const SearchStarwarsHeroExample = () => {
  const { inputText, setInputText, searchResults } = useSearchStarwarsHero();
  console.log(searchResults)
  return (
    <View style={{position: 'absolute', alignItems: 'center'}}>
      <TextInput
        style={{width: 400, outlineWidth: 0, padding: 12, fontSize: 18, color: 'white', backgroundColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', marginVertical: 20, marginBottom: 10 }}
        onChangeText={text => setInputText(text)}
        placeholder={'Search'}
        value={inputText}
        />
        {inputText === "" ? <View /> : 
        
        <View style={{height: 335, width: 600, overflow: 'hidden', backgroundColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000'}}>
          <View style={{padding: 8}}>
            {searchResults.loading && <div>...</div>}
              {searchResults.error && <div>Error: {searchResults.error.message}</div>}
              {searchResults.result && (
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    {searchResults.result.diveSites && searchResults.result.diveSites.map(site => (
                      <SearchDiveSiteCard site={site} />
                    ))}
                  </View>
                  <View style={{width: 250}}>
                    {searchResults.result.destinations && searchResults.result.destinations.map(destination => (
                      <SearchDestinationCard destination={destination} />
                      // <Text>{destination.name}</Text>
                    ))}
                  </View>
                </View>
              )}
          </View>
        </View>
        }
    </View>

  );
};

class SearchDiveSiteCard extends Component {

  render() {
    return (
      <View style={{marginRight: 8}}>
          <TouchableOpacity onPress={this.props.onPress} activeOpacity={1.0} >
            <BaseHoverableView
              style={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.0, shadowRadius: 5, shadowColor: '#000', padding: this.props.selected ? 9 : 10, borderColor: this.props.selected ? '#555555' : '#cccccc', borderWidth: this.props.selected ? 2 : 1 }}
              onHover={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', padding: this.props.selected ? 9 : 10, borderColor: this.props.selected ? '#555555' : '#aaaaaa', borderWidth: this.props.selected ? 2 : 1 }}
            >

            <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 20}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>{this.props.site.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 2}}>
                    <Text style={{fontSize: 13, color: 'white'}}>{this.props.site.destination.name} </Text>
                  </View>
                </View>
                <SearchDiveSiteReviews reviews={this.props.site.ratingCount} rating={this.props.site.rating} />
            </View>
          </BaseHoverableView>
        </TouchableOpacity>
      </View>
    );
  }
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
            <Text style={{fontSize: 13, fontWeight: '600', color: 'white'}}>{(Math.round(rating * 100) / 100).toFixed(2)}</Text>
            <Text style={{marginLeft: 5, fontSize: 13, color: 'white' }}>({reviews} review{reviews == 1 ? '' : 's'})</Text>
        </View>
      </View>
    </View>
  )
}

function SearchDestinationCard({ destination, navigateDestination }) {
  return (
    <TouchableOpacity onPress={() => navigateDestination(destination)}  style={{flex: 1, width: 250, height: 100, marginBottom: 10, borderColor: '#CCCCCC', borderWidth: 1}}>
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

export default Search;