import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../../../assets/images';
import ThemeUtils from '../../../utils/ThemeUtils';
import { COLORS } from '../../../utils/Color';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={()=>{}}>
          <Image source={IMAGES.Profile} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}}>
          <Image source={IMAGES.Settings} style={styles.settings} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // borderBottomWidth:2,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    backgroundColor:COLORS.DarkBG
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileImage: {
    height: ThemeUtils.relativeHeight(4),
    width: ThemeUtils.relativeHeight(4),
  },
  settings: {
    height: ThemeUtils.relativeHeight(3),
    width: ThemeUtils.relativeHeight(3),
  },
});
