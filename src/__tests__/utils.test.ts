import { ExifDateTime, Tags } from 'exiftool-vendored';
import { expect } from 'jsr:@std/expect';
import { describe, it } from 'jsr:@std/testing/bdd';
import { utils } from '@utils';

describe('utils', () => {
  describe('areValidExifTags', () => {
    it('should return false if no tags are provided', () => {
      const result = utils.areValidExifTags({} as Tags, ['CreateDate']);
      expect(result).toBe(false);
    });
    it('should return false if no DateTime tag is provided', () => {
      const result = utils.areValidExifTags(
        {
          DateCreated: '2024:12:02 12:00:00',
        } as Tags,
        ['CreateDate'],
      );
      expect(result).toBe(false);
    });

    it('should return true if DateTime description is provided', () => {
      const result = utils.areValidExifTags(
        { CreateDate: {} } as Tags,
        ['CreateDate'],
      );
      expect(result).toEqual(true);
    });
  });

  describe('formatExifDate', () => {
    it('should return the formatted date', () => {
      const result = utils.formatExifDate({
        day: 21,
        month: 10,
        year: 2024,
        hour: 23,
        minute: 20,
        second: 34,
      } as ExifDateTime);
      expect(result).toBe('21-10-2024 23:20:34');
    });
  });
});
