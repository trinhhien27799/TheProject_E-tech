import React from 'react'
import { View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import tailwind from 'twrnc'

const RatingStarComment = ({starNum, style}) => {
  return (
    <View>
        <AirbnbRating
            count={5} // Number of stars to display
            defaultRating={starNum} // Default rating value
            size={18} // Size of the rating stars
            reviewSize={0} // Remove the reviews
            selectedColor='#3366ff' // Selected star color
            onFinishRating={rating => console.log('Rating is: ' + rating)} // Callback function when rating is finished
            ratingContainerStyle={tailwind `${style}`}
        />
    </View>
  )
}

export default RatingStarComment