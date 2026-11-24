import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";

// Mise en page partagée : barre de navigation (NavLink) + zone de page (Outlet).
// L'état des favoris est remonté ici puis partagé avec useOutletContext.
// Le logo est fourni : public/logo-teranga-blog.png, servi à l'adresse /logo-teranga-blog.png.
export default function LayoutPrincipal() {
  const [favoris, setFavoris] = useState([]);
  const [connecte, setConnecte] = useState(false);

  const idsFavoris = favoris.map((article) => article.id);

  function basculerFavori(article) {
    if (idsFavoris.includes(article.id)) {
      setFavoris(favoris.filter((f) => f.id !== article.id));
    } else {
      setFavoris([...favoris, article]);
    }
  }

  return (
    <div className="page">
      <header className="barre-nav">
        <div className="conteneur">
          <Link to="/" className="logo-lien">
            <img
              src="/logo-teranga-blog.png"
              alt="Teranga Blog"
              className="logo"
            />
          </Link>

          <nav className="liens">
            <NavLink to="/" end>Accueil</NavLink>
            <NavLink to="/articles">Articles</NavLink>
            <NavLink to="/auteurs">Auteurs</NavLink>
            <NavLink to="/favoris">
              Favoris <span className="compteur">{favoris.length}</span>
            </NavLink>
            {connecte ? (
              <NavLink to="/mon-espace">Mon espace</NavLink>
            ) : (
              <NavLink to="/connexion">Connexion</NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="conteneur contenu">
        <Outlet
          context={{ favoris, idsFavoris, basculerFavori, connecte, setConnecte }}
        />
      </main>

      <footer className="pied">
        <div className="conteneur">Teranga Blog — projet du cours React</div>
      </footer>
    </div>
  );
}