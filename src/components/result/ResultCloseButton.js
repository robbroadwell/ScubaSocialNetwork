import React, {Component} from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { withRouter } from 'react-router-dom'

function ResultCloseButton({ history, style }) {
  return (
    <TouchableOpacity onPress={() => history.push(`/`)} style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
      <Image style={{width: 25, height: 25, margin: 15, tintColor: style.colors.secondary}} source={require('../../assets/close.png')} />
    </TouchableOpacity>
  )
}

export default withRouter(ResultCloseButton);