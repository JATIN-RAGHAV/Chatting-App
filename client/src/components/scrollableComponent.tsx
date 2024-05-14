import React from 'react';
import './../App.css'; // Import your CSS file for styling

interface ScrollableComponentProps {
  text: string;
}

const ScrollableComponent: React.FC<ScrollableComponentProps> = ({ text }) => {
  return (
    <div className="scrollable-container">
      <div className="scrollable-content">
        {text}
      </div>
    </div>
  );
};

export default ScrollableComponent;
