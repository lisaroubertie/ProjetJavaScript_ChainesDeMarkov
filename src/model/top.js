import * as R from "ramda";

// selectionne les 5 successeurs les plus probables parmis les paires
export const selectionnerTop5 = R.pipe(
  R.toPairs, // convertit l'objet en tableau de paires
  R.sort(R.descend(R.last)), // trier par les proba de chaque paire
  R.take(5) // ne garde que les 5 premières paires
);

// retourne le top 5 des successeurs pour une clé donnée dans une chaine de Markov
export const extraireTop5 = (chaine, cle) =>
  chaine[cle] ? selectionnerTop5(chaine[cle]) : []; // on gère aussi le cas où l'utilisateur tape quelque chose qui n'apparait pas dans la chaine (on retourne un tableau vide)
