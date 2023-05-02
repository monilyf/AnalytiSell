import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/Color';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Label from '../Label';
import ThemeUtils from '../../../utils/ThemeUtils';

const CommonDateTimePicker = props => {
  const {
    errorMessage,
    label,
    onConfirmDate,
    handleClose,
    isOpen,
    onPress,
    date,
    minimumDate,
  } = props;
  return (
    <View style={styles.container}>
      <Label xsmall>{label}</Label>

      <TouchableOpacity style={styles.inputContainer} onPress={onPress}>
        {isOpen && (
          <DatePicker
            style={styles.input}
            modal
            open={isOpen}
            date={date}
            onConfirm={onConfirmDate}
            onCancel={handleClose}
            minimumDate={minimumDate}
          />
        )}
        <Label style={styles.input}>{moment(date).format('DD/MM/YYYY')}</Label>
      </TouchableOpacity>
      {errorMessage && (
        <Label xsmall color={COLORS.error}>
          {errorMessage}
        </Label>
      )}
    </View>
  );
};

export default CommonDateTimePicker;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginVertical: ThemeUtils.relativeHeight(1),
    height: 45,
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    paddingHorizontal: ThemeUtils.relativeWidth(4),
  },
});
