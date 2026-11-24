import ArticleCard from "./ArticleCard.jsx";

// Affiche une liste de cartes d'articles.
// Props attendues : articles (tableau), favoris (tableau d'identifiants), onBasculerFavori (fonction).
export default function ListeArticles({ articles, favoris, onBasculerFavori }) {
  if (articles.length === 0) {
    return <p className="discret">Aucun article à afficher.</p>;
  }

  return (
    <div className="grille">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          estFavori={favoris.includes(article.id)}
          onBasculerFavori={onBasculerFavori}
        />
      ))}
    </div>
  );
}