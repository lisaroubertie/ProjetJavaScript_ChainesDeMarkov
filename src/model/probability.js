import * as R from 'ramda';

// calcule la somme de toutes les valeurs d'un objet
export const sommeOccurences = R.pipe(
  R.values, // extraction des valeurs
  R.sum // addition
);

// création des probabilités
export const calculerProbabilites = objet =>
  R.map(x => x / sommeOccurences(objet), objet); // divise le nombre d'occurences par le total des occurences de l'objet

// transformation de toute la chaîne en probabilités
export const construireChaineProba = R.map(calculerProbabilites);
