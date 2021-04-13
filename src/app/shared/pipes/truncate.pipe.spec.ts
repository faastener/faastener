import {TruncatePipe} from './truncate.pipe';

describe('TruncatePipe', () => {
  it('should return a truncated string using default settings (25 chars, ignore words splitting, "..." as ellipsis)', () => {
    let pipe = new TruncatePipe();

    let longString = 'I am a long string with 37 characters';

    expect(pipe.transform(longString)).toBe('I am a long string with 3...');
  });
});
