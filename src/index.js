import {chaineLettres} from "./controller/markovController.js";
import {chaineMots} from "./controller/markovController.js";
import {selectionnerTop5} from "./model/top.js";
import fs from "fs";
import * as R from "ramda";

// Création d'un objet avec les chaines de top 5 pour chaque lettre et mot
const chainesTop5 = {
   letters: R.map(selectionnerTop5, chaineLettres),
  words: R.map(selectionnerTop5, chaineMots),
}

// écriture du fichier JSON pour regrouper les chaines de top5
// On ne rappelle pas toute la fonction à chaque lettre ou mot tapé, les chaines sont pré enregistrée
fs.writeFileSync('data/markov.json', JSON.stringify(chainesTop5));
