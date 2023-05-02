import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMAGES} from '../../assets/images';
import {ROUTE} from '../../routes/routes';

const SplashScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(true);
  // Navigate to authenticated route
  const resetToAuth = CommonActions.reset({
    index: 0,
    routes: [{name: ROUTE.AUTHENTICATED}],
  });

  // Navigate to NotAuthenticated route
  const resetToUnAuth = CommonActions.reset({
    index: 0,
    routes: [{name: ROUTE.UNAUTHENTICATED}],
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      navigation.navigate(ROUTE.AUTHENTICATED, {screen: ROUTE.DASHBOARD});
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      {isVisible && (
        <Image
          source={IMAGES.Splash}
          alt={'splash screen'}
          style={styles.image}
        />
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
