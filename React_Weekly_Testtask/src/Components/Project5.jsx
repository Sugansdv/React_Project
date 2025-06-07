import React, { useState, useEffect } from 'react';

export default function Project5() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-top-btn"
          style={scrollBtnStyle}
        >
          ⬆ Top
        </button>
      )}
    </>
  );
}

const scrollBtnStyle = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  padding: '10px 15px',
  fontSize: '18px',
  borderRadius: '8px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  zIndex: 1000,
  boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
};
