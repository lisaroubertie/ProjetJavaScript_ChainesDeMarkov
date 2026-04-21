const reponse = await fetch("../../data/markov.json"); //lecture du JSON contenant les chaines de markov
const chainesMarkov = await reponse.json();
//console.log(markov);

// --------------------------------------------------------------------------
// Lettres du clavier
const touches = document.querySelectorAll(".key");

// taper la lettre dans le champs current-word lorsqu'on clic sur le clavier
touches.forEach((bouton) => {
  bouton.addEventListener("click", () => {
    document.getElementById("current-word").textContent += bouton.textContent;
    const lettreSaisie = bouton.textContent.toLowerCase(); // parce que le clavier est en majuscule
    const successeursLettre = chainesMarkov.letters[lettreSaisie]; // récupération de la proba de la lettre
    touches.forEach((t) => {
      t.style.background = "white" // toutes les lettres sont en blanc
    });
    if (successeursLettre) { // on colorie les lettres les plus probables (si la lettre existe)
      successeursLettre.forEach(([lettre, proba]) => {
        const toucheSuccesseur = Array.from(touches).find(t => t.textContent.toLowerCase() === lettre);
        if (toucheSuccesseur) toucheSuccesseur.style.background = "#8a9c9c"
      });
    }
  });
});

// --------------------------------------------------------------------------
// Bouton espace
const toucheEspace = document.querySelectorAll(".keyspace");

toucheEspace.forEach((button) => {
  button.addEventListener("click", () => {
    const phrase = document.getElementById("current-word").textContent; // toute la phrase contenu dans la zone de texte
    document.getElementById("current-word").textContent += " ";
    const dernierMot = phrase.split(" ").at(-1); // le dernier mot tapé
    //console.log(dernierMot);
    const suggestionsTop5 = chainesMarkov.words[dernierMot.toLowerCase()];
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
const toucheSuppr = document.querySelectorAll(".keydelete");

toucheSuppr.forEach((bouton) => {
  bouton.addEventListener("click", () => {
    const phrase = document.getElementById("current-word").textContent; // récupération de la phrase actuelle
    document.getElementById("current-word").textContent = phrase.slice(0,-1); // suppression du dernier caractère
  });
});

