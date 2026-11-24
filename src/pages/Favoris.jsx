import { Link, useOutletContext } from "react-router";
import ListeArticles from "../components/ListeArticles.jsx";

// Articles mis en favori, partagés par le layout (useOutletContext).
export default function Favoris() {
  // favoris : les articles entiers (pour afficher leurs titres).
  // idsFavoris : seulement les identifiants (ce que ListeArticles attend).
  const { favoris, idsFavoris, basculerFavori } = useOutletContext();

  return (
    <div>
      <h1>Mes favoris ({favoris.length})</h1>

      {favoris.length === 0 ? (
        <p className="discret">
          Tu n'as pas encore de favori.{" "}
          <Link to="/articles">Parcourir les articles</Link>
        </p>
      ) : (
        <ListeArticles
          articles={favoris}
          favoris={idsFavoris}
          onBasculerFavori={basculerFavori}
        />
      )}
    </div>
  );
}