import { useState, useCallback, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import ListComplexe from "./components/list-complexe";
import "./App.css";
import TeamCarousel from "./components/equipe";
import Footer from "./components/footer";
import Mimi from './assets/mimy.png';
import felix from './assets/felix.png';
import Nico from './assets/adventurer-1726698584777.png';
import Asma from './assets/asma.png';
import Foot from './assets/terrain-tennis.jpg'
import {Row, Col} from 'react-bootstrap'
import Header from "./components/header";
import CarouselImages  from "./components/caroussel";
import 'bootstrap/dist/css/bootstrap.min.css';

const teamMembers = [
  {
    nom: "Nico",
    fonction: "Développeur Back-end (Scrum master)",
    avatar: Nico,
    description: "Master 1 developpement Web "
  },
  {
    nom: "Mimy",
    fonction: "Developpeur Front-end (UI design)",
    avatar: Mimi,
    description: "Bachelor 3 developpement Web"
  },
  {
    nom: "Felix",
    fonction: "Developpeur Full-Stack (chef de projet)",
    avatar: felix,
    description: "Master 1 developpement Web"
  },
  {
    nom: "Petro",
    fonction: "Data analyst",
    avatar: Asma,
    description: "Bachelor 3 Data"
  },
  {
    nom: "Asma",
    fonction: "Developpeur front-end",
    avatar: Asma,
    description: "Master 1 developpement Web"
  }
  
];

// Correction pour les icônes

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: import("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: import("leaflet/dist/images/marker-icon.png"),
  shadowUrl: import("leaflet/dist/images/marker-shadow.png"),
});

function App() {
  const [data, setData] = useState([]);
  const [cachedData, setCachedData] = useState([]);
  const [errorInfo, setErrorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [lastBounds, setLastBounds] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [filteredComplexe, setFilteredComplexe] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const timeoutRef = useRef(null);
  const defaultBounds = [41.0, -5.0, 51.0, 9.0];

  const defaultCenter = [46.603354, 1.888334]; // Center of France
  const defaultZoom = 6; // Default zoom level
  const [selectedComplexe, setSelectedComplexe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchComplexes = useCallback(async (bounds, limit = 1000) => {
    setIsLoading(true);
    setProgress(0);
    let offset = 0;
    let allComplexes = [];

    try {
      while (true) {
        const response = await fetch(
          `https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?limit=100&offset=${offset}&refine=inst_part_type_filter%3A%22Complexe%20sportif%22&geofilter.bbox=${bounds.join(
            ","
          )}`
        );
        if (!response.ok)
          throw new Error(`Error ${response.status}, ${response.statusText}`);
        const responseData = await response.json();

        if (responseData.results && Array.isArray(responseData.results)) {
          const newComplexes = responseData.results
            .filter(
              (result) =>
                result.coordonnees &&
                result.coordonnees.lat &&
                result.coordonnees.lon
            )
            .map((result) => {
              return {
                id: result.inst_numero,
                nom: result.inst_nom,
                adresse: result.inst_adresse,
                name: result.inst_name || "Non renseigné",
                latitude: result.coordonnees.lat,
                longitude: result.coordonnees.lon,
                region: result.reg_nom,
                status: result.inst_actif,
                sport: result.equip_type_name,
              };
            });

          allComplexes = [...allComplexes, ...newComplexes];
          setData((prevData) => [...prevData, ...newComplexes]);
          setProgress(Math.min(100, (allComplexes.length / limit) * 100));

          if (responseData.results.length < 100 || allComplexes.length >= limit)
            break;
          offset += 100;
        } else {
          break;
        }
      }
      setCachedData((prevCache) => [
        ...prevCache,
        { bounds, complexes: allComplexes },
      ]);
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
        const newBounds = [
          bounds.getSouth(),
          bounds.getWest(),
          bounds.getNorth(),
          bounds.getEast(),
        ];

        const isAlreadyFetched = cachedData.some((cached) => {
          const cachedBounds = cached.bounds;
          return (
            newBounds[0] >= cachedBounds[0] &&
            newBounds[1] >= cachedBounds[1] &&
            newBounds[2] <= cachedBounds[2] &&
            newBounds[3] <= cachedBounds[3]
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
        const regionBounds = data
          .filter((complexe) => complexe.region === region)
          .map((complexe) => [complexe.latitude, complexe.longitude]);

        if (regionBounds.length > 0) {
          const bounds = L.latLngBounds(regionBounds);
          map.fitBounds(bounds);
        }
        // } else if (!region && map) {
        //   // Revenir au centre et au zoom par défaut
        //   map.setView(defaultCenter, defaultZoom);
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
      filteredItems = filteredItems.filter(
        (complexe) => complexe.region === region
      );
    }

    if (searchTerm) {
      filteredItems = filteredItems.filter(
        (complexe) =>
          complexe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complexe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredComplexe(filteredItems);
    setCurrentPage(1);
  };

  const uniqueRegions = [...new Set(data.map((complexe) => complexe.region))];

  const indexOfLastComplexe = currentPage * itemsPerPage;
  const indexOfFirstComplexe = indexOfLastComplexe - itemsPerPage;
  const currentComplexes =
    filteredComplexe.length > 0
      ? filteredComplexe.slice(indexOfFirstComplexe, indexOfLastComplexe)
      : data.slice(indexOfFirstComplexe, indexOfLastComplexe);

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePrevPage = () =>
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <main>
     
      <div className="header-content">
          <Header
          />
        </div>
          {/* Carousel Section */}
          <div className="relative carousel-section">
            <CarouselImages 
             src1={"https://www.agn-avocats.fr/wp-content/uploads/2020/02/football-stadium-shiny-lights-view-from-field-PWS5ZD9-2048x1024.jpg"}
             src2={"https://media.istockphoto.com/photos/volleyball-stadium-picture-id1216739474?k=6&m=1216739474&s=170667a&w=0&h=xAIsLGuvZxUKRIiutXv0G28JOQo5Q90KxdszDUN5KU0="}
             src3={"https://ussa.fr/assets/img/icon-discipline/header-badminton.png"}
            />        
           </div>

      <div className="app-container">

        <div className="search-filter">
              <input
                style={{ height: "35px", width : "400px" }}
                type="text"
                value={searchItem}
                onChange={handleInputChange}
                placeholder="Rechercher un complexe sportif"
              />
              <select
                id="region-select"
                onChange={handleRegionChange}
                value={selectedRegion || ""}
              >
                <option value=""> Choisissez une region </option>
                {uniqueRegions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
        </div>

        {/* Texte visible sous l'image */}
        <hr className="custom-hr" />

        <p className="description-text">
         <h1>
         Découvrez votre prochain complexe sportif en <br />
          un clin d'œil avec YSportMap, votre guide interactif des terrains de sport. <br />
           Pour des activités près de chez vous !
         </h1>
        </p>
        {isLoading && (
          <div>
            <p>Chargement en cours...</p>
            <progress value={progress} max="100" />
          </div>
        )}

        <div className="content-wrapper">
          <div className="list-container">
            {currentComplexes.map((complexe, index) => (
              <ListComplexe key={index} complexe={complexe} />
            ))}
          </div>
          <div className="map-container">
            <MapContainer
              center={defaultCenter}
              zoom={defaultZoom}
              style={{ height: "300px", width: "100%", marginRight: "4px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <MapEventHandler />
              <ZoomToRegion
                region={selectedRegion}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
              />
              <MarkerClusterGroup chunkedLoading>
                {data.map((complexe, index) => (
                  <Marker
                    key={index}
                    position={[complexe.latitude, complexe.longitude]}
                  >
                    <Popup>
                      <b>{complexe.name}</b>
                      <br />
                      {complexe.nom}
                      <br />
                      {complexe.adresse}
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Précédent
          </button>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastComplexe >= filteredComplexe.length}
          >
            Suivant
          </button>
        </div>
        <div className="team">
          <h2 style={{textAlign :"center", marginBottom : "40px", marginTop:"20px"}}> NOTRE EQUIPE</h2>
          <p style={{textAlign :"center", marginBottom : "15px"}}>Les sans nom</p>
          <TeamCarousel teamMembers={teamMembers} />
        </div>
          <Footer />
      </div>
    </main>
  );
}

export default App;
