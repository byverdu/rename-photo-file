import { promises } from 'node:fs';
import path from 'node:path';
import type { EmailModule } from '../types.ts';

type Props = { oldPath: string; newPath: string };

async function renameFile(
	{ oldPath, newPath }: Props,
	emailModule: EmailModule,
) {
	try {
		const { dir, ext, name } = path.parse(oldPath);

		if (name.startsWith('.')) {
			emailModule(oldPath, 'renameFile: Files starting with dot');
			return;
		}

		await promises.rename(oldPath, `${dir}/processed/${newPath}${ext}`);
	} catch (e) {
		emailModule(newPath, `Error renaming file: ${e}`);
	}
}

export { renameFile };
