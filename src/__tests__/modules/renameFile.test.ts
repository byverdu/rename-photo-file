import { expect } from 'jsr:@std/expect';
import { describe, it } from 'jsr:@std/testing/bdd';
import {
  assertSpyCall,
  assertSpyCalls,
  spy,
  stub,
} from 'jsr:@std/testing/mock';
import { renameFile, sendEmail } from '@modules';
import { promises } from 'node:fs';

const oldPath = 'src/example-assets/sample.mov';
const newPath = '21-10-2024 23:20:34_sample';

describe('renameFile', () => {
  it('should only call sendEmail when there is an error renaming the file', async () => {
    using result = stub(
      promises,
      'rename',
      () => {
        throw new Error('rename error');
      },
    );

    const spyMail = spy(sendEmail);

    await renameFile({ oldPath, newPath }, spyMail);

    assertSpyCalls(spyMail, 1);
    assertSpyCall(spyMail, 0, {
      args: [
        '21-10-2024 23:20:34_sample',
        'Error renaming file: Error: rename error',
      ],
      returned: undefined,
    });
    assertSpyCalls(result, 1);
    expect(result).toThrow('rename error');
  });
});
