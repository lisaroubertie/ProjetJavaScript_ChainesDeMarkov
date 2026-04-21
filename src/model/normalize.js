import * as R from 'ramda';

// remplacement des caracteres avec accents par la lettre sans accents
export const supprimerAccents = (texte) => texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

export const normaliserTexte = R.pipe(
      supprimerAccents,
      R.toLower, // mise en minuscule
      R.replace(/\n/g, " "), // remplacement des \n par des espaces
      R.replace(/\r/g, " "), // remplacement des \r par des espaces
      R.replace(/\s+/g, " "), // remplacment des espaces consécutifs par un espace
      R.replace(/[^a-z\s]/g, ""), // suppression des caractères qui ne sont ni des lettres ni un espace
      R.trim // supprimer les espaces de début et fin
    )
