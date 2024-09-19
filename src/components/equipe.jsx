import { Card } from 'react-bootstrap';
import avatarPlaceholder from '../assets/adventurer-1726698584777.png'; 
import '../index.css'; 

function Equipe({ nom, fonction, avatar, description }) {
  return (
    <Card className="team-card">
      <Card.Body className="align-items-center">
        {/* Conteneur pour l'avatar et les infos */}
        <div className="d-flex">
          {/* Avatar */}
          <div className='d-flex'>
          <img src={avatar || avatarPlaceholder} alt="Avatar" className="avatar" />
          <p className="team-name">{nom}</p>
          </div>
          
          {/* Nom et fonction */}
            <p className="team-function">{fonction}</p>
        </div>

        {/* Description */}
        <Card.Text className="team-description mt-3">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Equipe;
