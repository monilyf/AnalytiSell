import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/ui/Header';
import {COLORS} from '../../utils/Color';
import ThemeUtils from '../../utils/ThemeUtils';
import {IMAGES} from '../../assets/images';
import ImagePicker from 'react-native-image-crop-picker';
import {ROUTE} from '../../routes/routes';
import MasonryList from '@react-native-seoul/masonry-list';
import Label from '../../components/ui/Label';

const Dashboard = ({navigation}) => {
  const [imageArray, setImageArray] = useState([]);
  console.log('imageArray: ', imageArray);

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
      // width: 300,
      // height: 400,
      multiple: true,
      cropping: false,
    }).then(image => {
      console.log('galary image--', image);
      handleImageArray(image);
    });
  };
  const openCamera = async () => {
    ImagePicker.openCamera({
      // width: 300,
      // height: 400,
      cropping: false,
    }).then(image => {
      console.log('camera image--', image);
      handleImageArray(image);
    });
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTE.DETAILS, {data: item})}>
        <Image
          source={{uri: item.image}}
          style={[
            styles.imageItem,
            {
              width: ThemeUtils.relativeWidth(45),
              aspectRatio: Number(item.aspectRatio),
            },
          ]}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.subContainer}>
        <Label color={COLORS.DarkFont} xlarge>Welcome User</Label>
        <View style={styles.imageContainer}>
          {/* <FlatList
            showsVerticalScrollIndicator={true}
            data={imageArray}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            style={{borderRadius: 10}}
            columnWrapperStyle={{
              // display:'grid',
              gridTemplateRows:'masonry',
              justifyContent: 'space-between',
            }}
          /> */}
          <MasonryList
            data={imageArray}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({first: ITEM_CNT})}
            // onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
          />
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
    borderTopLeftRadius:8,
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
  },
});
