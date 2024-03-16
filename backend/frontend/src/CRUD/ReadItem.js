// Importation des hooks React nécessaires
import React, { useState, useEffect } from 'react';

// Constante contenant l'URL de base de l'API. À ajuster selon votre configuration.
const URL_BASE = 'http://localhost:3000/api/data';

// Définition du composant ReadItem, qui accepte un 'itemId' comme prop pour identifier quel élément lire
function ReadItem({ itemId }) {
    // Déclaration des états locaux: 'item' pour stocker l'élément récupéré, 'error' pour gérer les erreurs
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Ajout d'un état pour gérer l'indication de chargement
    const [error, setError] = useState('');

    // Utilisation de useEffect pour déclencher la récupération de l'élément à la montée du composant et à la modification de 'itemId'
    useEffect(() => {
        // Définition de la fonction asynchrone 'fetchItem' pour récupérer l'élément par son ID
        const fetchItem = async () => {
            try {
                // Envoi de la requête GET à l'API et attente de la réponse
                const response = await fetch(`${URL_BASE}/${itemId}`);
                // Si la réponse n'est pas OK, déclencher une exception
                if (!response.ok) throw new Error('Item not found');
                // Extraction des données JSON de la réponse
                const data = await response.json();
                // Mise à jour de l'état 'item' avec les données récupérées
                setItem(data);
                setIsLoading(false); // Arrête le chargement une fois les données récupérées
            } catch (err) {
                // En cas d'erreur, mise à jour de l'état 'error' avec le message d'erreur
                setError(err.message);
                setIsLoading(false); // Arrête le chargement en cas d'erreur
            }
        };

        // Appel de 'fetchItem' si 'itemId' est défini
        if (itemId) fetchItem();
    }, [itemId]); // Liste des dépendances : refait la requête si 'itemId' change
    console.log(itemId);
    // Affichage conditionnel basé sur l'état de chargement et la présence d'erreurs
    if (isLoading) {
        return <p>Loading...</p>; // Affiche un message de chargement
    } else if (error) {
        return <p>Error: {error}</p>; // Affiche un message d'erreur
    } else if (item) {
        return (
            <div>
                <h3>Item Details</h3>
                <p>ID: {item.id}</p>
                <p>Message: {item.message}</p>
            </div>
        );
    } else {
        return <p>No item found</p>; // Gère le cas où aucun élément n'est trouvé
    }    
}

// Exportation du composant pour permettre son utilisation dans d'autres parties de l'application
export default ReadItem;