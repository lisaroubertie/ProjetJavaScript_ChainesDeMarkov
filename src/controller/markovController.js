import * as R from 'ramda';
import {text} from '../../data/text.js';
import {normalizeText} from "../model/normalize.js";
import {count} from "../model/count.js";
import {returnProba} from "../model/probability.js";
import {extractTop5} from "../model/top.js";

const letters = normalizeText(text).split("");
const words = normalizeText(text).split(" ");

export const letterChain = returnProba(count(letters));
export const wordChain = returnProba(count(words));

export const getTop5 = (mode, cle) => {
  if (mode === "letters") {
    return extractTop5(letterChain, cle);
  } else {
    return extractTop5(wordChain, cle)
  }
}
