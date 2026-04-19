# Projet JavaScript Ingé2 : clavier prédictif basé sur les chaines de Markov 

## Description

Ce projet prend un texte en entrée et en construit les chaînes de Markov. J'ai fait le choix de créer 2 modèles distincts : l'un pour les lettres, l'autre pour les mots. Chaque modèle calcule les 5 successeurs les plus probables après une lettre ou un mot donné par l'utilisateur. 

Pour rendre le résultat concret et interactif, j'ai créé une interface sous forme de clavier AZERTY. J'ai choisi de présenter cela avec une mise en valeur des lettres les plus probables, tandis que les mots les plus probables s'affichent au dessus du clavier.


## Prérequis
- Node.js v18 ou supérieur
- npm

## Installation
Cloner le dépôt et installer les dépendances :
git clone [url]
cd [nom du dossier]
npm install


## Utilisation
node --watch src/index.js


## Structure du projet
[à updater à la fin]
J'ai choisi une architecture MVC que nous avons abordé en cours. Mon projet se présente donc comme ci-dessous :

src/
|--- index.js                         # Point d'entrée qui gère tous les fichiers
|--- model/
|    |--- normalize.js                # Nettoyage et normalisation du texte
|    |--- count.js                    # Compte des transitions (paires)
|    |--- probability.js              # Calcul des probabilités
|    |--- top.js                      # Sélection du top 5
|--- controller/
|    |--- markovController.js
|--- view/
|    |--- display.js
data/
|--- text.js                          # Texte source


## Choix techniques

**Ramda et programmation fonctionnelle** : Ramda était imposé dans le cadre de ce projet. J'ai utilisé R.pipe pour chaîner les transformations de données, ce qui permet de lire le code comme une suite d'étape claires. J'ai commencé par normaliser, puis compter et enfin calculer les probabilités.

**Architecture MVC** : J'ai choisi une architecture MVC (Model View Controller) plutot qu'une architecture DDD car elle sépare clairement les responsabilités. Le modèle traite les données, la vue les affiches et le contrôleur fait le lien.


## Auteur
Lisa Roubertie - classe 2I
