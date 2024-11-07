import { ExifDateTime, exiftool } from 'exiftool-vendored';
import path from 'node:path';
import { utils } from '@utils';
import type { EmailModule, ExifTag } from '../types.ts';

export const exifReader = async (
  filePath: string,
  emailModule: EmailModule,
) => {
  try {
    const tags = await exiftool.read(filePath);

    if (!utils.areValidExifTags(tags, ['CreateDate'] as ExifTag[])) {
      emailModule(filePath, 'File has no exif data');
      return;
    }

    const formattedExifDate = utils.formatExifDate(
      tags.CreateDate as ExifDateTime,
    );

    return `${formattedExifDate}_${path.parse(filePath).name}`;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    emailModule(filePath, 'Error processing file');
  }
};
