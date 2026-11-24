// Affiche chargement, erreur ou le contenu (children) selon l'état d'une requête.
// Props attendues : chargement (booléen), erreur (texte ou null), children.
export default function EtatRequete({ chargement, erreur, children }) {
  if (chargement) {
    return <p className="etat-chargement">Chargement en cours...</p>;
  }

  if (erreur) {
    return <p className="etat-erreur">{erreur}</p>;
  }

  return <>{children}</>;
}