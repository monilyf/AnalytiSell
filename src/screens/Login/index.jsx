import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {IMAGES} from '../../assets/images';
import {COLORS} from '../../utils/Color';
import CommonButton from '../../components/ui/CommonButton';
import ThemeUtils from '../../utils/ThemeUtils';
import {NavigationContainer} from '@react-navigation/native';
import {ROUTE} from '../../routes/routes';
import CommonInput from '../../components/ui/CommonInput';
import {api} from '../../api';

const Login = ({navigation}) => {
  const [userData, setUserData] = useState({email: '', password: ''});
  const handleSubmit = async () => {
    if (userData.email && userData.password) {
      // login(
      //   userData,
      //   () => {
      //     console.log('cb success');
      //     navigation.navigate(ROUTE.AUTHENTICATED);
      //   },
      //   () => console.log('cb error'),
      // );
        let params = {"identifier":userData.email,password:userData.password}
        console.log('params: ', params);
      //   api.auth.login(params).then((res)=>{
      //     console.log('res: ', res);

      //   }).catch((e)=>{
      //     console.log('error==',e)
      //   })
      //   let result = await api.auth.login(params);
      //   console.log('result: ', result);

      // }
      fetch('http://192.168.1.167:1337/api/details-fields', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          console.log('response--', res);
        })
        .catch(e => {
          console.log('error--', e, e.response);
        });
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.BG}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>AnalytiSell</Text>
          <Text style={styles.headerTwo}>
            Welcome to new platform of e-learning. Let’s learn.
          </Text>
        </View>

        <View style={styles.form}>
          <CommonInput
            label={'Email'}
            value={userData.email}
            type={'text'}
            onChangeText={value => setUserData({...userData, email: value})}
          />
          <CommonInput
            label={'Password'}
            type={'password'}
            secureTextEntry={true}
            value={userData.password}
            onChangeText={value => setUserData({...userData, password: value})}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CommonButton
          label={'Sign in'}
          onPress={handleSubmit}
          buttonColor={COLORS.DarkFont}
          labelColor={COLORS.LightBG}
          variant={'contained'}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subContainer: {
    position: 'absolute',
    zIndex: 1,
    top: ThemeUtils.relativeHeight(5),
    // marginHorizontal:20
  },
  image: {
    height: '100%',
    width: '100%',
  },
  headerContainer: {
    marginBottom: ThemeUtils.relativeHeight(3),
    alignItems: 'center',
  },
  header: {
    color: COLORS.DarkFont,
    fontSize: ThemeUtils.fontXXLarge,
    fontFamily: 'Gilroy-SemiBold',
    marginBottom: 3,
    // width: '55%',
  },
  headerTwo: {
    lineHeight: ThemeUtils.relativeHeight(3),
    fontSize: ThemeUtils.fontSmall,
    paddingVertical: 2,
    color: COLORS.DarkFont,
    textAlign: 'center',
    fontFamily: 'Gilroy',
    width: '55%',
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    bottom: ThemeUtils.relativeHeight(7),
  },
  form: {
    paddingHorizontal: ThemeUtils.relativeWidth(7),
  },
});
