import { useState, useCallback, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import ListComplexe from "./components/list-complexe";

// Correction pour les icônes
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: import('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: import('leaflet/dist/images/marker-icon.png'),
  shadowUrl: import('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const [data, setData] = useState([]);
  const [cachedData, setCachedData] = useState([]);
  const [errorInfo, setErrorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastBounds, setLastBounds] = useState(null);
  const [searchItem, setSearchItem] = useState('');
  const [filteredComplexe, setFilteredComplexe] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of complexes per page

  const timeoutRef = useRef(null);
  const defaultBounds = [41.0, -5.0, 51.0, 9.0]; 
  const defaultCenter = [46.603354, 1.888334]; // Center of France
  const defaultZoom = 6; // Default zoom level

  const fetchComplexes = useCallback(async (bounds, limit = 1000) => {
    setIsLoading(true);
    setProgress(0);
    let offset = 0;
    let allComplexes = [];

    try {
      while (true) {
        const response = await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?limit=100&offset=${offset}&refine=inst_part_type_filter%3A%22Complexe%20sportif%22&geofilter.bbox=${bounds.join(',')}`);
        if (!response.ok) throw new Error(`Error ${response.status}, ${response.statusText}`);
        const responseData = await response.json();

        if (responseData.results && Array.isArray(responseData.results)) {
          const newComplexes = responseData.results
            .filter(result => result.coordonnees && result.coordonnees.lat && result.coordonnees.lon)
            .map(result => {
              return {
                id: result.inst_numero,
                nom: result.inst_nom,
                adresse: result.inst_adresse,
                name: result.inst_name || "Non renseigné",
                latitude: result.coordonnees.lat,
                longitude: result.coordonnees.lon,
                region: result.reg_nom
              };
            });

          allComplexes = [...allComplexes, ...newComplexes];
          setData(prevData => [...prevData, ...newComplexes]);
          setProgress(Math.min(100, (allComplexes.length / limit) * 100));

          if (responseData.results.length < 100 || allComplexes.length >= limit) break;
          offset += 100;
        } else {
          break;
        }
      }
      setCachedData(prevCache => [...prevCache, { bounds, complexes: allComplexes }]);
    } catch (err) {
      console.error("Erreur de requête :", err);
      setErrorInfo(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);


  
  function MapEventHandler() {
    const map = useMapEvents({
      moveend: () => {
        const bounds = map.getBounds();
        const newBounds = [bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()];

        const isAlreadyFetched = cachedData.some(cached => {
          const cachedBounds = cached.bounds;
          return (
            newBounds[0] >= cachedBounds[0] && newBounds[1] >= cachedBounds[1] &&
            newBounds[2] <= cachedBounds[2] && newBounds[3] <= cachedBounds[3]
          );
        });

        if (!isAlreadyFetched) {
          setLastBounds(newBounds);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            fetchComplexes(newBounds);
          }, 500);
        }
      },
    });
    return null;
  }

  function ZoomToRegion({ region, defaultCenter, defaultZoom }) {
    const map = useMap();
    useEffect(() => {
      if (region && map) {
        const regionBounds = data.filter(complexe => complexe.region === region).map(complexe => [complexe.latitude, complexe.longitude]);

        if (regionBounds.length > 0) {
          const bounds = L.latLngBounds(regionBounds);
          map.fitBounds(bounds);
        }
      } else if (!region && map) {
        // Revenir au centre et au zoom par défaut
        map.setView(defaultCenter, defaultZoom);
      }
    }, [region, map, data, defaultCenter, defaultZoom]);

    return null;
  }

  useEffect(() => {
    if (!lastBounds) {
      setLastBounds(defaultBounds); 
      fetchComplexes(defaultBounds);
    }
  }, [fetchComplexes, lastBounds]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    filterComplexes(searchTerm, selectedRegion);
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);

    filterComplexes(searchItem, selectedRegion);
  };

  const filterComplexes = (searchTerm, region) => {
    let filteredItems = data;

    if (region) {
      filteredItems = filteredItems.filter(complexe => complexe.region === region);
    }

    if (searchTerm) {
      filteredItems = filteredItems.filter(complexe =>
        complexe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complexe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredComplexe(filteredItems);
    setCurrentPage(1); 
  };

  const uniqueRegions = [...new Set(data.map(complexe => complexe.region))];

  const indexOfLastComplexe = currentPage * itemsPerPage;
  const indexOfFirstComplexe = indexOfLastComplexe - itemsPerPage;
  const currentComplexes = filteredComplexe.length > 0 
    ? filteredComplexe.slice(indexOfFirstComplexe, indexOfLastComplexe) 
    : data.slice(indexOfFirstComplexe, indexOfLastComplexe);

  const handleNextPage = () => setCurrentPage(prevPage => prevPage + 1);
  const handlePrevPage = () => setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <main>
      <h1>Complexes Sportifs</h1>

      {isLoading && (
        <div>
          <p>Chargement en cours...</p>
          <progress value={progress} max="100" />
        </div>
      )}
      <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <MapEventHandler />
        <ZoomToRegion region={selectedRegion} defaultCenter={defaultCenter} defaultZoom={defaultZoom} />
        <MarkerClusterGroup chunkedLoading>
          {data.map((complexe, index) => (
            <Marker key={index} position={[complexe.latitude, complexe.longitude]}>
              <Popup>
                <b>{complexe.name}</b><br />
                {complexe.nom}<br />
                {complexe.adresse}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {errorInfo && (
        <p className="error-information">{errorInfo}</p>
      )}

      <div>
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Rechercher un complexe sportif"
        />
      </div>

      <div>
        <label htmlFor="region-select">Sélectionner une région:</label>
        <select id="region-select" onChange={handleRegionChange} value={selectedRegion || ''}>
          <option value="">-- Choisir une région --</option>
          {uniqueRegions.map((region, index) => (
            <option key={index} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <ul>
        {currentComplexes.map((complexe, index) => (
          <ListComplexe key={index} complexe={complexe} />
        ))}
      </ul>

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Précédent</button>
        <button onClick={handleNextPage} disabled={indexOfLastComplexe >= filteredComplexe.length}>Suivant</button>
      </div>
    </main>
  );
}

export default App;
