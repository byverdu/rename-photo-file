import { ExifDateTime, Tags } from 'exiftool-vendored';
import type { ExifTag } from './types.ts';

function formatExifDate(exifDate: ExifDateTime) {
  const { year, month, day, hour, minute, second } = exifDate;
  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}

function areValidExifTags(
  exifData: Tags,
  lookUpTags: ExifTag[],
) {
  return lookUpTags.map((tag) => exifData[tag] !== undefined).every(Boolean);
}

const utils = {
  formatExifDate,
  areValidExifTags,
};

export { utils };
