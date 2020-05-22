import React from 'react';
import { View, Image } from 'react-native';

function Stars({rating}) {
    return (
      <View style={{flexDirection: 'row'}}>
        <StarImage filled={1} />
        <StarImage filled={1} />
        <StarImage filled={1} />
        <StarImage filled={1} />
        <StarImage filled={1} />
      </View>
    );
  }
  
  function StarImage({ filled }) {
    let image;
  
    if (filled === 0.0) {
      image = require('../assets/star_outline.png');
    } else if (filled === 0.5) {
      image = require('../assets/star_half.png');
    } else if (filled === 1.0) {
      image = require('../assets/star.png');
    }
  
    return (
      <Image
                style={{
                  width: 22,
                  height: 22,
                  tintColor: '#A00000',
                }}
                source={image}
              />
    );
  }

  export default Stars;