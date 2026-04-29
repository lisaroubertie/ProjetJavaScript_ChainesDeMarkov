# Projet JavaScript Ingé2 : clavier prédictif basé sur les chaînes de Markov 

## Description

Ce projet prend un texte en entrée et construit les chaînes de Markov à partir de celui-ci. J'ai choisi de créer deux modèles distincts : l'un pour les lettres et l'autre pour les mots. Chaque modèle calcule les 5 successeurs les plus probables après une lettre ou un mot donné par l'utilisateur. 

Pour rendre le résultat concret et interactif, j'ai créé une interface sous forme de clavier AZERTY. Les lettres les plus probables sont mises en valeur sur le clavier et les mots proposés s'affichent au-dessus.


## Prérequis

- Node.js v18 ou supérieur
- npm
- npx


## Installation

Cloner le dépôt et installer les dépendances :
```bash
git clone https://github.com/lisaroubertie/ProjetJavaScript_ChainesDeMarkov.git
cd ProjetJavaScript_ChainesDeMarkov
npm install
```


## Utilisation

### 1. Générer les chaînes de Markov (à la première utilisation ou si changement de texte source)
```bash
node src/index.js
```

### 2. Lancer l'interface
```bash
npx serve .
```
Puis ouvrir l'URL indiquée dans le terminal. L'interface charge 'markov.json' et ne recalcule pas les chaînes à chaque saisie.


## Structure du projet

J'ai choisi une architecture MVC que nous avons abordée en cours. Le projet est organisé comme ci-dessous :

```
src/
|--- index.js                         # Point d'entrée qui orchestre les appels
|--- model/
|    |--- normalize.js                # Nettoyage et normalisation du texte
|    |--- count.js                    # Comptage des transitions (paires de lettres/mots)
|    |--- probability.js              # Calcul des probabilités
|    |--- top.js                      # Sélection des 5 successeurs les plus probables
|--- controller/
|    |--- markovController.js         # Fait le lien entre modèle et vue
|--- view/
|    |--- display.js                  # Affichage du clavier et interraction
|    |--- keyboard.html               # Interface clavier
|    |--- keyboard.css                # Esthétique du clavier
data/
|--- text.js                          # Texte source pour les essais
|--- text.txt                         # Texte source définitif
|--- markov.json                      # Chaînes de Markov pré-calculées (top 5)
```

## Choix techniques

**Ramda et programmation fonctionnelle** : Ramda était imposé pour ce projet. J'ai utilisé `R.pipe` pour enchaîner les étapes de transformations des données. J'ai d'abord commencé par normaliser le texte, puis j'ai continué avec le comptage, le calcul des probabilités et le top 5. J'ai utilisé `R.aperture` pour générer les paires de transitions, `R.groupBy` et `R.countBy` pour regrouper les lettres avec leurs occurrences, et `R.map` avec `R.values` pour calculer les probabilités à partir des occurrences.

**Architecture MVC** : J'ai choisi une architecture MVC (Model View Controller) plutôt qu'une architecture DDD car elle sépare plus clairement les responsabilités et me paraissait plus adaptée. Le modèle traite donc les données, la vue permet de gérer l'affichage et le contrôleur fait le lien.

**Deux modes distincts** : Séparer le mode lettres et le mode mots permet d'avoir deux chaînes de Markov indépendantes, chacune construite avec ses probabilités, sans que l'une interfère sur l'autre.

**Pré-calcul des chaînes dans un fichier JSON** : Pour éviter de recalculer les chaînes à chaque saisies utilisateur, j'ai fait le choix de pré-enregistrer le top 5 dans 'data/markov.json' au lancement de 'index.js'. L'interface lit ensuite simplement le fichier et les réponses sont instantanées.


## Démarche et difficultés rencontrées

J'ai commencé ce projet par la normalisation du texte ('normalize.js'). Avant de compter quoi que ce soit, je voulais m'assurer que les données étaient propres. Mon premier problème venait des sauts de ligne (`\n`) qui n'étaient pas filtrés par mon expression régulière. J'ai donc ajouté un `R.replace` plus explicite dans mon pipe qui a réglé le problème.

J'ai ensuite travaillé sur count.js pour générer les paires de transitions. J'ai utilisé `R.aperture(2)`, trouvé dans la documentation Ramda, pour créer des paires de 2 sur un tableau, correspondant bien à ma consigne pour construire les chaînes de Markov.

Le fichier 'probability.js' sert à normaliser les comptages. Pour chaque état (lettre ou mot), il fallait diviser chaque nombre d'occurences par le total des occurrences de cet état pour obtenir une probabilité.

Une autre difficulté rencontrée a été le temps de réponse de WebStorm. Je me suis rapidement rendue compte qu'il n'était pas normal que l'IDE mette plus de 2 minutes à afficher les chaînes de Markov d'un texte de deux lignes. Il semble qu'une autre application entrait en conflit avec WebStorm lors des requêtes : ma réponse était générée en 0,2 secondes, mais WebStorm attendait encore 2 minutes avant de me la renvoyer. N'ayant pas trouvé de solution, j'ai utilisé le terminal Mac à la place, qui fonctionnait parfaitement.

C'est d'ailleurs aussi à cause de ce souci que j'ai décidé de pré-enregistrer les chaînes de Markov dans 'markov.json'.

Avant de passer à l'interface, j'ai vérifié que tout fonctionnait bien avec 'index.js', 'markovController.js' et 'display.js', puis j'ai adapté mes fichiers pour les connecter à l'interface.
Pour l'interface, j'ai créé 'keyboard.html' en tentant de le faire ressembler au maximum avec ce que j'avais en tête. 'display.js' permet de rendre le HTML dynamique (lié à 'index.js' et 'markovController.js'), et 'keyboard.css' gère l'esthétique. Je voulais recréer un clavier dans le style de celui d'Apple dans l'application Message, et le résultat correspond à ce que j'imaginais. 

Après avoir ajouté mon texte définitif, mes derniers deboguages ont surtout consisté à corriger les erreurs que je trouvais lors de mes tests avec l'interface. Il a fallu prendre en compte les `\r` que je n'avais pas anticipés précédemment dans 'normalize.js', et j'ai aussi supprimé les doubles espaces avec `\s+`, car ils comptaient comme des mots.

Enfin, mes derniers commit ont été des changements de noms de variables. Je me suis rendue compte que plusieurs de mes noms de variables étaient des noms de fonctions Ramda. Je les ai donc traduit en français et j'ai choisi des noms plus explicites pour que ce soit plus cohérent et ne pas prêter à confusion.


## Auteur

Lisa Roubertie - classe 2I
