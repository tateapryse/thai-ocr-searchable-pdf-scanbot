import {resultMessageAlert, errorMessageAlert} from '@utils';
import ScanbotSDK, {
  ScanbotPdfImageExtractor,
  ScanbotOcrEngine,
  ScanbotPdfGenerator,
  PdfConfiguration,
} from 'react-native-scanbot-sdk';

/**
 * Example: extract images from a PDF file and run OCR on them.
 * Notes:
 * - `pdfFileUri` must be an accessible file URI on the device (e.g. copied into app files or external storage).
 * - Make sure the Scanbot OCR language data for Thai ("tha") is installed in the SDK on the device.
 *   For iOS add the `tha.traineddata` to the `ScanbotSDKOCRData.bundle`.
 *   For Android add the `tha.traineddata` to the OCR languages folder in assets (see Scanbot docs).
 */
export async function ocrPdfThaiExample(pdfFileUri: string): Promise<string> {
  try {
    // Extract PDF pages as images. Returns a string[] of image file URIs.
    const imageFiles = await ScanbotPdfImageExtractor.extractImageFiles({
      pdfFileUri,
    });

    if (!imageFiles || imageFiles.length === 0) {
      throw new Error('No images extracted from PDF');
    }

    // Perform OCR on the extracted images; request Thai language explicitly
    const ocrResult = await ScanbotOcrEngine.recognizeOnImages({
      images: imageFiles,
      configuration: {
        engineMode: 'TESSERACT',
        languages: ['tha'],
      },
    });

    // Return recognized text
    return ocrResult.recognizedText ?? '';
  } catch (e: any) {
    throw e;
  }
}

/**
 * Example: produce a searchable ("sandwich") PDF with a Thai OCR text layer.
 * Extracts the source PDF's pages to images, then generates a NEW PDF whose
 * pages carry an invisible, selectable Thai text layer over the original image.
 * Returns the file URI of the generated PDF.
 */
export async function ocrSearchablePdfThaiExample(
  pdfFileUri: string,
): Promise<string> {
  // Rasterize the source PDF pages to images. Returns a string[] of file URIs.
  const imageFiles = await ScanbotPdfImageExtractor.extractImageFiles({
    pdfFileUri,
  });

  if (!imageFiles || imageFiles.length === 0) {
    throw new Error('No images extracted from PDF');
  }

  // Generate a searchable PDF. CUSTOM/AUTO keeps each page at the original
  // scan's size/orientation. TESSERACT + 'tha' adds the Thai text layer.
  const pdfUri = await ScanbotPdfGenerator.generateFromImages({
    images: imageFiles,
    pdfConfiguration: new PdfConfiguration({
      pageSize: 'CUSTOM',
      pageDirection: 'AUTO',
    }),
    ocrConfiguration: {
      engineMode: 'TESSERACT',
      languages: ['tha'],
    },
  });

  return pdfUri;
}

// Example usage note:
// Copy `src/files/MSIG.pdf` to your device and pass its file URI to `ocrPdfThaiExample`.
// On Android you can copy the file to external storage or serve it via a file provider.
