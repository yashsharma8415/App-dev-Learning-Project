/**
 *
 * @format
 * @flow
 *
 */

import React, {useRef, useState, useEffect} from 'react';

import {View, StyleSheet, Animated, Image} from 'react-native';

import useInterval from 'react-useinterval';

import {StackActions} from '@react-navigation/native';

type Props = {
  navigation: Object,
};

const Screen3 = (props: Props): React$Node => {
  const {navigation} = props;

  let animation = useRef(new Animated.Value(0));

  const [progress, setProgress] = useState(0);

  useInterval(() => {
    if (progress < 100) {
      setProgress(progress + 2);
    }
  }, 100);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    setTimeout(() => {
      const popAction = StackActions.pop(1);
      navigation.dispatch(popAction);
      navigation.navigate('Screen4');
    }, 5000);
  });

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: (['0%', '100%']: Array<string>),
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            (styles.progressBar, {backgroundColor: '#8AED4F', width: width})
          }
        />
      </View>
      <Image
        style={styles.imageStyle}
        source={require('../../Images/StoryImage.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
  imageStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 20,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    resizeMode: 'stretch',
  },
});

export default Screen3;
