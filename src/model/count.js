import * as R from 'ramda';

export const toPair = R.aperture;

export const count = R.pipe(
  toPair(2),
  R.groupBy(R.head),
  R.map(
    R.countBy(R.last),
  )
);
