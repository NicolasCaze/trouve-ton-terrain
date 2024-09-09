import { useState, useEffect } from "react";

function App() {


 const [Data, setData] = useState(null)
 const [errorInfo, setErrorInfo] = useState(null)

 useEffect(() => {
  fetch('https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?limit=20&refine=equip_type_famille%3A%22Terrain%20de%20grands%20jeux%22')
    .then(response => {
      console.log(response); // Affiche la réponse complète
      if(!response.ok) throw new Error(`Error ${response.status}, ${response.statusText}`);
      
      // Vérifie si le Content-Type est bien du JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();  // Si c'est du JSON, on l'analyse
      } else {
        throw new Error('La réponse de l\'API n\'est pas au format JSON.' + response.json());
      }
    })
    .then(responseData => {
      console.log(responseData); // Affiche les données JSON
      setData({
        total: responseData.total_count,
        nom: responseData.results[0].inst_nom,
        adresse: responseData.results[0].inst_adresse,
        name: responseData.results[0].inst_name,
        status: responseData.results[0].inst_actif
      });
    })
    .catch(err => {
      console.error(err);  // Affiche l'erreur dans la console
      setErrorInfo(err.message);
    });
}, []);


    return (
      <main>

      {Data && (
        <>
          <p>{Data.name}</p>
          <p>{Data.nom}</p>
          <p>{Data.adresse}</p>
          <p>{Data.status}</p>
        
        </>
        )}

    {(errorInfo && !Data) && (
      <>
        <p className="error-information">{errorInfo}</p>
      </>
    )}
    </main>
    );
  }
export default App
