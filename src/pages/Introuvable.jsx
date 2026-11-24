import { Link } from "react-router";

// Page 404, affichée pour toute URL inconnue.
export default function Introuvable() {
  return (
    <div className="page-404">
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/" className="bouton">Retour à l'accueil</Link>
    </div>
  );
}