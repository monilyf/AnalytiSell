import react from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';
import {COLORS} from '../../../utils/Color';
import ThemeUtils from '../../../utils/ThemeUtils';
import Label from '../Label';

const CommonButton = props => {
  const {
    label,
    onPress,
    buttonColor,
    borderColor=COLORS.orange,
    labelColor,
    variant = 'contained',
  } = props;
  return (
    <>
      {variant === 'contained' && (
        <TouchableHighlight style={[styles.containedContainer,{backgroundColor:buttonColor}]} onPress={onPress}>
          <Label style={[styles.buttonLabel,{color:labelColor}]}>{label}</Label>
        </TouchableHighlight>
      )}
      {variant === 'labelOnly' && <Label style={[styles.buttonLabel,{color:labelColor}]} onPress={onPress}>{label}</Label>}
      {variant === 'outlined' && (
        <TouchableHighlight style={[styles.outlinedContainer,{borderColor:borderColor}]} onPress={onPress}>
          <Label style={styles.buttonLabel}>{label}</Label>
        </TouchableHighlight>
      )}
    </>
  );
};
export default CommonButton;

const styles = StyleSheet.create({
  containedContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    marginHorizontal: 40,
    borderRadius: 20,
    backgroundColor: COLORS.orange,
  },
  buttonLabel: {
    fontSize: ThemeUtils.fontNormal,
    textAlign:'center'
  },
  outlinedContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    marginHorizontal: 40,
    borderRadius: 20,
    borderWidth:2
    // backgroundColor: COLORS.orange,
  },
});
