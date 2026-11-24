import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../constants.js";
import EtatRequete from "../components/EtatRequete.jsx";

// Liste des auteurs chargés depuis l'API.
export default function Auteurs() {
  const [auteurs, setAuteurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controleur = new AbortController();

    fetch(API_URL + "/users", { signal: controleur.signal })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error("Erreur " + reponse.status);
        }
        return reponse.json();
      })
      .then((donnees) => {
        setAuteurs(donnees);
        setChargement(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setErreur("Impossible de charger les auteurs.");
        setChargement(false);
      });

    return () => controleur.abort();
  }, []);

  return (
    <div>
      <h1>Auteurs</h1>

      <EtatRequete chargement={chargement} erreur={erreur}>
        <div className="grille">
          {auteurs.map((auteur) => (
            <article key={auteur.id} className="carte carte-auteur">
              <div className="avatar">{auteur.name.charAt(0)}</div>
              <h3>
                <Link to={"/auteurs/" + auteur.id}>{auteur.name}</Link>
              </h3>
              <p className="discret">@{auteur.username}</p>
              <p className="discret">{auteur.company.name}</p>
            </article>
          ))}
        </div>
      </EtatRequete>
    </div>
  );
}