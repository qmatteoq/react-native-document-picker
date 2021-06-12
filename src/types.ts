import { Platform } from 'react-native'

enum MimeTypes = {
  allFiles: '*/*',
  audio: 'audio/*',
  csv: 'text/csv',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  images: 'image/*',
  pdf: 'application/pdf',
  plainText: 'text/plain',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  video: 'video/*',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip',
}

export const Types = {
  mimeTypes: {
    allFiles: '*/*',
    audio: 'audio/*',
    csv: 'text/csv',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    images: 'image/*',
    pdf: 'application/pdf',
    plainText: 'text/plain',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    video: 'video/*',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    zip: 'application/zip',
  },
  utis: {
    allFiles: 'public.item',
    audio: 'public.audio',
    csv: 'public.comma-separated-values-text',
    doc: 'com.microsoft.word.doc',
    docx: 'org.openxmlformats.wordprocessingml.document',
    images: 'public.image',
    pdf: 'com.adobe.pdf',
    plainText: 'public.plain-text',
    ppt: 'com.microsoft.powerpoint.ppt',
    pptx: 'org.openxmlformats.presentationml.presentation',
    video: 'public.movie',
    xls: 'com.microsoft.excel.xls',
    xlsx: 'org.openxmlformats.spreadsheetml.sheet',
    zip: 'public.zip-archive',
  },
  extensions: {
    allFiles: '*',
    audio:
      '.3g2 .3gp .aac .adt .adts .aif .aifc .aiff .asf .au .m3u .m4a .m4b .mid .midi .mp2 .mp3 .mp4 .rmi .snd .wav .wax .wma',
    csv: '.csv',
    doc: '.doc',
    docx: '.docx',
    images: '.jpeg .jpg .png',
    pdf: '.pdf',
    plainText: '.txt',
    ppt: '.ppt',
    pptx: '.pptx',
    video: '.mp4',
    xls: '.xls',
    xlsx: '.xlsx',
    zip: '.zip .gz',
    folder: 'folder',
  },
}
type TypesType = typeof Types
export type PlatformTypesType = {
  android: TypesType['mimeTypes']
  ios: TypesType['utis']
  windows: TypesType['extensions']
}

export const platformTypes = Platform.select({
  ios: Types.utis,
  android: Types.mimeTypes,
  windows: Types.extensions,
})
