import { ExifDateTime, Tags } from 'exiftool-vendored';
import type { ExifTag } from './types.ts';

function formatExifDate(exifDate: ExifDateTime) {
	const { year, month, day, hour, minute, second } = exifDate;
	const readableDate = new Date(`${year} ${month} ${day}`).toLocaleDateString(
		'en-GB',
		{
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		},
	);

	return `${readableDate} ${hour}_${minute}_${second}`;
}

function areValidExifTags(exifData: Tags, lookUpTags: ExifTag[]) {
	return lookUpTags.map((tag) => exifData[tag] !== undefined).every(Boolean);
}

const utils = {
	formatExifDate,
	areValidExifTags,
};

export { utils };
