/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
import { expect } from 'chai';
import documentTools from './documentTools';
import Documents from '../api/Documents/Documents';


const sampleDoc = {
  title: 'Pug life',
  body: 'The dog\'s body',
};

describe('Test the operations performed by the documentTools.insert function:', function () {
  beforeEach(function () {
    Documents.remove({});
  });
  it('When insert is called, a new record is inserted into the Documents collection', function () {
    documentTools.insert({ owner: 'some_user_id', doc: sampleDoc });
    expect(Documents.find().fetch().length).to.equal(1);
  });
});

describe('Test the operations performed by the documentTools.remove function:', function () {
  let documentIds;
  beforeEach(function () {
    Documents.remove({});
    const fido = documentTools.insert({ owner: 'fido', doc: sampleDoc });
    const lassie = documentTools.insert({ owner: 'lassie', doc: sampleDoc });
    const toto = documentTools.insert({ owner: 'toto', doc: sampleDoc });
    documentIds = {
      fido,
      lassie,
      toto,
    };
  });

  it('When remove is called, that record disappears but the others remain', function () {
    documentTools.remove(documentIds.fido);
    expect(Documents.find().fetch().length).to.equal(2);
  });
});
