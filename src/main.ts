import { exifReader, renameFile, sendEmail } from '@modules';

const filePath = 'src/example-assets/.test_3.HEIC';

try {
  const fileName = await exifReader(filePath, sendEmail);
  await renameFile(
    { oldPath: filePath, newPath: `${fileName ?? ''}` },
    sendEmail,
  );
} catch (error) {
  console.error(error);
}
