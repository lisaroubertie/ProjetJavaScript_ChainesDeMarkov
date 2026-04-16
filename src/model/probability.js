import * as R from 'ramda';

export const total = R.pipe(
  R.values,
  R.sum
);

export const probability = objet =>
  R.map(x => x / total(objet), objet);

export const returnProba = R.map(probability);
