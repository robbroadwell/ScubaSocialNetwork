import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import DiveSiteCard from './DiveSiteCard';
import { connect } from "react-redux";
import { setSelectedDiveSite } from '../redux/actions';
import { getDiveSites, getSelectedDiveSite } from '../redux/selectors';

class List extends Component {
    render() {
        return (
            <ScrollView>
                
                <FlatList
                    style={{paddingBottom: 10}}
                    data={this.props.diveSites}
                    keyExtractor={({ id }, index) => id}
                    extraData={this.props.selectedSite}
                    renderItem={({ item }) => (
                    <DiveSiteCard 
                        site={item} 
                        onPress={() => this.props.setSelectedDiveSite(item)} 
                        selected={this.props.selectedSite._id === item._id} 
                    />
                    )}
                />
                
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    const diveSites = getDiveSites(state);
    const selectedSite = getSelectedDiveSite(state);
    return { diveSites, selectedSite };
  };
  
export default connect(
    mapStateToProps,
    { setSelectedDiveSite }
)(List);
