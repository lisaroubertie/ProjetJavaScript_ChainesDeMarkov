const response = await fetch("../../data/markov.json"); //lecture du JSON contenant les chaines de markov
const markov = await response.json();
//console.log(markov);

// --------------------------------------------------------------------------
// Lettres du clavier
const keys = document.querySelectorAll(".key");

// taper la lettre dans le champs current-word lorsqu'on clic sur le clavier
keys.forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("current-word").textContent += button.textContent;
    const lettre = button.textContent.toLowerCase(); // parce que le clavier est en majuscule
    const highlight = markov.letters[lettre]; // récupération de la proba de la lettre
    keys.forEach((k) => {
      k.style.background = "white" // toutes les lettres sont en blanc
    });
    if (highlight) { // on colorie les lettres les plus probables (si la lettre existe)
      highlight.forEach(([lettre, proba]) => {
        const bouton = Array.from(keys).find(k => k.textContent.toLowerCase() === lettre);
        if (bouton) bouton.style.background = "#8a9c9c"
      });
    }
  });
});

// --------------------------------------------------------------------------
// Bouton espace
const space = document.querySelectorAll(".keyspace");

space.forEach((button) => {
  button.addEventListener("click", () => {
    const phrase = document.getElementById("current-word").textContent; // toute la phrase contenu dans la zone de texte
    document.getElementById("current-word").textContent += " ";
    const dernierMot = phrase.split(" ").at(-1); // le dernier mot tapé
    //console.log(dernierMot);
    const suggestionsTop5 = markov.words[dernierMot.toLowerCase()];
    //console.log(suggestionsTop5);
    document.getElementById("suggestions").textContent = ""; //on vide avant de reremplir
    if (suggestionsTop5) { // création d'un bouton pour les 5 mots les plus probables
      suggestionsTop5.forEach(([mot, proba]) => {
        const btn = document.createElement("button");
        btn.textContent = mot;
        document.getElementById("suggestions").appendChild(btn);
        btn.addEventListener("click", () => {
          document.getElementById("current-word").textContent += mot.toUpperCase();
        });
      });
    };
  })
});

// --------------------------------------------------------------------------
// Bouton delete
const supp = document.querySelectorAll(".keydelete");

supp.forEach((button) => {
  button.addEventListener("click", () => {
    const phrase = document.getElementById("current-word").textContent;
    document.getElementById("current-word").textContent = phrase.slice(0,-1); // suppression du dernier caractère
  });
});

