import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { API_URL } from "../constants.js";
import EtatRequete from "../components/EtatRequete.jsx";
import BarreRecherche from "../components/BarreRecherche.jsx";
import ListeArticles from "../components/ListeArticles.jsx";

// Liste des articles chargés depuis l'API, avec recherche.
export default function Articles() {
  const { idsFavoris, basculerFavori } = useOutletContext();

  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    const controleur = new AbortController();

    fetch(API_URL + "/posts?_limit=12", { signal: controleur.signal })
      .then((reponse) => {
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
        if (err.name === "AbortError") return;
        setErreur("Impossible de charger les articles. Vérifie ta connexion.");
        setChargement(false);
      });

    return () => controleur.abort();
  }, []);

  // Le tableau d'origine reste intact : on filtre dans une nouvelle liste.
  // Effacer la recherche restaure donc toute la liste.
  const articlesFiltres = articles.filter((article) =>
    article.title.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div>
      <h1>Articles</h1>
      <BarreRecherche valeur={recherche} onChangement={setRecherche} />

      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articlesFiltres}
          favoris={idsFavoris}
          onBasculerFavori={basculerFavori}
        />
      </EtatRequete>
    </div>
  );
}