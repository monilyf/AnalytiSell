import { PermissionsAndroid } from "react-native";

async function requestExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "External Storage Permission",
        message: "App needs access to your external storage",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("External storage permission granted");
    } else {
      console.log("External storage permission denied");
    }
    return granted;
  } catch (error) {

      console.warn(error);
    return false;
  }
}

export {requestExternalStoragePermission};