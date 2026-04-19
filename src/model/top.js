import * as R from "ramda";

export const top5 = R.pipe(
  R.toPairs,
  R.sort(R.descend(R.last)), // trier par l'indice 1 de chaque paire
  R.take(5)
);

export const extractTop5 = (chaine, cle) =>
  chaine[cle] ? top5(chaine[cle]) : []; // on gère aussi le cas où l'utilisateur tape quelque chose qui n'apparait pas dans le texte
