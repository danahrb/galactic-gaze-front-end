import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../../services/eventService';
import authService from '../../services/authService';
import './EventList.css';

const EventList = () => {
  const [user, setUser] = useState(authService.getUser());
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const eventsData = await eventService.index();
      setEvents(eventsData);
      console.log(eventsData);
    };

    fetchAllEvents();
  }, []);

  const handleCardClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="container my-4">
      <div className="video-container mb-4">
        <video className="video" controls autoPlay loop>
          <source src="path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <hr />
      
      <h1 className="mb-4 head">Latest News on Astronomy and Sky Watching</h1>
      <p className="mb-4 text-white para">
        Never miss an exciting event in the night sky with the Star Walk space news — your online guide to the latest astronomy events and celestial bodies visible tonight. Find out how and when to observe meteor showers, solar and lunar eclipses, Starlink satellites, planetary events, comets, and more. Learn the astronomy terms, see stargazing forecasts for Northern and Southern Hemispheres, and get observation tips.
      </p>
      <hr />
      
      <div className="card-group">
        {events.map((event) => (
          <div 
            key={event._id} 
            className="card" 
            onClick={() => handleCardClick(event._id)}
            role="button" 
          >
            <div className="card-img-body" style={{ backgroundImage: `url(${event.image})` }}>
              <div className="card-overlay">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">
                    <small>
                      {new Date(event.datetime).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
