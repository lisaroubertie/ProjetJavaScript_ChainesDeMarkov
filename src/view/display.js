import * as R from 'ramda';

export const displayTop5 = (mode, cle, top5) => {
  console.log(`Top 5 après "${cle}" (mode ${mode}) :`);
  R.forEach(([lettre, proba]) => {
    console.log(` ${lettre} -> ${(proba * 100).toFixed(1)}%`);
  }, top5);
}
