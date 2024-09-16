import { createPortal } from "react-dom";
import ModalContent from "./modal-content.jsx";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from "prop-types";


export default function ListComplexe({ complexe }) {
  const [showModal, setShowModal] = useState(false);

  if (!complexe) {
    console.log("Complexe is null or undefined");
    return null;
  }

  const handleClick = () => {
    console.log("onClick triggered");
    setShowModal(prev => !prev);
  };

  return (
    <>
       <div className="flex-container">
        <div className="card-container">
          <div className="card" onClick={handleClick}>
            <b>{complexe.nom || "Nom non disponible"}</b><br />
            <p className="truncate-multi-line" >
            {complexe.adresse || "Adresse non disponible"}
              </p>
          </div>
        </div>
      </div>


      {showModal && createPortal(
        <ModalContent 
          complexe={complexe} 
          closeModal={() => setShowModal(false)} 
        />,
        document.body
      )}
    </>
  );
}

ListComplexe.propTypes = {
  complexe: PropTypes.shape({
    id: PropTypes.string,
    nom: PropTypes.string,
    adresse: PropTypes.string,
    name: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
};
