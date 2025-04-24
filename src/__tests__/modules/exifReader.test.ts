import { expect } from 'jsr:@std/expect';
import { describe, it } from 'jsr:@std/testing/bdd';
import {
	assertSpyCall,
	assertSpyCalls,
	resolvesNext,
	spy,
	stub,
} from 'jsr:@std/testing/mock';
import { exifReader, sendEmail } from '@modules';
import { utils } from '@utils';
import { ExifDateTime, exiftool, Tags } from 'exiftool-vendored';
import type { ExifTag } from '../../types.ts';

const validTags = {
	CreateDate: {
		day: 21,
		month: 10,
		year: 2024,
		hour: 23,
		minute: 20,
		second: 34,
	} as ExifDateTime,
} as Tags;

describe('exifReader', () => {
	it('should send email if file has no exif data', async () => {
		using result = stub(
			exiftool,
			'read',
			resolvesNext([{ date: 'today' } as Tags]),
		);
		const spyMail = spy(sendEmail);

		await exifReader('test.jpg', spyMail);

		assertSpyCalls(result, 1);
		assertSpyCalls(spyMail, 1);
		assertSpyCall(spyMail, 0, {
			args: ['test.jpg', 'File has no exif data'],
			returned: undefined,
		});
	});
	it('should call areValidExifTags utils method', async () => {
		using result = stub(
			exiftool,
			'read',
			resolvesNext([{ date: 'today' } as Tags]),
		);
		const spyUtils = spy(utils, 'areValidExifTags');

		await exifReader('test.jpg', sendEmail);

		assertSpyCalls(result, 1);
		assertSpyCalls(spyUtils, 1);
		assertSpyCall(spyUtils, 0, {
			args: [{ date: 'today' } as Tags, ['CreateDate'] as ExifTag[]],
			returned: false,
		});
	});
	it('should return the formatted date', async () => {
		using result = stub(
			exiftool,
			'read',
			resolvesNext([validTags]),
		);

		const formattedDate = await exifReader('test.jpg', sendEmail);

		assertSpyCalls(result, 1);
		expect(formattedDate).toEqual('21-10-2024 23:20:34_test');
	});
	it('should call formatExifDate utils method', async () => {
		using result = stub(
			exiftool,
			'read',
			resolvesNext([validTags]),
		);
		const spyUtils = spy(utils, 'formatExifDate');

		await exifReader('test.jpg', sendEmail);

		assertSpyCalls(result, 1);
		assertSpyCalls(spyUtils, 1);
		assertSpyCall(spyUtils, 0, {
			args: [validTags.CreateDate as ExifDateTime],
			returned: '21-10-2024 23:20:34',
		});
	});
});
