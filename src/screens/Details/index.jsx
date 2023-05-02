import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import CommonButton from '../../components/ui/CommonButton';
import CommonInput from '../../components/ui/CommonInput';
import Header from '../../components/ui/Header';
import {COLORS} from '../../utils/Color';
import ThemeUtils from '../../utils/ThemeUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({navigation, route}) => {
  const [showDatePicker, setDatePicker] = useState({isOpen: false, type: ''});
  const [state, setState] = useState({});
  const {data} = route.params;

  const handleState = (key, value) => {
    setState({...state, [key]: value});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: data.image}}
            style={[
              {
                width:
                  data.aspectRatio > 1
                    ? ThemeUtils.relativeWidth(80)
                    : ThemeUtils.relativeWidth(50),
                aspectRatio: data.aspectRatio,
                borderRadius: 8,
              },
            ]}
          />
        </View>

        <View style={styles.detailsContainer}>
          <CommonInput
            label={'Purchase Date'}
            type={'date'}
            value={state.purchase_date}
            onPress={() => setDatePicker({isOpen: true, type: 'purchase_date'})}
            isOpen={
              showDatePicker.isOpen && showDatePicker.type === 'purchase_date'
            }
            onConfirmDate={value => {
              handleState('purchase_date', value);
              setDatePicker({isOpen: false, type: ''});
            }}
            handleClose={() => setDatePicker({isOpen: false, type: ''})}
          />
          <CommonInput
            label={'Purchase From'}
            type={'text'}
            value={state.purchase_from}
            onChangeText={value => handleState('purchase_from', value)}
          />
          <CommonInput
            label={'Purchase Price'}
            type={'text'}
            value={state.purchase_price}
            keyboardType={'number-pad'}
            onChangeText={value => handleState('purchase_price', value)}
          />
          <CommonInput
            label={'Selling Date'}
            value={state.selling_date}
            type={'date'}
            onPress={() => setDatePicker({isOpen: true, type: 'selling_date'})}
            isOpen={
              showDatePicker.isOpen && showDatePicker.type === 'selling_date'
            }
            onConfirmDate={value => {
              handleState('selling_date', value);
              setDatePicker({isOpen: false, type: ''});
            }}
            handleClose={() => setDatePicker({isOpen: false, type: ''})}
          />
          <CommonInput
            label={'Sell To'}
            type={'text'}
            value={state.sell_to}
            onChangeText={value => handleState('sell_to', value)}
          />
          <CommonInput
            label={'Selling Price'}
            type={'text'}
            value={state.selling_price}
            keyboardType={'number-pad'}
            onChangeText={value => handleState('selling_price', value)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CommonButton
            label={'Save'}
            onPress={() => {}}
            buttonColor={COLORS.DarkFont}
            labelColor={COLORS.LightBG}
            variant={'contained'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LightBG,
  },
  subContainer: {
    paddingVertical: ThemeUtils.relativeHeight(3),
    flex: 1,
  },
  imageContainer: {
    // width:100
    alignItems: 'center',
  },
  detailsContainer: {
    paddingVertical: 8,
    marginHorizontal: ThemeUtils.relativeHeight(5),
  },
  buttonContainer: {
    width: '100%',
    marginBottom: ThemeUtils.relativeHeight(7),
  },
});
