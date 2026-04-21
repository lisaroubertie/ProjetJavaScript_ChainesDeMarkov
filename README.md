# Projet JavaScript Ingé2 : clavier prédictif basé sur les chaînes de Markov 

## Description

Ce projet prend un texte en entrée et construit les chaînes de Markov. J'ai fait le choix de créer 2 modèles distincts : l'un pour les lettres, l'autre pour les mots. Chaque modèle calcule les 5 successeurs les plus probables après une lettre ou un mot donné par l'utilisateur. 

Pour rendre le résultat concret et interactif, j'ai créé une interface sous forme de clavier AZERTY. J'ai choisi de présenter cela avec une mise en valeur des lettres les plus probables, tandis que les mots les plus probables s'affichent au dessus du clavier.


## Prérequis

- Node.js v18 ou supérieur
- npm
- npx


## Installation

Cloner le dépôt et installer les dépendances :
git clone [url]
cd Projet
npm install


## Utilisation

### 1. Générer les chaînes de Markov (optionnel / utile si changement de texte source)
*node src/index.js*

### 2. Lancer l'interface
*npx serve .*
Puis ouvrir l'URL indiquée dans le terminal. L'interface charge 'markov.json' et ne recalcule pas les chaînes à chaque saisie.


## Structure du projet

J'ai choisi une architecture MVC que nous avons abordé en cours. Mon projet se présente donc comme ci-dessous :

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


## Choix techniques

**Ramda et programmation fonctionnelle** : Ramda était imposé dans le cadre de ce projet. J'ai utilisé `R.pipe` pour chaîner les transformations de données, ce qui permet de lire le code comme une suite d'étape claires. J'ai commencé par normaliser, compter, puis calculer les probabilités, avant de créer un top 5. J'ai également utilisé `R.aperture` pour générer les paires de transitions, `R.groupBy` et `R.countBy` pour joindre les lettres avec leurs occurences correspondantes, et `R.map` avec `R.values` les probabilités.

**Architecture MVC** : J'ai choisi une architecture MVC (Model View Controller) plutôt qu'une architecture DDD car elle sépare clairement les responsabilités. Le modèle traite les données, la vue les affiches et le contrôleur fait le lien.

**Deux modes distincts** : Le choix de séparer le mode lettres et le mode mots permet d'avoir deux chaînes de Markov indépendantes, chacune construite avec ses probabilités, sans que l'une interfère sur l'autre.

**Pré-calcul des chaînes dans un fichier JSON** : Pour éviter de recalculer les chaînes à chaque saisies utilisateurs, j'ai fait le choix de pré-enregistrer le top 5 dans 'data/markov.json' au lancement de 'index.js'. L'interface se contente ensuite de lire ce fichier ce qui rend les réponses instantanées.


## Démarche et difficultés rencontrées

J'ai commencé ce projet par la normalisation du texte ('normalize.js'). Il me semblait qu'avant de compter quoi que ce soit, il fallait s'assurer que les données étaient propres. J'ai alors rencontré mon premier problème avec les sauts de ligne (`/n'`) qui n'étaient pas filtrés par mon expression régulière. J'ai donc ajouté un `R.replace` plus explicite dans mon pipe et le problème a été résolu.

J'ai ensuite travaillé sur count.js, où la difficulté était de générer les paires de transitions. J'ai utilisé `R.aperture(2)`, trouvé dans la documentation Ramda, pour créer des paires de 2 sur un tableau, correspondant bien à ma consigne pour recréer les chaînes de Markov.

La partie 'probability.js' m'a demandé de réfléchir à la normalisation des comptages. Pour chaque état (lettre ou mot), il fallait diviser chaque nombre d'occurences par le total des occurrences de cet état, afin d'obtenir une probabilité entre 0 et 1.

Une autre difficulté rencontrée a été le temps de réponse de WebStorm. Je me suis rapidement rendue compte qu'il n'était pas normal que l'IDE mette plus de 2 minutes à afficher les chaînes de Markov d'un texte de deux lignes. Il semblait qu'une autre application entrait en conflit avec WebStorm lors des requêtes : ma réponse était généré en 0,2 secondes, mais WebStorm attendait encore 2 minutes avant de me la renvoyer. N'ayant pas trouvé de solution, j'ai utilisé le terminal Mac à la place, qui fonctionnait parfaitement.

C'est d'ailleurs cette difficulté qui m'a poussée à pré-enregistrer les chaînes de Markov dans 'markov.json'. Plutôt que de recalculer le top 5 à chaque saisie, l'interface n'a plus qu'à lire le fichier, ce qui rend les réponses instantanées.

Avant de passer à l'interface, je me suis assurée que tout fonctionnait correctement avec 'index.js', 'markovController.js' et 'display.js'.
Pour l'interface, j'ai commencé à réfléchir à ce que je voulais voir apparaitre, puis j'ai créé 'keyboard.html'. 'display.js' permet de rendre le HTML dynamique (lié à 'index.js' et 'markovController.js'), et 'keyboard.css' gère l'esthétique. Je souhaitais recréer un clavier dans le style de celui d'Apple dans l'application Message, et le résultat correspond à ce que j'imaginais. 

Après avoir ajouté mon texte définitif, mes derniers deboguages ont consisté à corriger les erreurs que je trouvais lors des essais avec mon clavier interractif. Il a fallu prendre en compte les `/r` que je n'avais pas anticipé précédement dans 'normalize.js', et j'ai aussi supprimé les doubles espaces avec `\s+, car ils comptaient comme des mots.


## Auteur

Lisa Roubertie - classe 2I
