import { exifReader } from '@modules';

const fileName = await exifReader(
  'src/example-assets/sample.HEIC',
  (filePath, msg) => {
    console.log(filePath, msg);
  },
);

console.log(fileName);
