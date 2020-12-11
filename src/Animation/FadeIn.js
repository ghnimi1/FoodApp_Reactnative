
import React, { useEffect, useState } from 'react'
import { Animated, Dimensions } from 'react-native'
function FadeIn(props) {
    const [positionLeft] = useState(new Animated.Value(Dimensions.get('window').width))
    useEffect(() => {
        Animated.spring(
            positionLeft,
            {
                toValue: 0,
            }
        ).start()
    }, [])
    return (
        <Animated.View
            style={{ top: positionLeft }}>
            {props.children}
        </Animated.View>
    )
}

export default FadeIn