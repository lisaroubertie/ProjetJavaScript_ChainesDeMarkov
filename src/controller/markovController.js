import * as R from 'ramda';
import {normaliserTexte} from "../model/normalize.js";
import {compterTransitions} from "../model/count.js";
import {construireChaineProba} from "../model/probability.js";
import fs from "fs"

// lecture du texte source
const texteSource = fs.readFileSync("data/text.txt", "utf8");

// découpage du texte normalisé en tableaux de symboles
const tableauLettres = normaliserTexte(texteSource).split(""); // symbole = lettre
const tableauMots = normaliserTexte(texteSource).split(" "); // symbole = mot

// construction des 2 chaines de Markov avec proba
export const chaineLettres = construireChaineProba(compterTransitions(tableauLettres));
export const chaineMots = construireChaineProba(compterTransitions(tableauMots));
