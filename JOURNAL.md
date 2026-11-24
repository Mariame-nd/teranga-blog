# Journal de bord : utilisation de l'IA

Le professeur a levé la restriction sur l'usage de l'IA pour ce projet. J'ai utilisé l'IA
(Claude) pour écrire le code des composants, des pages, du layout et du routeur. Je les ai
copiés dans mon projet, relus, testés dans le navigateur et je les explique ici. Le CSS a
aussi été écrit par l'IA (autorisé, donc non détaillé).

| Date | Question posée | Ce que j'ai retenu | Ce que j'ai écrit moi-même |
|------|----------------|--------------------|----------------------------|
| 19/11/2026 | Aide pour les composants : ArticleCard, BarreRecherche, CommentaireForm, EtatRequete, ListeArticles, ListeCommentaires | La carte reçoit `estFavori` et une fonction : elle ne garde pas la liste des favoris. Le champ de recherche est contrôlé (la valeur vit dans la page). La clé d'une liste est l'identifiant, pas l'index. | J'ai copié et relu les fichiers, puis testé la recherche, le formulaire et les favoris dans le navigateur. |
| 19/11/2026 | Aide pour les pages : Accueil, Articles, Article, Auteurs, Auteur, Favoris, Introuvable | `fetch` ne rejette pas un 404 : on teste `reponse.ok`. Le retour de `useEffect` annule la requête avec `AbortController`. `useParams` renvoie du texte. | J'ai copié et relu les pages, testé `/articles/999` et une adresse inconnue. |
| 19/11/2026 | Aide pour LayoutPrincipal, router.jsx et RouteProtegee | L'état des favoris est dans le layout, l'ancêtre commun de la barre de navigation et des pages ; les pages le lisent avec `useOutletContext`. `Outlet` marque où s'affiche la page courante. Une route protégée redirige avec `Navigate`. | J'ai remplacé les fichiers de départ, créé `RouteProtegee.jsx` et testé la connexion simulée. |
| 24/11/2026 | Aide pour le déploiement : `vercel.json`, GitHub, Vercel, README | Sans `vercel.json`, recharger une adresse comme `/articles/3` donne une 404 en ligne. Le fichier envoie toutes les adresses vers `index.html` et React Router choisit la page. | J'ai créé mon dépôt GitHub, changé l'adresse d'origine, poussé le projet et déployé sur Vercel : https://teranga-blog-three.vercel.app |