import React, {Component} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import DiveSiteList from './DiveSiteList';


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
        expanded: false
    };
  }

  toggleExpanded = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  }

  render() {

    if (!this.props.style.mobile) { // desktop
      return <ResultsView diveSites={this.props.diveSites} style={this.props.style} history={this.props.history} />
    }

    if (!this.props.diveSites || this.props.diveSites.length === 0) {
      return <View></View> // no dive sites, show nothing on mobile
    } 

    if (!this.state.expanded) { // collapsed list on mobile
      return <ExpandToggleButton title={this.props.diveSites.length} onPress={this.toggleExpanded} style={this.props.style} />
    }

    return ( // expanded list on mobile
      <View style={{position: 'absolute', height: '100%', width: '100%'}}>
        <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.8}} />
        <View style={{position: 'absolute', right: 0, top: 0, height: '100%', flexDirection: 'row'}}>
          <ExpandToggleButton icon={require('../../../assets/close.png')} onPress={this.toggleExpanded} style={this.props.style} />
          <ResultsView diveSites={this.props.diveSites} style={this.props.style} history={this.props.history} />
        </View>
      </View>
    )
  }
}

function ResultsView({ diveSites, style, history }) {
  return (
    <View style={{backgroundColor: style.colors.secondary, width: 400}}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        <DiveSiteList diveSites={diveSites} history={history} />
      </ScrollView>
    </View>
  )
}

function ExpandToggleButton({ title, icon, style, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{position: icon ? 'relative' : 'absolute', justifyContent: 'center', alignItems: 'center', right: 0, top: window.screen.height / 2, width: 50, height: 50, backgroundColor: style.colors.secondary}}>
      {!title ? <View></View> : <Text style={{fontSize: 18, fontWeight: '600'}}>{title}</Text>}
      {!icon ? <View></View> : <Image style={{width: 20, height: 20, tintColor: 'black'}} source={icon} />}
    </TouchableOpacity>
  )
}

export default List;