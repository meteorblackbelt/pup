import Documents from '../api/Documents/Documents';

const insert = ({ owner, doc }) => Documents.insert({ owner, ...doc });

const update = (doc) => {
  const { _id, ...rest } = doc;
  return Documents.update({ _id }, { $set: rest });
};

const remove = _id => Documents.remove({ _id });

export default {
  insert,
  update,
  remove,
};
