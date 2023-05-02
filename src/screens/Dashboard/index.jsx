import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/ui/Header';
import {COLORS} from '../../utils/Color';
import ThemeUtils from '../../utils/ThemeUtils';
import {ROUTE} from '../../routes/routes';
import MasonryList from '@react-native-seoul/masonry-list';
import Label from '../../components/ui/Label';
import RNFS from 'react-native-fs';
import {requestExternalStoragePermission} from '../../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({navigation}) => {
  const [imageArray, setImageArray] = useState([]);
  const [isLongPress, setLongPress] = useState(false);
  const directoryPath = RNFS.ExternalStorageDirectoryPath + '/AppTest/';

  const createImageArray = async data => {
    let tempArray = data?.map(img => {
      return {name: img.name, image: `file://${img.path}`};
    });
    setImageArray(tempArray);
  };

  const handlePermission = async () => {
    let permission = await requestExternalStoragePermission();
    if (permission === 'granted') {
      RNFS.exists(directoryPath)
        .then(exist => {
          console.log(`file ${exist ? '' : 'not'} exists`);
          RNFS.readDir(directoryPath)
            .then(result => {
              createImageArray(result);
            })
            .catch(err => {
              console.log(
                'Error while reading directory - ',
                err.message,
                err.code,
              );
            });
        })
        .catch(error => {
          console.log('Error while checking file existance - ', error);
        });
    }
  };
  const getStoreData = async () => {
    let value = await AsyncStorage.getItem('imageRecords');
    const imageRecords = JSON.parse(value);
    let data = imageRecords.find(item => item.name === isLongPress.id);
    setLongPress({
      ...isLongPress,
      price: data?.selling_price,
      size: data?.size,
    });
  };

  useEffect(() => {
    handlePermission();
  }, []);

  useEffect(() => {
    getStoreData();
  }, [isLongPress.id]);

  const handleImageArray = arr => {
    let imgArr = arr.map((item, index) => {
      return {
        id: imageArray.length + index,
        image: item.path,
        aspectRatio: (item.width / item.height).toFixed(3),
      };
    });
    setImageArray([...imageArray, ...imgArr]);
  };

  const openGallery = async () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: false,
    })
      .then(image => {
        handleImageArray(image);
      })
      .catch(e => {
        console.log('Error while action in Gallery - ', e.message);
      });
  };
  const openCamera = async () => {
    ImagePicker.openCamera({
      cropping: false,
    })
      .then(image => {
        handleImageArray(image);
      })
      .catch(e => {
        console.log('Error while action in Gallery - ', e.message);
      });
  };
  const renderItem = ({item}) => {
    const imageStyle = [
      styles.imageItem,
      {
        width: ThemeUtils.relativeWidth(45),
        aspectRatio: Number(item?.aspectRatio ?? 1),
      },
    ];
    return (
      <TouchableOpacity
        onLongPress={() =>
          setLongPress({
            status: isLongPress.id === item.name ? !isLongPress.status : true,
            id: item.name,
          })
        }
        onPress={() => {
          setLongPress({status: false, id: ''});
          navigation.navigate(ROUTE.DETAILS, {data: item});
        }}>
        {isLongPress.status && isLongPress.id === item.name ? (
          <View style={[imageStyle, styles.contentCenter]}>
            <Label>{`₹ ${
              isLongPress.price ? isLongPress?.price : 'Add Price'
            }`}</Label>
            <Label>{`Size - ${
              isLongPress.size ? isLongPress?.size : 'Add Size'
            }`}</Label>
          </View>
        ) : (
          <Image source={{uri: item.image}} style={imageStyle} />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.subContainer}>
        <Label color={COLORS.DarkFont} xlarge>
          Welcome User
        </Label>
        <View style={styles.imageContainer}>
          {imageArray.length ? (
            <MasonryList
              data={imageArray}
              keyExtractor={item => item.name}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              // refreshing={isLoadingNext}
              // onRefresh={() => refetch({first: ITEM_CNT})}
              // onEndReachedThreshold={0.1}
              // onEndReached={() => loadNext(ITEM_CNT)}
            />
          ) : (
            <Label>There is no image in mentioned directory.</Label>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LightBG,
    borderTopLeftRadius: 8,
  },
  subContainer: {
    padding: ThemeUtils.relativeHeight(2),
    flex: 1,
  },
  title: {
    fontSize: ThemeUtils.fontLarge,
    color: COLORS.DarkFont,
  },
  imageContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  imageItem: {
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: COLORS.secondary,
  },
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
