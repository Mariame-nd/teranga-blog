import { useState } from "react";

// Formulaire contrôlé : nom et message, avec validation avant ajout.
// Props attendues : onAjouter (fonction appelée avec le nouveau commentaire).
export default function CommentaireForm({ onAjouter }) {
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  function envoyer(e) {
    e.preventDefault();

    if (nom.trim() === "") {
      setErreur("Le nom est obligatoire.");
      return;
    }
    if (message.trim().length < 5) {
      setErreur("Le message doit contenir au moins 5 caractères.");
      return;
    }

    onAjouter({ id: Date.now(), name: nom.trim(), body: message.trim() });
    setNom("");
    setMessage("");
    setErreur("");
  }

  return (
    <form className="formulaire carte" onSubmit={envoyer}>
      <h3>Laisser un commentaire</h3>
      <label>
        Nom
        <input
          className="champ"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </label>
      <label>
        Message
        <textarea
          className="champ"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      {erreur && <p className="message-erreur">{erreur}</p>}
      <button className="bouton" type="submit">Publier</button>
    </form>
  );
}