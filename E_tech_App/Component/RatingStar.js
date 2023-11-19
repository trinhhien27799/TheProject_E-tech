import React from 'react'
import { View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'

const RatingStar = () => {
  return (
    <View>
        <AirbnbRating
            count={5} // Number of stars to display
            defaultRating={3} // Default rating value
            size={20} // Size of the rating stars
            reviewSize={0} // Remove the reviews
            selectedColor='#3366ff' // Selected star color
            isDisabled={true} // Disable the rating
            onFinishRating={rating => console.log('Rating is: ' + rating)} // Callback function when rating is finished
        />
    </View>
  )
}

export default RatingStar