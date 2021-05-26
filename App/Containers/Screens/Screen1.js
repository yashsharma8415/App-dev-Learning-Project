/**
 *
 * @format
 * @flow
 *
 */

import React from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';

import Svg, {Polygon, ClipPath, Defs, Image} from 'react-native-svg';

import {gql, useQuery, useMutation} from '@apollo/client';

import ImagePicker from 'react-native-image-picker';

import Footer from '../../Components/Footer/Footer.js';

const USER_DETAILS_QUERY = gql`
  query userDetails {
    getUserDetails {
      firstname
      lastname
      bio
      uri
    }
  }
`;

const USER_DP_MUTATION = gql`
  mutation userDP($uri: String!, $id: Int!) {
    addProfilePicture(uri: $uri, id: $id)
  }
`;

type Props = {
  navigation: Object,
};

const Screen1 = (props: Props): React$Node => {
  const {navigation} = props;

  const {loading, error, data} = useQuery(USER_DETAILS_QUERY);

  const [changeDP, {}] = useMutation(USER_DP_MUTATION);

  const renderFileUri = () => {
    if (data.getUserDetails.uri) {
      return (
        <Image
          width="100%"
          height="100%"
          src={{uri: data.getUserDetails.uri}}
          clipPath="url(#clip)"
        />
      );
    } else {
      return (
        <Image
          width="100%"
          height="100%"
          href={require('../../Images/animedp.jpg')}
          clipPath="url(#clip)"
        />
      );
    }
  };

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        changeDP({
          variables: {
            uri: response.uri,
            id: 1,
          },
        });
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Error!</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Svg height="100%" width="100%">
          <Defs>
            <ClipPath id="clip">
              <Polygon
                points="241, 45 179, 45 129, 81 110, 140 129, 199 179, 235 241, 235 291, 199 310, 140 291, 81"
                fill="none"
                stroke="black"
                strokeWidth="0"
              />
            </ClipPath>
          </Defs>
          {renderFileUri()}
          <Polygon
            points="241, 45 179, 45 129, 81 110, 140 129, 199 179, 235 241, 235 291, 199 310, 140 291, 81"
            fill="none"
            stroke="white"
            strokeWidth="0"
            onLongPress={chooseImage}
          />
        </Svg>
      </View>
      <View style={styles.container}>
        <Button
          title="Add story"
          onPress={() => navigation.navigate('Screen2')}
        />
        <Text style={styles.heading}>
          {data.getUserDetails.firstname} {data.getUserDetails.lastname}
        </Text>
        <Text style={styles.text}>{data.getUserDetails.bio}</Text>
      </View>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
  },
});

export default Screen1;
