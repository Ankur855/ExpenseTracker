//@ts-ignore
import {create} from 'react-native-pixel-perfect';

const designResolution = {
  width: 375,
  height: 812,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);
const scaler = (size: any) => perfectSize(size);
export default scaler;
