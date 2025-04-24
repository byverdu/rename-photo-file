import { exifReader, renameFile, sendEmail } from '@modules';
import Watcher from 'watcher';
import { DEV_WATCHER_FOLDER, ENVS, VALID_IMAGE_EXTENSION } from '@constants';
import path from 'node:path';
import process from 'node:process';
import 'jsr:@std/dotenv/load';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const NODE_ENV = process.env.NODE_ENV ?? ENVS.DEVELOPMENT;
const WATCHER_FOLDER_PATH = Deno.env.get('WATCHER_FOLDER_PATH');
const watchFolder = NODE_ENV === ENVS.PRODUCTION
	? WATCHER_FOLDER_PATH
	: DEV_WATCHER_FOLDER;

if (!existsSync(`${watchFolder}/processed`)) {
	mkdirSync(`${watchFolder}/processed`);
}

const watcher = new Watcher(watchFolder, { persistent: true });

let processedFiles = 0;
let totalFiles = 0;

watcher.on('add', (oldPath) => {
	if (VALID_IMAGE_EXTENSION.test(path.extname(oldPath))) {
		totalFiles++;
	}
});

watcher.on('add', async (oldPath) => {
	if (VALID_IMAGE_EXTENSION.test(path.extname(oldPath))) {
		console.log(`New file to process: ${oldPath}`);

		try {
			const newPath = await exifReader(oldPath, sendEmail) ?? '';

			await renameFile(
				{ oldPath, newPath },
				sendEmail,
			);
		} catch (error) {
			// TODO: Send email
			console.error(error);
		} finally {
			processedFiles++;

			if (processedFiles === totalFiles) {
				const formattedDate = new Date().toLocaleDateString('en-GB', {
					day: '2-digit',
					month: 'short',
					year: 'numeric',
				});

				writeFileSync(`${watchFolder}/latest.txt`, formattedDate);
				processedFiles = 0;
				totalFiles = 0;
			}
		}
	}
});

watcher.on('error', (error) => {
	// TODO: Send email
	console.error('Watcher error:', error);
});
