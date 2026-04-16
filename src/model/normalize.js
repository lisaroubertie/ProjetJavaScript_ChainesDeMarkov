import * as R from 'ramda';

// remplace les caracteres avec accents par la lettre sans accents
export const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

export const normalizeText = R.pipe(
      removeAccents,
      R.toLower, // on remplace les majuscules par des minuscules
      R.replace(/[^a-z\s]/g, ""), // si c'est pas une lettre ou un espace, on remplace par rien
    )
