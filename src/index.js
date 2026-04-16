import * as R from 'ramda';
import {text} from '../data/text.js';
import {normalizeText} from "./model/normalize.js";
import {count} from "./model/count.js";
import {returnProba} from "./model/probability.js";

console.log("--- Avec des lettres ---")
const letters = normalizeText(text).split("");
console.log(returnProba(count(letters)));

console.log("--- Avec des mots ---")
const words = normalizeText(text).split(" ");
console.log(returnProba(count(words)));
