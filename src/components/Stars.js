import React from 'react';
import { View, Image } from 'react-native';

function Stars({rating}) {
    return (
      <View style={{flexDirection: 'row'}}>
        <StarImage filled={0} />
        <StarImage filled={0} />
        <StarImage filled={0} />
        <StarImage filled={0} />
        <StarImage filled={0} />
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
                  width: 18,
                  height: 18,
                  tintColor: '#A00000',
                }}
                source={image}
              />
    );
  }

  export default Stars;