import { Link } from "react-router";

// Carte d'un article.
// Props attendues : article (objet avec id, title, body), estFavori, onBasculerFavori.
export default function ArticleCard({ article, estFavori, onBasculerFavori }) {
  const extrait = article.body.slice(0, 90) + "...";

  return (
    <article className="carte carte-article">
      <h3>
        <Link to={"/articles/" + article.id}>{article.title}</Link>
      </h3>
      <p className="extrait">{extrait}</p>
      <button
        className={estFavori ? "bouton" : "bouton secondaire"}
        onClick={() => onBasculerFavori(article)}
      >
        {estFavori ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}
      </button>
    </article>
  );
}