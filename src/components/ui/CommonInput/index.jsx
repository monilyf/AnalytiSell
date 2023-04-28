import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/Color';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Label from '../Label';

const CommonInput = props => {
  const {errorMessage, label, onConfirmDate, handleClose, isOpen, onPress} = props;
  return (
    <View style={styles.container}>
      <Label xsmall>{label}</Label>
      <View style={styles.inputContainer}>
        {(props.type === 'password' ||
        props.type === 'text') && 
        <TextInput {...props} style={styles.input} />
         }
        {props.type === 'date' && (
          <TouchableOpacity style={styles.box} onPress={onPress}>
          <DatePicker
            style={styles.input}
            modal
            open={isOpen}
            date={new Date()}
            onConfirm={date => {
              onConfirmDate(moment(date).format('DD/MM/YYYY'));
            }}
            onCancel={handleClose}
            />
            </TouchableOpacity>
        )}
      </View>
      {errorMessage && <Label xsmall color={COLORS.error}>{errorMessage}</Label>}
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
    marginVertical: 8,
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 15,
  },
  box: {
   height:45
  },

});
