import * as R from 'ramda';
import {text} from '../data/text.js';
import {normalizeText} from "./model/normalize.js";
import {toPair} from "./model/count.js";
import {count} from "./model/count.js";

console.log(count(normalizeText(text).split("")));
