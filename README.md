# Elysia with Bun runtime

## Archritecture Back-end
### Prisma.Io 
Prisma (ORM) is a software development tool that simplifies access to a database in applications. It provides an abstraction layer to interact with various relational databases, making it easier to create, manage, and manipulate data in an application
### MongoDb
MongoDB is a popular, open-source, NoSQL database management system. It is designed to store and manage large volumes of data, including unstructured and semi-structured data. 
### Elysia.js
Framework Javascript Bun.js

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```
## Install Dependencies 
```bash
bun  install / npm install
```
## Development
To start the development server run:
```bash
bun  dev
```
## Packages
### @elysiajs/cron
Ce package permet au développeurs de lancer des scripts CRON avec elysia . Le cron est un scprit automatique lancer en arrière plan qui permet d'éfféctuer différentes taches à un moment donné ( jour / heure) / temps du lancement du programme.
### @elysiajs/html
Ce package permet de générer du contenu hmtl dynamique (connecté ) au donnée du serveur pour un rendu dynamique
### @elysiajs/cors
Ce package permet de gérer les problèmes liés à CORS dans leurs applications backend construites avec ElysiaJS. Il permet de configurer et de gérer les politiques CORS, telles que la spécification des domaines autorisés à envoyer des requêtes au serveur, la gestion des en-têtes de requête et la gestion des en-têtes de réponse. Ce package garantit un accès sécurisé et contrôlé aux ressources de différents domaines tout en maintenant la sécurité de l'application.


Open http://localhost:3000/ 
