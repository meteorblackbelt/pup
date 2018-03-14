import Documents from '../api/Documents/Documents';

const insert = ({ owner, doc }) => Documents.insert({ owner, ...doc });

const update = (doc) => {
  const documentId = doc._id;
  return Documents.update(documentId, { $set: doc });
};

const remove = _id => Documents.remove({_id});

export default {
  insert,
  update,
  remove,
};
