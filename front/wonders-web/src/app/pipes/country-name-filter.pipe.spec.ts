import { CountryNameFilterPipe } from './country-name-filter.pipe';

describe('CountryNameFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new CountryNameFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
