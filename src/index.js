import {getTop5} from "./controller/markovController.js";
import {displayTop5} from "./view/display.js";

displayTop5("letters", "a", getTop5("letters", "a"));
displayTop5("letters", "e", getTop5("letters", "e"));
displayTop5("words", "le", getTop5("words", "le"));
displayTop5("words", "la", getTop5("words", "la"));
