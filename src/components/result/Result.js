import React, {Component} from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import qs from 'qs';
import { withRouter } from 'react-router-dom'
import { Helmet } from "react-helmet";
import ResultCloseButton from './ResultCloseButton';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        data: [],
    };
  }

  componentDidMount() {
    this.fetchDiveSite()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.fetchDiveSite()
    }
  }

  fetchDiveSite = () => {
    fetch('https://www.divingcollective.com/api/dive-sites/details/'+`${qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
    })
  }

  render() {
    return (
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.8}} />
        <View style={{position: 'relative', margin: 20, flex: 1, backgroundColor: this.props.style.colors.secondary}}>
          <ResultCloseButton />
        </View>
      </View>
    )
  }
}

export default Result;