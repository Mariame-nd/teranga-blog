import { Navigate, useOutletContext } from "react-router";

// Page de connexion simulée.
// Aucun mot de passe : un bouton change simplement une valeur d'état du layout.
export default function Connexion() {
  const { connecte, setConnecte } = useOutletContext();

  // Si on est déjà connecté, on redirige vers la page protégée.
  if (connecte) {
    return <Navigate to="/mon-espace" replace />;
  }

  return (
    <div className="carte boite-connexion">
      <h1>Connexion</h1>
      <p className="discret">
        Connexion simulée : aucun mot de passe n'est demandé.
      </p>
      <button className="bouton" onClick={() => setConnecte(true)}>
        Se connecter
      </button>
    </div>
  );
}