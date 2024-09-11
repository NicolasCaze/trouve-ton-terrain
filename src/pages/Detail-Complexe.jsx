import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function DetailComplexe() {
  const { id } = useParams(); // Récupérer l'ID à partir de l'URL (c'est inst_numero)
  const [complexe, setComplexe] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data); // Vérifiez les données reçues
        setComplexe(data.record);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    }
    fetchDetails();
  }, [id]);

  if (!complexe) {
    return <p>Chargement des détails...</p>;
  }

  return (
    <div>
      <h1>{complexe.fields.inst_nom}</h1>
      <p>Adresse : {complexe.fields.inst_adresse}</p>
      <p>Statut : {complexe.fields.inst_actif}</p>
      {/* Autres informations sur le complexe */}
    </div>
  );
}
