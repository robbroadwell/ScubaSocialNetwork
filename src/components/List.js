import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import DiveSiteCard from './DiveSiteCard';
import { connect } from "react-redux";

class List extends Component {
    render() {

        console.log(this.props.diveSites);

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
                        // onPress={() => selectDiveSite(item)} 
                        // selected={this.props.selectedSite._id === item._id} 
                    />
                    )}
                />
                
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return { 
        diveSites: state.diveSites,
        selectedSite: state.selectedSite
     };
  };
  
export default connect(
    mapStateToProps,
    {  }
)(List);
