import * as R from 'ramda';

// génère les paires de transition à partir d'un tableau
export const genererPaires = R.aperture;

export const compterTransitions = R.pipe(
  genererPaires(2), // transforme le tableau en paires (courant, suivant)
  R.groupBy(R.head), // regroupe par le premier élément
  R.map(
    R.countBy(R.last), // compte combien de fois chaque successeur apparait
  )
);
