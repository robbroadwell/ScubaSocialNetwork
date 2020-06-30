import React from 'react';
import { View, Image, Text } from 'react-native';
import { StickyContainer } from 'react-sticky';
import EditButton from '../buttons/EditButton';
import DiveSiteReviewsList from './DiveSiteReviewsList';

function DiveSiteDetailSidebar({ diveSite, openAddReview }) {

  return (
    <View style={{width: 450, paddingLeft: 20, paddingTop: 10, paddingRight: 20, marginRight: -10, marginBottom: -10, backgroundColor: '#EFEFEF', flexDirection: 'column'}}>
      {/* <View style={{height: 200, borderColor: '#DDDDDD', borderWidth: 1, margin: 10}}>
        <Image style={{flex: 1}} source={require('../../assets/weather_placeholder2.png')} />
      </View> */}

      <DiveSiteReviewsList diveSite={diveSite} openAddReview={openAddReview}  />


      {/* <DiveSiteDetailMarketing /> */}
    </View>
  )
}

export default DiveSiteDetailSidebar;