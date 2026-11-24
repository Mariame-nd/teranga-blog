// Champ de recherche contrôlé.
// Props attendues : valeur (texte), onChangement (fonction).
export default function BarreRecherche({ valeur, onChangement }) {
  return (
    <input
      className="champ recherche"
      type="search"
      placeholder="Rechercher un article par titre..."
      value={valeur}
      onChange={(e) => onChangement(e.target.value)}
    />
  );
}