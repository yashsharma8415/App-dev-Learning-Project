/**
 *
 * @format
 * @flow strict-local
 *
 */

import React from 'react';

import {StyleSheet, Image} from 'react-native';

const Footer = (): function => {
  return (
    <Image
      style={styles.footerStyle}
      source={require('../../Images/FooterImage.png')}
    />
  );
};

const styles = StyleSheet.create({
  footerStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Footer;
