import PropTypes from 'prop-types';

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
        <button
          type="button"
          onClick={closeModal}
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
        >
          X
        </button>
        <h2 id="modal-title">Détails du complexe</h2>
        <p><strong>ID:</strong> {complexe.id || 'Non disponible'}</p>
        <p><strong>Nom:</strong> {complexe.nom || 'Non disponible'}</p>
        <p><strong>Nom alternatif:</strong> {complexe.name || 'Non disponible'}</p>
        <p><strong>Adresse:</strong> {complexe.adresse || 'Non disponible'}</p>
        <p><strong>Latitude:</strong> {complexe.latitude || 'Non disponible'}</p>
        <p><strong>Longitude:</strong> {complexe.longitude || 'Non disponible'}</p>
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
  }).isRequired,
};
