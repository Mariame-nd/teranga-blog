// Affiche les commentaires d'un article.
// Props attendues : commentaires (tableau avec id, name, body).
export default function ListeCommentaires({ commentaires }) {
  if (commentaires.length === 0) {
    return <p className="discret">Pas encore de commentaire.</p>;
  }

  return (
    <ul className="commentaires">
      {commentaires.map((commentaire) => (
        <li key={commentaire.id} className="commentaire">
          <strong>{commentaire.name}</strong>
          <p>{commentaire.body}</p>
        </li>
      ))}
    </ul>
  );
}