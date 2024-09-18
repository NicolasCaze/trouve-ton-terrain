import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Header from "./header";
import "leaflet/dist/leaflet.css";

export default function ModalContent({ closeModal, complexe }) {
  return (
    <div
      onClick={closeModal}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "70%",
          margin: "auto",
          background: "white",
          padding: "20px",
          marginTop: "60px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              fontSize: "16px",
              lineHeight: "30px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "500px",
            marginTop: "20px",
          }}
        >
          {/* Détails du complexe */}
          <div style={{ flex: "2", marginRight: "20px" }}>
            <h2 id="modal-title">{complexe.nom || "Non disponible"}</h2>
            <p>
              <strong>Adresse:</strong> {complexe.adresse || "Non disponible"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {complexe.status ? "Disponible" : "Indisponible"}
            </p>
            <p>
              <strong>Sport Proposé:</strong> {complexe.sport}
            </p>
          </div>

          {/* Carte */}
          <div style={{ flex: "2", height: "70%" }}>
            {complexe.latitude && complexe.longitude ? (
              <MapContainer
                center={[complexe.latitude, complexe.longitude]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
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
