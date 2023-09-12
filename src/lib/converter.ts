import { getWaveBlob } from "webm-to-wav-converter";

interface Converter {
  blobToBase64(blob: Blob): Promise<string>;
  webmBlobToWavBlob(webmBlob: Blob): Promise<Blob>;
}

const converter: Converter = {
  blobToBase64(blob) {
    return new Promise((resolve) => {
      converter.webmBlobToWavBlob(blob).then((wavBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(wavBlob);
        reader.onloadend = () => {
          const data = (reader.result as string).split("base64,")[1];
          resolve(data);
        };
      });
    });
  },
  webmBlobToWavBlob(webmBlob) {
    return new Promise((resolve) => {
      getWaveBlob(webmBlob, false).then((res) => resolve(res));
    });
  },
};

export default converter;
