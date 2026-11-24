import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import { API_URL } from "../constants.js";
import EtatRequete from "../components/EtatRequete.jsx";
import ListeArticles from "../components/ListeArticles.jsx";

// Fiche d'un auteur (paramètre d'URL id) et ses articles.
export default function Auteur() {
  // useParams renvoie du texte : "2" et non le nombre 2.
  const { id } = useParams();
  const { idsFavoris, basculerFavori } = useOutletContext();

  const [auteur, setAuteur] = useState(null);
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // id est dans le tableau de dépendances : l'effet se relance quand il change.
  useEffect(() => {
    const controleur = new AbortController();
    setChargement(true);
    setErreur(null);

    Promise.all([
      fetch(API_URL + "/users/" + id, { signal: controleur.signal }),
      fetch(API_URL + "/posts?userId=" + id, { signal: controleur.signal }),
    ])
      .then((reponses) => {
        // fetch ne rejette pas pour un 404 : on teste reponse.ok nous-mêmes.
        if (!reponses[0].ok || !reponses[1].ok) {
          throw new Error("Auteur introuvable");
        }
        return Promise.all([reponses[0].json(), reponses[1].json()]);
      })
      .then((resultats) => {
        setAuteur(resultats[0]);
        setArticles(resultats[1]);
        setChargement(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setErreur("Impossible de charger cet auteur (introuvable ou réseau coupé).");
        setChargement(false);
      });

    // Nettoyage : on annule les requêtes en cours si id change ou si on quitte la page.
    return () => controleur.abort();
  }, [id]);

  return (
    <div>
      <Link to="/auteurs" className="retour">← Retour aux auteurs</Link>

      <EtatRequete chargement={chargement} erreur={erreur}>
        {auteur && (
          <div>
            <section className="carte fiche-auteur">
              <div className="avatar grand">{auteur.name.charAt(0)}</div>
              <div>
                <h1>{auteur.name}</h1>
                <p className="discret">@{auteur.username} · {auteur.company.name}</p>
                <p>✉ {auteur.email}</p>
                <p>☎ {auteur.phone}</p>
              </div>
            </section>

            <h2>Articles de {auteur.name}</h2>
            <ListeArticles
              articles={articles}
              favoris={idsFavoris}
              onBasculerFavori={basculerFavori}
            />
          </div>
        )}
      </EtatRequete>
    </div>
  );
}