/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai';
import { year } from './dates';

describe('Test that the date.year function return sensible values:', function () {
  it('A timestamp from the year 2018 will return 2018', function(){
    const timestamp = 1521026489683;
    expect(year(timestamp)).to.equal('2018');
  });
  it('A timestamp from before the epoch will not return a stupid number');
  it('A timestamp from 4 b.c. works');
});
