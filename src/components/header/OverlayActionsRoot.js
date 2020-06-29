import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from "react-redux";
import { setLogDiveMode, setAddPhotoMode, setAddReviewMode, fetchDiveSite } from '../../redux/actions';
import { getLogDiveMode, getAddPhotoMode, getAddReviewMode, getDiveSite, getUser } from "../../redux/selectors";
import { withRouter } from 'react-router-dom'

import LogDive from './log-dive/LogDive';
import AddReview from './add-review/AddReview';
import AddPhoto from './add-photo/AddPhoto';

class OverlayActionsRoot extends Component {
  closeOverlays = () => {
    this.props.fetchDiveSite(this.props.diveSite._id)
    this.props.setLogDiveMode(false)
    this.props.setAddReviewMode(false)
    this.props.setAddPhotoMode(false)
    document.body.style.overflow = "visible"
  }

  render() {

    if (this.props.logDiveMode) {
      window.scrollTo(0, 0) // figure out another way to do this
      return <LogDive diveSite={this.props.diveSite} user={this.props.user} close={this.closeOverlays} />
    }

    if (this.props.addReviewMode) {
      window.scrollTo(0, 0)
      return <AddReview diveSite={this.props.diveSite} user={this.props.user} close={this.closeOverlays} />
    }

    if (this.props.addPhotoMode) {
      window.scrollTo(0, 0)
      return <AddPhoto diveSite={this.props.diveSite} user={this.props.user} close={this.closeOverlays} />
    }

    return <View></View>
  }
}

const mapStateToProps = state => {
  const logDiveMode = getLogDiveMode(state);
  const addPhotoMode = getAddPhotoMode(state);
  const addReviewMode = getAddReviewMode(state);
  const diveSite = getDiveSite(state);
  const user = getUser(state);
  return { logDiveMode, addPhotoMode, addReviewMode, diveSite, user };
};

  export default connect(
    mapStateToProps,
    { setLogDiveMode, setAddPhotoMode, setAddReviewMode, fetchDiveSite }
  )(OverlayActionsRoot);
