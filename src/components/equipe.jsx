import avatarPlaceholder from '../assets/adventurer-1726698584777.png'; 
import { useState } from 'react';
import '../index.css'; 

function Equipe({ nom, fonction, avatar, description }) {
  return (
    <div className="team-card p-4 bg-white shadow-lg rounded-lg text-center mx-4">
      {/* Conteneur pour l'avatar et les infos */}
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <img 
          src={avatar || avatarPlaceholder} 
          alt="Avatar" 
          className="avatar w-24 h-24 rounded-full mb-4" 
        />
        {/* Nom et fonction */}
        <p className="team-name font-semibold text-lg">{nom}</p>
        <p className="team-function text-gray-500">{fonction}</p>
      </div>
      {/* Description */}
      <p className="team-description mt-3 text-gray-600">{description}</p>
    </div>
  );
}

function TeamCarousel({ teamMembers }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalVisible = 3; 
  const totalPages = Math.ceil(teamMembers.length / totalVisible);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const startIndex = currentIndex * totalVisible;
  const visibleMembers = teamMembers.slice(startIndex, startIndex + totalVisible);

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-10px">
      {/* Carrousel */}
      <div className="flex justify-center items-center">
        {visibleMembers.map((member, index) => (
          <div
            key={index}
            className="transition-transform duration-500 ease-in-out"
          >
            <Equipe 
              nom={member.nom}
              fonction={member.fonction}
              avatar={member.avatar}
              description={member.description}
            />
          </div>
        ))}
      </div>

      {/* Petits points pour la navigation */}
      <div className="flex justify-center mt-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 mx-1 mb-4 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default TeamCarousel;
