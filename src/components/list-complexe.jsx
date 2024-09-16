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
        <div className="card mb-4" style={{ flex: '1 1 calc(33% - 20px)', minWidth : '250px', boxSizing: 'border-box' }}>
        <ul>
          <li onClick={handleClick}>
            <b>{complexe.nom || "Nom non disponible"}</b><br />
            {complexe.adresse || "Adresse non disponible"}
          </li>
        </ul>
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
