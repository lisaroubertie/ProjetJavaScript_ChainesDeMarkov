import * as R from 'ramda';

// remplace les caracteres avec accents par la lettre sans accents
export const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

export const normalizeText = R.pipe(
      removeAccents,
      R.toLower, // on remplace les majuscules par des minuscules
      R.replace(/\n/g, " "), // retirage des \n manuellement car ils apparaissent encore après normalize
      R.replace(/\r/g, " "), // pour les fichiers windows
      R.replace(/\s+/g, " "), // pour un ou plusieurs espaces consécutifs
      R.replace(/[^a-z\s]/g, ""), // si c'est pas une lettre ou un espace, on remplace par rien
    )
