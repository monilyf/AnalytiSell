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
import {IMAGES} from '../../assets/images';
import ImagePicker from 'react-native-image-crop-picker';
import {ROUTE} from '../../routes/routes';
import MasonryList from '@react-native-seoul/masonry-list';
import Label from '../../components/ui/Label';
import RNFS from 'react-native-fs';
import {requestExternalStoragePermission} from '../../utils/helper';

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

  const hanlePermission = async () => {
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
  useEffect(() => {
    hanlePermission();
  }, []);

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
          setLongPress({status: !isLongPress.status, id: item.name})
        }
        onPress={() => navigation.navigate(ROUTE.DETAILS, {data: item})}>
        {isLongPress.status && isLongPress.id === item.name ? (
          <View style={[imageStyle, styles.contentCenter]}>
            <Label>{`₹ ${item.price ? item.price : 'Add Price'}`}</Label>
            <Label>{`Size - ${item.size ? item.size : 'Add Size'}`}</Label>
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
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Image source={IMAGES.Camera} style={styles.cameraImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Image source={IMAGES.Gallery} style={styles.cameraImage} />
        </TouchableOpacity>
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
  actionContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    bottom: ThemeUtils.relativeHeight(3),
  },
  button: {
    backgroundColor: COLORS.buttonBG,
    padding: 15,
    borderRadius: 50,
  },
  cameraImage: {
    height: ThemeUtils.relativeHeight(5),
    width: ThemeUtils.relativeHeight(5),
  },
  galleryImage: {},
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
