import {FILE_ENCRYPTION_ENABLED, IMAGE_FILE_FORMAT} from '@utils';

import ScanbotSDK, {SdkConfiguration} from 'react-native-scanbot-sdk';

async function initializeScanbotSDK() {
  try {
    const configuration = new SdkConfiguration({
      licenseKey: 'YOUR_SCANBOT_LICENSE_KEY',
      loggingEnabled: true,
      enableNativeLogging: false,
      storageImageFormat: IMAGE_FILE_FORMAT,
      storageImageQuality: 80,
      allowGpuAcceleration: true,
      allowXnnpackAcceleration: true,
    });

    // Set the following properties to enable encryption.
    if (FILE_ENCRYPTION_ENABLED) {
      configuration.fileEncryptionMode = 'AES256';
      configuration.fileEncryptionPassword =
        'SomeSecretPa$$w0rdForFileEncryption';
    }

    const sdkInitializationResult = await ScanbotSDK.initialize(configuration);
  } catch (error: any) {
    console.error(error);
  }
}
