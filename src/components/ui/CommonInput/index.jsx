import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/Color';
import Label from '../Label';
import ThemeUtils from '../../../utils/ThemeUtils';

const CommonInput = props => {
  const {errorMessage, label} = props;
  return (
    <View style={styles.container}>
      <Label xsmall>{label}</Label>
      <View style={styles.inputContainer}>
        <TextInput {...props} style={styles.input} />
      </View>
      {errorMessage && (
        <Label xsmall color={COLORS.error}>
          {errorMessage}
        </Label>
      )}
    </View>
  );
};

export default CommonInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginVertical: ThemeUtils.relativeHeight(1),
  },
  input: {
    fontSize: 18,
    paddingHorizontal: ThemeUtils.relativeWidth(4),
  },
});
