import React from 'react';
import { View } from 'react-native';
import PrimaryButton from '../../utility/buttons/PrimaryButton';
import PopoverButton from '../../utility/buttons/PopoverButton';
import { connect } from "react-redux";
import { getUser } from '../../redux/selectors';
import { fetchDiveSites } from '../../redux/actions';
import ImageUpload from './ImageUpload'
import AddReview from './AddReview'

function ResultUserActions({ isAddPhoto, toggleAddPhoto, isReview, toggleReview, addReview, toggleEdit, fetchDiveSite, diveSiteID }) {
  return (
    <View style={{flexDirection: 'row'}}>
      <PopoverButton popover={isAddPhoto} action={toggleAddPhoto} title={"Add Photos"} icon={isAddPhoto ? require('../../assets/drop_up.svg') : require('../../assets/add_photo.svg')} >
        <View style={{width: 300, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
          <ImageUpload toggleAddPhoto={toggleAddPhoto} fetchDiveSite={fetchDiveSite} diveSiteID={diveSiteID} />
        </View>
      </PopoverButton>
      <PopoverButton popover={isReview} action={toggleReview} title={"Review"} icon={isReview ? require('../../assets/drop_up.svg') : require('../../assets/review.svg')} >
        <View style={{width: 320, backgroundColor: '#21313C', position: 'absolute', top: 10, right: 0, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 7, shadowColor: '#000'}}>
          <AddReview addReview={addReview} />
        </View>
      </PopoverButton>
      <PrimaryButton action={toggleEdit} title={"Edit"}icon={require('../../assets/create.svg')}  />
    </View>
  )
}

export default ResultUserActions;