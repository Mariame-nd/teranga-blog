# Teranga Blog

Mini-blog multipage construit avec React 19, Vite et React Router, pour le cours React
de M. Diouf (chapitres 0 à 5). Les articles, les auteurs et les commentaires viennent de
l'API publique de démonstration JSONPlaceholder (les textes sont en latin : ce sont des
données d'essai).

## Ce que fait l'application

- Navigation sans rechargement, avec le lien de la page courante mis en valeur
- Liste d'articles avec recherche par titre
- Page de détail d'un article par adresse (`/articles/3`) avec ses commentaires
- Formulaire de commentaire avec validation (le commentaire est ajouté localement, rien n'est envoyé à l'API)
- Favoris : bouton sur chaque article, compteur dans la barre de navigation, page dédiée
- Liste des auteurs et fiche de chaque auteur avec ses articles
- Messages de chargement et d'erreur, page 404
- Niveau Or : connexion simulée et route protégée `/mon-espace`

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvre ensuite l'adresse affichée dans le terminal (par défaut http://localhost:5173).

## Adresse en ligne

https://ton-adresse.vercel.app

## Structure du projet

```
src/
  components/   briques réutilisables (cartes, formulaires, listes, route protégée)
  pages/        une page par route
  layouts/      mise en page partagée (barre de navigation + Outlet)
  router.jsx    table des routes
  main.jsx      fourni
  constants.js  adresse de l'API (fourni)
public/         logo-teranga-blog.png
vercel.json     redirige toutes les adresses vers index.html (rechargement des routes en ligne)
```

## Trois choses que j'ai apprises

1. (à écrire avec tes mots)
2. (à écrire avec tes mots)
3. (à écrire avec tes mots)