import React from 'react';
import useWindowDimensions from './useWindowDimensions';
import Confetti from 'react-confetti'

function FullScreenConfetti() {
  const { height, width } = useWindowDimensions();

  return (
    <Confetti
      style={{zIndex: 1, height: height, width: width - 20}}
    />
  )
}

export default FullScreenConfetti;