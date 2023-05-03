import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../../../assets/images';
import ThemeUtils from '../../../utils/ThemeUtils';
import {COLORS} from '../../../utils/Color';
import Label from '../Label';
import { QUOTES } from '../../../utils/Constant';

const Header = ({label}) => {
  const number = Math.floor(Math.random() * (9 - 0 + 1) + 0)
  return (
    <View style={styles.container}>
        {label ? (
          <Label color={COLORS.white} large>
            {QUOTES[number]}
          </Label>
        ) : (
      <View style={styles.subContainer}>
          
            <TouchableOpacity onPress={() => {}}>
              <Image source={IMAGES.Profile} style={styles.profileImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image source={IMAGES.Settings} style={styles.settings} />
            </TouchableOpacity>
          </View>
        )}
      </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: COLORS.DarkBG,
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
