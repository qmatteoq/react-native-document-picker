import { Platform, NativeModules } from 'react-native'
import type { PlatformTypesType } from './types'
import { platformTypes } from './types'
import invariant from 'invariant'

type DocumentPickerType = {
  pick(options: Record<string, any>): Promise<any>
  releaseSecureAccess(uris: string[]): Promise<void>
}

const RNDocumentPicker: DocumentPickerType = NativeModules.RNDocumentPicker

if (!RNDocumentPicker) {
  // Use a timeout to ensure the warning is displayed in the YellowBox
  setTimeout(() => {
    console.warn(
      'RNDocumentPicker: Native module is not available: Either the native module was not properly installed (please follow readme installation instructions)' +
        "or you're running in a environment without native modules (eg. JS tests in Node). A module mock is not available at this point, contributions are welcome!",
    )
  }, 0)
}

const E_DOCUMENT_PICKER_CANCELED = 'DOCUMENT_PICKER_CANCELED'

function isCancel(err: Error & { code: string }) {
  return err && err.code === E_DOCUMENT_PICKER_CANCELED
}

type SupportedPlatforms = 'ios' | 'android' | 'windows'

type DocumentPickerOptions<OS extends keyof PlatformTypesType> = {
  type?: Array<PlatformTypesType[OS][keyof PlatformTypesType[OS]]> | PlatformTypesType[OS]
  mode?: 'import' | 'open'
  copyTo?: 'cachesDirectory' | 'documentDirectory'
  multiple?: boolean
}

function pickMultiple(opts) {
  const options = {
    ...opts,
    multiple: true,
  }

  return pick(options)
}

function pick<OS extends keyof PlatformTypesType = SupportedPlatforms>(
  opts: Readonly<DocumentPickerOptions<OS>>,
) {
  const options = {
    multiple: false,
    ...opts,
  }
  if (!('type' in options)) {
    options.type = platformTypes.allFiles
  }
  options.type = Array.isArray(options.type) ? options.type : [options.type]

  return doPick(options)
}

function doPick<OS extends keyof PlatformTypesType = SupportedPlatforms>(
  options: DocumentPickerOptions<OS> & { type: string[] },
) {
  invariant(
    !('filetype' in options),
    'A `filetype` option was passed to DocumentPicker.pick, the correct option is `type`',
  )
  invariant(
    !('types' in options),
    'A `types` option was passed to DocumentPicker.pick, the correct option is `type`',
  )

  invariant(
    options.type.every((type: unknown) => typeof type === 'string'),
    `Unexpected type option in ${options.type}, did you try using a DocumentPicker.types.* that does not exist?`,
  )
  invariant(
    options.type.length > 0,
    '`type` option should not be an empty array, at least one type must be passed if the `type` option is not omitted',
  )

  if (options.type.length > 1) {
    invariant(
      !options.type.includes('folder'),
      'When type array is folder then other options are not supported',
    )
  }

  if ('mode' in options && !['import', 'open'].includes(options.mode ?? '')) {
    throw new TypeError('Invalid mode option: ' + options.mode)
  }

  if (
    'copyTo' in options &&
    !['cachesDirectory', 'documentDirectory'].includes(options.copyTo ?? '')
  ) {
    throw new TypeError('Invalid copyTo option: ' + options.copyTo)
  }

  return RNDocumentPicker.pick(options)
}

function releaseSecureAccess(uris: Array<string>): Promise<void> {
  if (Platform.OS !== 'ios') {
    return Promise.resolve()
  }

  invariant(
    Array.isArray(uris) && uris.every((uri) => typeof uri === 'string'),
    `"uris" should be an array of strings, was ${uris}`,
  )

  return RNDocumentPicker.releaseSecureAccess(uris)
}

export default {
  isCancel,
  releaseSecureAccess,
  pick,
  pickMultiple,
  types: platformTypes,
}
