import { Card } from 'react-bootstrap';
import avatarPlaceholder from '../assets/adventurer-1726698584777.png'; 
import '../index.css'; 

function Equipe({ nom, fonction, avatar, description }) {
  return (
    <Card className="team-card">
      <Card.Body className="d-flex align-items-center">
        {/* Avatar */}
        <img src={avatar || avatarPlaceholder} alt="Avatar" className="avatar" />
        
        {/* Nom et description */}
        <div className="ml-3">
          <Card.Title className="team-name">
            {nom}
            <p>{fonction}</p>
            </Card.Title>
          <Card.Text className="team-description">{description}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Equipe;
