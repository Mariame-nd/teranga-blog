import { Navigate, Outlet, useOutletContext } from "react-router";

// Route protégée : si l'utilisateur n'est pas connecté, on le renvoie vers /connexion.
// Sinon on laisse passer la route enfant, en lui retransmettant le contexte.
export default function RouteProtegee() {
    const contexte = useOutletContext();

    if (!contexte.connecte) {
        return <Navigate to="/connexion" replace />;
    }

    return <Outlet context={contexte} />;
}