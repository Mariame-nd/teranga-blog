import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import { API_URL } from "../constants.js";
import EtatRequete from "../components/EtatRequete.jsx";
import ListeCommentaires from "../components/ListeCommentaires.jsx";
import CommentaireForm from "../components/CommentaireForm.jsx";

// Détail d'un article (paramètre d'URL id) et ses commentaires.
export default function Article() {
  // useParams renvoie toujours du texte : "3" et non le nombre 3.
  const { id } = useParams();
  const { idsFavoris, basculerFavori } = useOutletContext();

  const [article, setArticle] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // id est dans le tableau de dépendances : l'effet se relance quand il change.
  useEffect(() => {
    const controleur = new AbortController();
    setChargement(true);
    setErreur(null);

    Promise.all([
      fetch(API_URL + "/posts/" + id, { signal: controleur.signal }),
      fetch(API_URL + "/posts/" + id + "/comments", { signal: controleur.signal }),
    ])
      .then((reponses) => {
        // fetch ne rejette pas pour un 404 : on teste reponse.ok nous-mêmes.
        if (!reponses[0].ok || !reponses[1].ok) {
          throw new Error("Article introuvable");
        }
        return Promise.all([reponses[0].json(), reponses[1].json()]);
      })
      .then((resultats) => {
        setArticle(resultats[0]);
        // Les commentaires de l'API sont le point de départ de la liste.
        setCommentaires(resultats[1]);
        setChargement(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setErreur("Impossible de charger cet article (introuvable ou réseau coupé).");
        setChargement(false);
      });

    // Nettoyage : si id change vite, l'ancienne réponse n'écrase pas la nouvelle.
    return () => controleur.abort();
  }, [id]);

  // On ne modifie jamais le tableau en place : on en crée un nouveau.
  function ajouterCommentaire(nouveau) {
    setCommentaires([...commentaires, nouveau]);
  }

  return (
    <div>
      <Link to="/articles" className="retour">← Retour aux articles</Link>

      <EtatRequete chargement={chargement} erreur={erreur}>
        {article && (
          <article className="detail">
            <h1>{article.title}</h1>
            <p className="discret">
              Par <Link to={"/auteurs/" + article.userId}>l'auteur n°{article.userId}</Link>
            </p>
            <p className="texte">{article.body}</p>

            <button
              className={idsFavoris.includes(article.id) ? "bouton" : "bouton secondaire"}
              onClick={() => basculerFavori(article)}
            >
              {idsFavoris.includes(article.id)
                ? "★ Retirer des favoris"
                : "☆ Ajouter aux favoris"}
            </button>

            <h2>Commentaires ({commentaires.length})</h2>
            <ListeCommentaires commentaires={commentaires} />
            <CommentaireForm onAjouter={ajouterCommentaire} />
          </article>
        )}
      </EtatRequete>
    </div>
  );
}