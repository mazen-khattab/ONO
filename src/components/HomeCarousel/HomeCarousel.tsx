import React, { useState } from 'react';
import './HomeCarousel.css';

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

const items: CarouselItem[] = [
  {
    id: 1,
    title: "Mountain View",
    image: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Majestic mountain peaks reaching into the clouds, offering breathtaking views of nature's grandeur."
  },
  {
    id: 2,
    title: "Ocean Sunset",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80",
    description: "Golden sun setting over tranquil waters, painting the sky in vibrant hues of orange and pink."
  },
  {
    id: 3,
    title: "Forest Path",
    image: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "A serene pathway through ancient woods, dappled sunlight filtering through the leafy canopy."
  },
  {
    id: 4,
    title: "City Lights",
    image: "https://images.pexels.com/photos/6743164/pexels-photo-6743164.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Urban landscape illuminated at night, showcasing the vibrant energy of metropolitan life."
  },
  {
    id: 5,
    title: "Forest Path",
    image: "https://images.pexels.com/photos/27264799/pexels-photo-27264799/free-photo-of-a-wooden-toy-with-the-word-dice-on-it.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "A serene pathway through ancient woods, dappled sunlight filtering through the leafy canopy."
  },
  {
    id: 6,
    title: "Ocean Sunset",
    image: "https://images.pexels.com/photos/6743152/pexels-photo-6743152.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Golden sun setting over tranquil waters, painting the sky in vibrant hues of orange and pink."
  },
  {
    id: 7,
    title: "Mountain View",
    image: "https://images.pexels.com/photos/7304419/pexels-photo-7304419.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Majestic mountain peaks reaching into the clouds, offering breathtaking views of nature's grandeur."
  },
  {
    id: 8,
    title: "City Lights",
    image: "https://images.pexels.com/photos/6219104/pexels-photo-6219104.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Urban landscape illuminated at night, showcasing the vibrant energy of metropolitan life."
  },
  {
    id: 9,
    title: "Ocean Sunset",
    image: "https://images.pexels.com/photos/7269670/pexels-photo-7269670.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Golden sun setting over tranquil waters, painting the sky in vibrant hues of orange and pink."
  },
  {
    id: 10,
    title: "Ocean Sunset",
    image: "https://images.pexels.com/photos/9271757/pexels-photo-9271757.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Golden sun setting over tranquil waters, painting the sky in vibrant hues of orange and pink."
  },
  {
    id: 11,
    title: "Ocean Sunset",
    image: "https://images.pexels.com/photos/6990329/pexels-photo-6990329.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Golden sun setting over tranquil waters, painting the sky in vibrant hues of orange and pink."
  },
  {
    id: 12,
    title: "Ocean Sunset",
    image: "https://images.pexels.com/photos/6692957/pexels-photo-6692957.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Golden sun setting over tranquil waters, painting the sky in vibrant hues of orange and pink."
  },
  {
    id: 13,
    title: "Ocean Sunset",
    image: "https://images.pexels.com/photos/8409851/pexels-photo-8409851.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Golden sun setting over tranquil waters, painting the sky in vibrant hues of orange and pink."
  },
  {
    id: 14,
    title: "Ocean Sunset",
    image: "https://images.pexels.com/photos/3663054/pexels-photo-3663054.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Golden sun setting over tranquil waters, painting the sky in vibrant hues of orange and pink."
  },
  {
    id: 15,
    title: "Ocean Sunset",
    image: "https://images.pexels.com/photos/6219115/pexels-photo-6219115.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Golden sun setting over tranquil waters, painting the sky in vibrant hues of orange and pink."
  },
];

const HomeCarousel: React.FC = (props) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className={`${props.classname} carousel-container`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`carousel-track ${isPaused ? 'paused' : ''}`} style={{'animation-direction': props.direction}}>
        {[...items, ...items].map((item, index) => (
          <div key={`${item.id}-${index}`} className="carousel-item">
            <div className="carousel-card">
              {/* Front side */}
              <div className="card-front">
                <img src={item.image} alt={item.title} />
                <div className="card-front-content">
                  <h3>{item.title}</h3>
                </div>
              </div>
              
              {/* Back side */}
              <div className="card-back">
                <div className="card-back-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;