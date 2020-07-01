import React, {Component, useState} from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsync } from 'react-async-hook';

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

async function getFirstAlbumTitle() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
  return response.data;
}

const useSearchStarwarsHero = () => useDebouncedSearch(text => getFirstAlbumTitle(text))

const SearchStarwarsHeroExample = () => {
  const { inputText, setInputText, searchResults } = useSearchStarwarsHero();
  console.log(searchResults)
  return (
    <View style={{position: 'absolute'}}>
      <TextInput
        style={{width: 250, outlineWidth: 0, padding: 12, backgroundColor: 'white', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', marginVertical: 20 }}
        onChangeText={text => setInputText(text)}
        placeholder={'Search'}
        value={inputText}
        />
        {inputText === "" ? <View /> : 
        
        <ScrollView style={{height: 300, width: 250, backgroundColor: 'white', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000'}}>
          <View style={{padding: 12}}>
            {searchResults.loading && <div>...</div>}
              {searchResults.error && <div>Error: {searchResults.error.message}</div>}
              {searchResults.result && (
                <div>
                  {/* <div>Results: {searchResults.length}</div> */}
                  <ul>
                    {searchResults.result.map(album => (
                      <li key={album.title}>{album.title}</li>
                    ))}
                  </ul>
                </div>
              )}
          </View>
        </ScrollView>
        }
    </View>

  );
};

export default Search;