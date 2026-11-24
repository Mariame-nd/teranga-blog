import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";
import { API_URL } from "../constants.js";
import EtatRequete from "../components/EtatRequete.jsx";
import ListeArticles from "../components/ListeArticles.jsx";

// Page d'accueil : présentation et les derniers articles.
export default function Accueil() {
  // Les favoris viennent du layout (useOutletContext).
  const { idsFavoris, basculerFavori } = useOutletContext();

  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controleur = new AbortController();

    fetch(API_URL + "/posts?_limit=3", { signal: controleur.signal })
      .then((reponse) => {
        // fetch ne rejette pas pour un code 404 ou 500 : on teste reponse.ok.
        if (!reponse.ok) {
          throw new Error("Erreur " + reponse.status);
        }
        return reponse.json();
      })
      .then((donnees) => {
        setArticles(donnees);
        setChargement(false);
      })
      .catch((err) => {
        // Une requête annulée par le nettoyage n'est pas une vraie erreur.
        if (err.name === "AbortError") return;
        setErreur("Impossible de charger les derniers articles.");
        setChargement(false);
      });

    // Nettoyage : on annule la requête si la page est quittée.
    return () => controleur.abort();
  }, []);

  return (
    <div>
      <section className="hero">
        <h1>Bienvenue sur Teranga Blog</h1>
        <p>
          Le blog de Teranga Academy : lis des articles, découvre leurs auteurs,
          commente et garde tes articles préférés.
        </p>
        <Link to="/articles" className="bouton">Voir tous les articles</Link>
      </section>

      <h2>Derniers articles</h2>
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articles}
          favoris={idsFavoris}
          onBasculerFavori={basculerFavori}
        />
      </EtatRequete>
    </div>
  );
}