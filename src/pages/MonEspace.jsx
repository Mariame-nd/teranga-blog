import { Link, useOutletContext } from "react-router";

// Page protégée : accessible seulement une fois connecté.
export default function MonEspace() {
  const { favoris, setConnecte } = useOutletContext();

  return (
    <div>
      <h1>Mon espace</h1>
      <p>Bienvenue ! Tu as {favoris.length} article(s) en favori.</p>
      <p>
        <Link to="/favoris">Voir mes favoris</Link>
      </p>
      <button className="bouton secondaire" onClick={() => setConnecte(false)}>
        Se déconnecter
      </button>
    </div>
  );
}