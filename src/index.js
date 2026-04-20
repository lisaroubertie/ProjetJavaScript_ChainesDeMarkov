import {letterChain} from "./controller/markovController.js";
import {wordChain} from "./controller/markovController.js";
import {top5} from "./model/top.js";
import fs from "fs";
import * as R from "ramda";

// Création d'un objet avec les chaines de top 5
const data = {
   letters: R.map(top5, letterChain),
  words: R.map(top5, wordChain),
}

// écriture du fichier JSON pour regrouper les chaines de top5
// On ne rappelle pas toute la fonction à chaque lettre ou mot tapé, les chaines sont pré enregistrée
fs.writeFileSync('data/markov.json', JSON.stringify(data));
