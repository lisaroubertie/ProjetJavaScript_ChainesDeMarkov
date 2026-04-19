import * as R from 'ramda';
import {text} from '../data/text.js';
import {normalizeText} from "./model/normalize.js";
import {count} from "./model/count.js";
import {returnProba} from "./model/probability.js";
import {extractTop5} from "./model/top.js";

console.log("--- Avec des lettres ---")
const letters = normalizeText(text).split("");
console.log(extractTop5(returnProba(count(letters)), "a"));

console.log("--- Avec des mots ---")
const words = normalizeText(text).split(" ");
console.log(extractTop5(returnProba(count(words)), "le"));
