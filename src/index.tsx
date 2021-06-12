import { NativeModules } from 'react-native';

type DocumentPickerType = {
  multiply(a: number, b: number): Promise<number>;
};

const { DocumentPicker } = NativeModules;

export default DocumentPicker as DocumentPickerType;
