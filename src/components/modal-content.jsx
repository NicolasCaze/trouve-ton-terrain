import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Header from './header';
import 'leaflet/dist/leaflet.css';

export default function ModalContent({ closeModal, complexe }) {
  return (
    <div
      onClick={closeModal}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '80%', margin: 'auto', background: 'white', padding: '20px', marginTop: '50px' }}
      >
        <Header searchResults={[]} />
        <button
          type="button"
          onClick={closeModal}
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
        >
          X
        </button>
        <h2 id="modal-title">{complexe.nom || 'Non disponible'}</h2>
        <p><strong>Adresse:</strong> {complexe.adresse || 'Non disponible'}</p>
        <p><strong>Status:</strong> 
          { complexe.status ? 'Disponible' : 'Indisponible' }
        </p>
        <p><strong>Sport Proposé:</strong> {complexe.sport}</p>

        {/* Ajout de la carte */}
        <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
          {complexe.latitude && complexe.longitude ? (
            <MapContainer
              center={[complexe.latitude, complexe.longitude]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker position={[complexe.latitude, complexe.longitude]} />
            </MapContainer>
          ) : (
            <p>Coordonnées non disponibles pour ce complexe.</p>
          )}
        </div>
      </div>
    </div>
  );
}

ModalContent.propTypes = {
  closeModal: PropTypes.func.isRequired,
  complexe: PropTypes.shape({
    id: PropTypes.string,
    nom: PropTypes.string,
    adresse: PropTypes.string,
    name: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    status: PropTypes.string,
    sport: PropTypes.string,
  }).isRequired,
};
