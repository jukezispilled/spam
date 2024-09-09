import React, { useState, useEffect } from 'react';
import { Window, WindowContent, Button } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import spam from './spam.png';

const getRandomPosition = () => {
  const top = Math.random() * 80; // Reduce max percentage to avoid overflow
  const left = Math.random() * 80; // Same for left
  return { top: `${top}%`, left: `${left}%` };
};

const Popup = ({ onClose }) => {
  const [position, setPosition] = useState(getRandomPosition());

  return (
    <Window
      style={{
        position: 'absolute',
        ...position,
        width: '300px', // Default width
        height: '200px', // Default height
        clip: 'rect(0, auto, auto, 0)', // Ensure clipping for overflow
      }}
      className="max-w-[90%] max-h-[90%] sm:w-64 sm:h-40 md:w-72 md:h-48 font-custom"
    >
      <WindowContent className="flex flex-col justify-between h-full relative">
        <div className='absolute top-2 text-[7px] md:text-sm'>CA: updating...</div>
        <img src={spam} alt="Spam" className="max-w-full max-h-[80%] object-contain" />
        <Button onClick={onClose} className="self-end">
          Close
        </Button>
      </WindowContent>
    </Window>
  );
};

function App() {
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (popups.length < 20) {
        setPopups((prev) => [...prev, Date.now()]);
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [popups]);

  const closePopup = (id) => {
    setPopups((prev) => prev.filter((popupId) => popupId !== id));
  };

  return (
    <ThemeProvider theme={original}>
      <div className="h-screen w-screen flex justify-center items-center bg-teal-600 relative overflow-hidden">
        <div className="absolute bottom-4 right-4 flex items-center z-[50]">
          <a href="https://x.com/" className="transition ease-in-out duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 md:w-12 md:h-12 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer"
              fill="#000000"
              viewBox="0 0 50 50"
            >
              <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
            </svg>
          </a>
          <a href="https://t.me/" className="transition ease-in-out duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 md:w-12 md:h-12 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer"
              fill="#29A9E1"
              viewBox="0 0 50 50"
            >
              <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445 c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758 c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125 c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077 C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
            </svg>
          </a>
        </div>
        {popups.map((id) => (
          <Popup key={id} onClose={() => closePopup(id)} />
        ))}
      </div>
    </ThemeProvider>
  );
}

export default App;