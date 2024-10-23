import { Tags } from 'exiftool-vendored';

export type ExifTag = keyof Tags;
export type EmailModule = (filePath: string, msg: string) => void;
