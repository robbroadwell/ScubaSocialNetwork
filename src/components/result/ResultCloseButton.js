import React, {Component} from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { withRouter } from 'react-router-dom'

function ResultCloseButton({ history }) {
  return (
    <TouchableOpacity onPress={() => history.push(`/`)}>
      <Image style={{width: 20, height: 20, tintColor: 'black'}} source={require('../../assets/close.png')} />
    </TouchableOpacity>
  )
}

export default withRouter(ResultCloseButton);