import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FeatureItem} from '@components';
import {selectPDFFile, resultMessageAlert, errorMessageAlert} from '@utils';
import {
  ocrPdfThaiExample,
  ocrSearchablePdfThaiExample,
} from '@codeSnippets/document/result-handling/ocr-msig';
import RNFS from 'react-native-fs';

export function OcrTestScreen() {
  const onRunTest = useCallback(async () => {
    try {
      const pdfUri = await selectPDFFile();
      if (!pdfUri) return;

      await runOcr(pdfUri);
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);

  const onRunAutoTest = useCallback(async () => {
    try {
      const path = RNFS.ExternalDirectoryPath + '/MSIG.pdf';
      const exists = await RNFS.exists(path);
      if (!exists) {
        throw new Error(`File not found at ${path}. Please ensure you pushed it via adb to the app's external files directory.`);
      }
      await runOcr('file://' + path);
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);

  const onRunSearchablePdf = useCallback(async () => {
    try {
      const path = RNFS.ExternalDirectoryPath + '/MSIG.pdf';
      const exists = await RNFS.exists(path);
      if (!exists) {
        throw new Error(`File not found at ${path}. Please push it via adb.`);
      }
      // Generate the searchable Thai PDF
      const pdfUri = await ocrSearchablePdfThaiExample('file://' + path);

      // Copy it to the app's external files dir so it can be pulled via adb
      const src = pdfUri.replace('file://', '');
      const outPath = RNFS.ExternalDirectoryPath + '/MSIG_searchable.pdf';
      if (await RNFS.exists(outPath)) {
        await RNFS.unlink(outPath);
      }
      await RNFS.copyFile(src, outPath);

      resultMessageAlert(`Searchable PDF saved to:\n${outPath}`);
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);

  const runOcr = async (pdfUri: string) => {
    const recognizedText = await ocrPdfThaiExample(pdfUri);

    const outPath = RNFS.DocumentDirectoryPath + '/msig_ocr.txt';
    await RNFS.writeFile(outPath, recognizedText, 'utf8');

    resultMessageAlert(`OCR saved to: ${outPath}\n\nText: ${recognizedText.substring(0, 100)}...`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>OCR Thai Test</Text>
      <FeatureItem onPress={onRunTest} title={'Select PDF and OCR (Thai)'} />
      <FeatureItem onPress={onRunAutoTest} title={'Auto-run OCR on pushed MSIG.pdf'} />
      <FeatureItem
        onPress={onRunSearchablePdf}
        title={'Make searchable Thai PDF from MSIG.pdf'}
      />
      <Text style={styles.note}>
        Make sure `tha.traineddata` is included in Android assets at
        `android/app/src/main/assets/ocr_blobs/tha.traineddata`.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  header: {fontSize: 18, fontWeight: '600', marginBottom: 12},
  note: {marginTop: 16, color: 'gray'},
});
